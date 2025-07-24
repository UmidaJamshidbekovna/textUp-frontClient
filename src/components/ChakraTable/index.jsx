import React, { useState, useMemo, useEffect } from 'react'
import ucFirst from '@/utils/ucFirst'
import styles from './styles.module.scss'
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Box,
    Spinner,
    Menu,
    MenuButton,
    Text,
    MenuList,
    MenuItem,
    Avatar,
    Tooltip,
    Badge,
    AvatarGroup,
} from '@chakra-ui/react'
import useTranslation from 'next-translate/useTranslation'
import classNames from 'classnames'
import CustomPaginate from '@/components/CustomPaginate'
import { numberAutoSpace } from '@/utils/validatePhoneNumber'
import { ChevronDownIcon, TriangleUpIcon, TriangleDownIcon } from '@chakra-ui/icons'
import { numberWithSpaces } from '@/utils/formatNumbers'
import { IoMdCloseCircleOutline } from 'react-icons/io'
import { useImageModal } from '@/Providers/ImageModalContext'
import { useRouter } from 'next/router'
import { formatUtcToLocal } from '@/utils'

function calculateAge(birthDateString) {
    const birthDate = new Date(birthDateString);
    const currentDate = new Date();

    let age = currentDate.getFullYear() - birthDate.getFullYear();

    const isBirthdayPassedThisYear =
        currentDate.getMonth() > birthDate.getMonth() ||
        (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() >= birthDate.getDate());
    if (!isBirthdayPassedThisYear) {
        age--;
    }

    return age;
}

