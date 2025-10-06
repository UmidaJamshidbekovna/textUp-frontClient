import useTranslation from 'next-translate/useTranslation'
import styles from './styles.module.scss'
import { Button, InputGroup, Text, useDisclosure } from '@chakra-ui/react'
import { FiDownload, FiPlus } from 'react-icons/fi'
import CustomTextInput from '../Inputs/CustomTextInput'
import { CiSearch } from "react-icons/ci";
import { useRouter } from 'next/router'
import classNames from 'classnames'
import { HiOutlineTrash } from "react-icons/hi";
import ChakraTable from '../ChakraTable'
import { keys } from './data'
import { useMemo, useState } from 'react'
import CheckboxIcon from 'public/icons/checkboxIcon'
import CheckedCheckboxIcon from 'public/icons/checkedCheckboxIcon'
import { GoDotFill } from "react-icons/go";
import TableBtn from '../TableBtn'
import { TbEdit } from "react-icons/tb";
import CheckedSomeCheckboxIcon from 'public/icons/checkedSomeCheckboxIcon'
import CustomDeleteModal from '../CustomDeleteModal'
import AddContactModal from './AddContactModal'
import { ImportContacts } from './ImportContacts'
import { FaRegTrashAlt } from 'react-icons/fa'
import { MdLock } from "react-icons/md";
import { MdLockOpen } from "react-icons/md";
import { IoArrowBack } from "react-icons/io5";
import { useContactsTabData } from './hook/useContactsTabData';
import Header from '../Header'

const btns = ({ tabState = "", props, deleteFn, editFn, inBlackList, lockOpen }) => {
    if (tabState == "blocked") {
        return [
            <div className={styles.btns} key={props?.id} id={props?.id}>
                <TableBtn onClick={() => lockOpen(props)} className={styles.ciUnlock} icon={<MdLockOpen size={"16px"} />} />
                <TableBtn onClick={() => deleteFn(props)} className={styles.faRegTrashAlt} icon={<FaRegTrashAlt size={"16px"} />} />
            </div>
        ]
    } else {
        return [
            <div className={styles.btns} key={props?.id} id={props?.id}>
                <TableBtn onClick={() => inBlackList(props)} className={styles.mdBlock} icon={<MdLock size={"16px"} />} />
                <TableBtn onClick={() => editFn(props)} className={styles.tbEdit} icon={<TbEdit size={"16px"} />} />
                <TableBtn onClick={() => deleteFn(props)} className={styles.faRegTrashAlt} icon={<FaRegTrashAlt size={"16px"} />} />
            </div>
        ]
    }
}

