import { Button, Flex, useDisclosure } from '@chakra-ui/react';
import ChakraTable from '../ChakraTable';
import { keys } from './data';
import styles from './styles.module.scss'
import useTranslation from 'next-translate/useTranslation';
import { FaPlus, FaRegTrashAlt } from 'react-icons/fa';
import TableBtn from '../TableBtn';
import { TbEdit } from 'react-icons/tb';
import { useState } from 'react';
import CustomDeleteModal from '../CustomDeleteModal';
import { useRouter } from 'next/router';
import Add from './Add';
import { useGroupDeleteMutation, useGroupEdit, useGroupsGetList } from '@/services/groups.service';
import useCustomToast from '@/hooks/useCustomToast';
import CustomTextInput from '../Inputs/CustomTextInput';
import { CiSearch } from 'react-icons/ci';
import { MdLock, MdLockOpen } from 'react-icons/md';
import classNames from 'classnames';

const btns = ({ props, deleteFn, editFn, statusEdit }) => {

    return [
        <div className={styles.btns} key={props?.id} id={props?.id}>
            <TableBtn
                onClick={() => props?.status == "blocked" ? statusEdit(props, "active") : statusEdit(props, "blocked")}
                className={classNames(props?.status == "blocked" ? styles.mdBlock : styles.ciUnlock)}
                icon={props?.status == "blocked" ? <MdLock size={"16px"} /> : <MdLockOpen size={"16px"} />}
            />
            <TableBtn
                onClick={() => editFn(props)}
                className={styles.tbEdit}
                icon={<TbEdit size={"16px"} />}
            />
            <TableBtn
                onClick={() => deleteFn(props)}
                className={styles.faRegTrashAlt}
                icon={<FaRegTrashAlt size={"16px"} />}
            />
        </div>
    ]
}

function GroupsTab({ SSRGroups, user }) {
    const { errorToast, successToast } = useCustomToast()
    const router = useRouter()
    const page = router.query?.page ?? 1
    const limit = router.query?.limit ?? 10
    const userId = user?.id ?? ""
    const { t } = useTranslation()
    const [objId, setObjId] = useState("")
    const [deleteState, setDeleteState] = useState({})
    const [groups, setGroups] = useState(SSRGroups?.groups ?? [])
    const [count, setCount] = useState(SSRGroups?.count ?? 0)
    const [filters, setFilters] = useState({ search: "" })
    const [confirmClicked, setConfirmClicked] = useState(false);
    const { isOpen: isOpenCustomModal, onOpen: onOpenCustomModal, onClose: onCloseCustomModal } = useDisclosure({
        defaultIsOpen: router?.query?.modal === "open",
        onClose: () => {
            closeModal()
        }
    });
    const { isOpen: isOpenDeleteModal, onOpen: onOpenDeleteModal, onClose: onCloseDeleteModal } = useDisclosure({
        onClose: () => {
            handleClose()
            setDeleteState({})
        }
    });

    const { isLoading, refetch } = useGroupsGetList({
        params: {
            userId,
            page,
            limit,
            search: filters.search,
        },
        queryParams: {
            onSuccess: res => {
                setGroups(res.groups ?? [])
                setCount(res.count ?? 0)
            },
            onError: err => {
                errorToast(`${err?.status}, ${err?.data?.error}`)
                console.log(err)
            },
            enabled: !!userId,
        },
    })

    const { mutate, isLoading: deleteLoading } = useGroupDeleteMutation({
        onSuccess: res => {
            refetch()
            successToast()
        },
        onError: err => {
            errorToast(`${err?.status}, ${err?.data?.error}`)
            console.log(err)
        },
    })

    const { mutate: editMutate } = useGroupEdit({
        onSuccess: res => {
            handleClose()
            successToast()
        },
        onError: err => {
            handleClose()
            errorToast(`${err?.status}, ${err?.data?.error}`)
        },
    })

    const closeModal = () => {
        router.push({
            pathname: router.pathname,
            query: { ...router.query, modal: "", }
        }, undefined, { shallow: true });
    };

    const editFn = (props) => {
        setObjId(props?.id)
        onOpenCustomModal();
    };

    const deleteFn = (props) => {
        setDeleteState(props)
        onOpenDeleteModal()
    }

    const handleClose = () => {
        refetch()
        onCloseCustomModal()
    }

    const statusEdit = (props, status) => {
        if (status == "blocked") {
            setDeleteState({
                inBlackList: true,
                ...props,
            })
        } else {
            setDeleteState({
                lockOpen: true,
                ...props,
            })
        }
        onOpenDeleteModal()
    }

    const handleConfirm = () => {
        if (!deleteState?.id || confirmClicked) return;
        setConfirmClicked(true);

        const isBlock = deleteState.inBlackList;
        const isLockToggle = deleteState.lockOpen;

        const action = isBlock || isLockToggle
            ? editMutate
            : mutate;

        const data = isBlock
            ? { id: deleteState.id, data: { status: "blocked", name: deleteState?.name ?? "", description: deleteState?.description ?? "" } }
            : isLockToggle
                ? { id: deleteState.id, data: { status: "active", name: deleteState?.name ?? "", description: deleteState?.description ?? "" } }
                : { id: deleteState.id };

        action(data, {
            onSuccess: () => {
                onCloseDeleteModal();
                handleClose();
                setConfirmClicked(false);
            },
            onError: () => {
                setConfirmClicked(false);
            },
        });
    };

    return (
        <div className={styles.groups}>

            <div className={styles.section}>

                <Flex mb={"24px"} gap={"10px"}>
                    <Button onClick={() => onOpenCustomModal()} alignItems={"center"} display={"flex"} gap={"4px"}><FaPlus />{t("addGroup")}</Button>
                    {/* <InputGroup flex={1}>
                            <CustomTextInput
                                icon={<CiSearch fontSize={"20px"} />}
                                placeholder={t("search")}
                                onChange={(e) => setFilters(old => ({ ...old, search: e?.target?.value }))}
                                value={filters?.search}
                            />
                        </InputGroup> */}
                </Flex>

                <ChakraTable
                    wrapperCls={styles.chakraTable}
                    data={groups}
                    keys={keys}
                    btns={(props) => btns({ props, editFn, deleteFn, statusEdit })}
                    count={count}
                    isLoading={isLoading}
                    customCellRender={{
                        name: {
                            render: (gr) => <Button variant={"link"} onClick={() => router.push(`/user/send-sms?tab=contacts&groupId=${gr.id}`)}>{gr?.name ? gr?.name : "-"}</Button>,
                        },
                    }}
                />

            </div>

            <Add
                isOpen={isOpenCustomModal}
                refetch={refetch}
                objId={objId}
                setObjId={setObjId}
                onClose={handleClose}
                userId={userId}
            />

            <CustomDeleteModal
                isOpen={isOpenDeleteModal}
                onClose={onCloseDeleteModal}
                headerContent={
                    deleteState.inBlackList
                        ? t("blockFullName", { name: deleteState?.name ?? "" })
                        : t("deleteFullName", { name: deleteState?.name ?? "" })
                }
                isLoading={deleteLoading || confirmClicked}
                isDisabled={deleteLoading || confirmClicked}
                confirm={handleConfirm}
            />

        </div>
    )
}

export default GroupsTab