const ChakraTable = ({
    keys = [],
    data = [],
    customCellRender = {},
    customHeaderRender = {}, // New prop for custom header rendering
    btns = () => { },
    onOpen = () => { },
    getInfo = () => { },
    count = 0,
    isLoading,
    emptyTitle,
    wrapperCls,
    clickable,
    pagination = true,
    orders = true,
}) => {
    const router = useRouter()
    const routerPage = router.query?.page ?? 1
    const routerLimit = router.query?.limit ?? 10
    const originalData = data?.map((el, i) => ({
        ...el,
        order: (routerPage - 1) * routerLimit + i + 1,
        originalIndex: i // Store original index for maintaining order reference
    }))
    orders ? keys = [{ id: "order", key: "order", label: "№", }, ...keys] : keys
    const openModalProps = useImageModal();
    const lastKeyIndex = keys.length - 1;
    const { t, lang } = useTranslation()
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

    const handleSort = (key) => {
        if (key === 'order') return;

        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const getNestedValue = (obj, path) => {
        return path.split('.').reduce((acc, part) => acc && acc[part], obj);
    };

    const handleOpenModal = ({ e, link }) => {
        e.preventDefault();
        e.stopPropagation();
        openModalProps?.openModal({ link: process.env.NEXT_PUBLIC_MEDIA_URL + link });
    };

    const sortedData = useMemo(() => {
        let sortableItems = [...originalData];
        if (sortConfig.key !== null && sortConfig.key !== 'order') {
            sortableItems.sort((a, b) => {
                const aValue = getNestedValue(a, sortConfig.key);
                const bValue = getNestedValue(b, sortConfig.key);

                if (aValue < bValue) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });

            sortableItems = sortableItems.map((item, index) => ({
                ...item,
                order: (routerPage - 1) * routerLimit + index + 1
            }));
        }
        return sortableItems;
    }, [originalData, sortConfig, routerPage, routerLimit]);

    const handleClick = (v) => {
        if (clickable) {
            onOpen()
            getInfo(v)
        }
    }

    const fiter = (v, el) => {
        if (v === "gender") {
            return el[v] ? t(el[v]) : "-"
        } else if (v === "phone_number" || v === "phone") {
            return el[v] ? numberAutoSpace(el[v]) : "-"
        } else if (v === "photo" || v === "photo_sm_uz") {
            return <Avatar src={process.env.NEXT_PUBLIC_MEDIA_URL + el[v]} cursor={!!el[v] ? "pointer" : "default"} onClick={(e) => !!el[v] && handleOpenModal({ e, link: el[v] })} />
        } else if (v === "balance" || v === "amount") {
            return numberWithSpaces(el[v])
        } else if (v === "groups") {
            return (
                el[v]?.length > 0 ? (
                    <Menu>
                        <MenuButton as={Text} cursor={"pointer"} rightIcon={<ChevronDownIcon />}>
                            {el?.[v]?.slice?.(0, 1).map((el, i) => <span key={el?.id + i || "" || i}>{el?.name} </span>)}{el[v]?.length > 2 && <span className={styles.abilitiesLength}>{`+${el?.[v]?.slice(1)?.length}`}</span>}
                        </MenuButton>
                        <MenuList p={0} maxH={"400px"} overflow={"scroll"}>
                            {el?.[v]?.map?.((el, i) =>
                                <MenuItem key={el?.id + i || "" || i}>{el?.name && <Badge textAlign={"center"} marginRight={"5px"}>{el?.name}</Badge>} {el?.name}</MenuItem>
                            )}
                        </MenuList>
                    </Menu>
                ) : "-"
            )
        } else if (
            v === "price"
            || v === "total_amount"
            || v === "total_price"
            || v === "service_amount"
            || v === "bonus"
        ) {
            return el[v] === 0 ? el[v] : el[v] ? numberWithSpaces(el[v]) : "-"
        } else if (v === "createdAt") {
            return el[v] ? <span>{formatUtcToLocal(el[v])}</span> : "-"
        } else if (v === "birthday") {
            return el[v] ? <Tooltip label={`${t("age")} ` + calculateAge(el[v])}>{el[v]?.replace(/\//g, " ")}</Tooltip> : "-"
        } else return el[v] === 0 ? el[v] : (el[v] || "-")
    }

    if (isLoading) {
        return (
            <Box className={classNames(styles.table, wrapperCls)}>
                <Box w="100%" h="100%" display={"flex"} justifyContent={"center"} alignItems={"center"}>
                    <Spinner w={"100px"} h={"100px"} thickness='4px' color='main' />
                </Box>
            </Box>
        )
    }

    return (
        <div className={classNames(styles.table, wrapperCls)}>
            {sortedData?.length > 0
                ? <div className={styles.chakraTable}>
                    <div className={styles.wrapper}>
                        <Table>
                            <Thead className={styles.tHead}>
                                <Tr>
                                    {keys.map((key, i) => (
                                        <Th
                                            {...(orders
                                                ? {
                                                    _first: {
                                                        w: "25px",
                                                        textAlign: "center",
                                                    },
                                                }
                                                : {})}
                                            _notFirst={{
                                                paddingLeft: "10px",
                                            }}
                                            whiteSpace={"nowrap"}
                                            border={"1px solid #EAECF0"}
                                            className={styles.th}
                                            key={key?.id || i}
                                            onClick={() => handleSort(key.key)}
                                            cursor={key.key === 'order' ? 'default' : 'pointer'}
                                            userSelect={"none"}
                                            sx={{
                                                width: key.key == "photo" && "50px !important",
                                            }}
                                        >
                                            {customHeaderRender[key.key]?.render ? (
                                                // If there's a custom renderer for this header
                                                <div
                                                    onClick={(e) => {
                                                        e.stopPropagation(); // Prevent sorting when clicking on custom elements
                                                        if (customHeaderRender[key.key]?.onClick) {
                                                            customHeaderRender[key.key].onClick();
                                                        }
                                                    }}
                                                >
                                                    {customHeaderRender[key.key].render()}
                                                </div>
                                            ) : (
                                                <Box display={"flex"} alignItems={"center"}>
                                                    {ucFirst(t(key.label))}
                                                    {sortConfig.key === key.key && (
                                                        sortConfig.direction === 'ascending' ? <TriangleUpIcon ml={2} /> : <TriangleDownIcon ml={2} />
                                                    )}
                                                    {sortConfig.key === key.key && (
                                                        <button type='button' onClick={(e) => {
                                                            e.stopPropagation()
                                                            setSortConfig({ key: null, direction: '' })
                                                        }}>
                                                            <IoMdCloseCircleOutline fontSize={"18px"} />
                                                        </button>
                                                    )}
                                                </Box>
                                            )}
                                        </Th>
                                    ))}
                                </Tr>
                            </Thead>

                            <Tbody className={styles.tBody}>
                                {sortedData.map((el, i) => (
                                    <Tr key={el?.id || i} minH={"72px !important"} cursor={!!clickable ? "pointer" : "default"} onClick={() => handleClick(el)} className={classNames(styles.tr)}>
                                        {keys.map((key, i) => (
                                            <Td
                                                {...(orders
                                                    ? (key.label === "№"
                                                        ? {
                                                            _first: {
                                                                w: "25px",
                                                                textAlign: "center",
                                                            },
                                                        }
                                                        : {})
                                                    : {})}
                                                className={styles.td}
                                                key={key?.id || i}
                                                border={"1px solid #EAECF0"}
                                                p={typeof (btns()) !== typeof ([]) ? "" : "7px 10px"}
                                                color={!!customCellRender[key.key]?.onClick ? "var(--primary-main)" : ""}
                                                style={customCellRender[key.key]?.style}
                                                onClick={(e) => {
                                                    // Prevent row click when clicking on cell with custom click handler
                                                    if (customCellRender[key.key]?.onClick) {
                                                        e.stopPropagation();
                                                        customCellRender[key.key].onClick(el);
                                                    }
                                                }}
                                                sx={{
                                                    width: key?.key == "photo" && "50px",
                                                }}
                                            >
                                                {i === lastKeyIndex && btns(el)?.length > 0 ? (
                                                    <div className={styles.btns}>
                                                        {customCellRender[key.key]?.render ? customCellRender[key.key].render(el) : fiter(key.key, el)}
                                                        <Box display={"flex"} alignItems={"center"} pl={"5px"}>
                                                            {btns(el)?.map((btnEl, idx) => <React.Fragment key={idx}>{btnEl}</React.Fragment>)}
                                                        </Box>
                                                    </div>
                                                ) : (
                                                    <div
                                                        style={{
                                                            display: "inline-block",
                                                            cursor: !!customCellRender[key.key]?.onClick ? "pointer" : "default",
                                                            textDecoration: !!customCellRender[key.key]?.onClick ? "underline" : "none"
                                                        }}
                                                        onClick={(e) => {
                                                            if (customCellRender[key.key]?.onClick) {
                                                                e.stopPropagation();
                                                            }
                                                        }}
                                                    >
                                                        {customCellRender[key.key]?.render ? customCellRender[key.key].render(el) : fiter(key.key, el)}
                                                    </div>
                                                )}
                                            </Td>
                                        ))}
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </div>
                    {pagination && <CustomPaginate count={count} />}
                </div>
                : <div className={styles.chakraTable}>
                    <div className={styles.emptyTable}>
                        <div className={styles.emptySection}>
                            <div className={styles.img}><img src="/images/empty.png" alt="empty.png" /></div>
                            {
                                emptyTitle
                                    ? <h2>{emptyTitle}</h2>
                                    : <h1>{t("noData")}</h1>
                            }
                        </div>
                    </div>
                    {pagination && <CustomPaginate count={count} />}
                </div>
            }
        </div>
    )
}

export default ChakraTable