const ContactsTab = ({
    contactsTab,
    SSRContacts,
    groups,
    group,
    user,
}) => {
    const router = useRouter()
    const { t } = useTranslation()
    const tabState = router.query.contactsTab || contactsTab || "all"
    const { isOpen: isOpenCustomModal, onOpen: onOpenCustomModal, onClose: onCloseCustomModal } = useDisclosure();
    const { isOpen: isOpenDeleteModal, onOpen: onOpenDeleteModal, onClose: onCloseDeleteModal } = useDisclosure({
        onClose: () => {
            setDeleteState({})
        }
    });

    // Use custom hook for all API calls and state management
    const {
        chakraData,
        isLoading,
        confirmClicked,
        setConfirmClicked,
        selectedUsers,
        setSelectedUsers,
        deleteState,
        setDeleteState,
        objId,
        setObjId,
        filters,
        setFilters,
        refetch,
        editMutate,
        editLoading,
        mutate,
        deleteLoading,
        multipleDeleteMutate,
        isMultipleDeleteLoading,
        download,
        isDownloadLoading,
    } = useContactsTabData({ SSRContacts, group, user });

    const handleTabClick = (el) => {
        router.push({
            pathname: router.pathname,
            query: { ...router.query, contactsTab: el.contactTab }
        }, undefined, { shallow: true });
    }

    const editFn = (props) => {
        setObjId(props?.id)
        onOpenCustomModal();
    };

    const handleClose = () => {
        onCloseCustomModal()
        setDeleteState({})
        refetch()
        setObjId("")
    }

    const deleteFn = (props) => {
        setDeleteState(props)
        onOpenDeleteModal()
    }

    const inBlackList = (props) => {
        setDeleteState({
            inBlackList: true,
            ...props,
        })
        onOpenDeleteModal()
    }

    const lockOpen = (props) => {
        setDeleteState({
            lockOpen: true,
            ...props,
        })
        onOpenDeleteModal()
    }

    const tabs = useMemo(() => [
        {
            id: 1,
            contactTab: "all",
            count: chakraData?.count,
        },
        {
            id: 2,
            contactTab: "active",
            count: chakraData?.active,
        },
        // {
        //     id: 3,
        //     contactTab: "inactive",
        //     count: chakraData?.inactive,
        // },
        // {
        //     id: 4,
        //     contactTab: "banned",
        //     count: chakraData?.cancelled,
        // },
        {
            id: 5,
            contactTab: "blocked",
            count: chakraData?.blocked,
        },
    ], [chakraData])

    return (
        <div className={styles.contacts}>

            <div className={styles.setcion}>

                <div className={styles.head}>



                    <div className={styles.headBtns}>

                        <Button
                            onClick={onOpenCustomModal}
                            className={styles.addContact}>
                            <FiPlus fontSize={"18px"} />
                            {t("addContact")}
                        </Button>

                        <ImportContacts refetch={refetch} user={user} />

                        <Button
                            onClick={() => download()}
                            className={styles.addContact}
                            variant={"outline"}
                            isLoading={isDownloadLoading}
                        >
                            <FiDownload fontSize={"16px"} />
                            {t("downloadContacts")}
                        </Button>

                        <InputGroup flex={1}>
                            <CustomTextInput
                                icon={<CiSearch fontSize={"20px"} />}
                                placeholder={t("search")}
                                onChange={(e) => setFilters(old => ({ ...old, search: e?.target?.value }))}
                                value={filters?.search}
                            />
                        </InputGroup>

                    </div>

                </div>

                <div className={styles.uploadNewContactsInfo} dangerouslySetInnerHTML={{ __html: t("uploadNewContactsInfo") }} />

                {/* <div className={styles.searchSection}>

                    <FilterSelect
                        placeholder="Ism bo'yicha"
                    />

                </div> */}

                <div className={styles.table}>

                    <div className={styles.tabListWrapper}>

                        <div className={styles.tabList}>

                            {
                                tabs.map(el => (
                                    <div
                                        onClick={() => handleTabClick(el)}
                                        className={classNames(styles.contactTab, tabState == el.contactTab && styles.activeTab)}
                                        key={el.id}
                                    >
                                        {t(el.contactTab)}
                                        <div className={styles.count}>{el.count}</div>
                                    </div>
                                ))
                            }

                        </div>

                        <Button
                            onClick={() => multipleDeleteMutate({ userId: user?.id, contactIds: selectedUsers })}
                            className={styles.deleteSelected}
                            isLoading={isMultipleDeleteLoading}
                        >
                            <HiOutlineTrash />
                            {t("deleteSelected")}
                        </Button>

                    </div>

                    <ChakraTable
                        wrapperCls={styles.chakraTable}
                        data={chakraData?.contacts ?? []}
                        keys={keys}
                        orders={false}
                        count={tabState === "all" ? chakraData?.count : chakraData?.[tabState]}
                        btns={(e) => btns({ tabState, props: e, deleteFn, editFn, inBlackList, lockOpen })}
                        isLoading={isLoading}
                        customHeaderRender={{
                            fullName: {
                                render: (el) => (
                                    <label className={styles.full_name}>
                                        {selectedUsers.length === 0 ? (
                                            <CheckboxIcon fill="none" />
                                        ) : selectedUsers.length === chakraData.contacts?.length ? (
                                            <CheckedCheckboxIcon fill="none" />
                                        ) : (
                                            <CheckedSomeCheckboxIcon fill="none" />
                                        )}
                                        <input
                                            type="checkbox"
                                            checked={selectedUsers.length === chakraData.contacts?.length}
                                            onChange={() => {
                                                if (selectedUsers.length === chakraData.contacts?.length) {
                                                    setSelectedUsers([]);
                                                } else {
                                                    setSelectedUsers(chakraData.contacts?.map(item => item.id) || []);
                                                }
                                            }}
                                        />
                                        {t("fullName")}
                                    </label>
                                ),
                            }
                        }}
                        customCellRender={{
                            fullName: {
                                render: (el) => (
                                    <label className={styles.full_name}>
                                        {selectedUsers.includes(el.id) ?
                                            <CheckedCheckboxIcon fill={"none"} /> :
                                            <CheckboxIcon fill={"none"} />
                                        }
                                        <input
                                            type="checkbox"
                                            value={el.id}
                                            checked={selectedUsers.includes(el.id)}
                                            onChange={(e) => {
                                                e.stopPropagation();
                                                setSelectedUsers((prev) =>
                                                    prev.includes(el.id)
                                                        ? prev.filter(id => id !== el.id)
                                                        : [...prev, el.id]
                                                );
                                            }}
                                        />
                                        {el.fullName}
                                    </label>
                                ),
                            },
                            status: {
                                render: (el) => (
                                    <span className={classNames(styles.status, styles[String(el.status).toLowerCase()])}>
                                        <GoDotFill />
                                        {t(el.status)}
                                    </span>
                                )
                            },
                        }}
                    />

                </div>

                <AddContactModal
                    isOpen={isOpenCustomModal}
                    onClose={handleClose}
                    groups={groups}
                    user={user}
                    objId={objId}
                />

                <CustomDeleteModal
                    isOpen={isOpenDeleteModal}
                    onClose={onCloseDeleteModal}
                    headerContent={deleteState.inBlackList
                        ? t("blockFullName", { name: deleteState?.fullName ?? "" })
                        : t("deleteFullName", { name: deleteState?.fullName ?? "" })
                    }
                    isLoading={deleteLoading || confirmClicked}
                    isDisabled={deleteLoading || confirmClicked}
                    confirm={() => {
                        if (deleteState.inBlackList) {

                            if (!deleteState?.id || confirmClicked) return;
                            setConfirmClicked(true);

                            editMutate(
                                { id: deleteState?.id, data: { status: "blocked" } },
                                {
                                    onSuccess: () => {
                                        onCloseDeleteModal();
                                        handleClose();
                                        setConfirmClicked(false); // сброс
                                    },
                                    onError: () => {
                                        setConfirmClicked(false); // сброс
                                    },
                                }
                            )

                        } else if (deleteState.lockOpen) {

                            if (!deleteState?.id || confirmClicked) return;
                            setConfirmClicked(true);

                            editMutate(
                                { id: deleteState?.id, data: { status: "active" } },
                                {
                                    onSuccess: () => {
                                        onCloseDeleteModal();
                                        handleClose();
                                        setConfirmClicked(false); // сброс
                                    },
                                    onError: () => {
                                        setConfirmClicked(false); // сброс
                                    },
                                }
                            )

                        } else {
                            if (!deleteState?.id || confirmClicked) return;

                            setConfirmClicked(true);

                            mutate(
                                { id: deleteState?.id },
                                {
                                    onSuccess: () => {
                                        onCloseDeleteModal();
                                        handleClose();
                                        setConfirmClicked(false); // сброс
                                    },
                                    onError: () => {
                                        setConfirmClicked(false); // сброс
                                    },
                                }
                            );
                        }
                    }}

                />

            </div>

        </div>
    )
}

export default ContactsTab