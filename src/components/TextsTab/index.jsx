import useTranslation from 'next-translate/useTranslation'
import styles from './styles.module.scss'
import {
    Box,
    Button,
    Flex,
    InputGroup,
    Text,
    useDisclosure
} from '@chakra-ui/react'
import ChakraTable from '../ChakraTable'
import { keys, statusStyles, template_types } from './initialData'
import { IoIosWarning } from "react-icons/io";
import Instruction from '../Instruction'
import DeleteModal from '../Modals/DeleteModal'
import Add from './Add'
import { useTemplateDeleteMutation, useTemplatesGetList } from '@/services/templates.service'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { FaPlus } from 'react-icons/fa'
import useCustomToast from '@/hooks/useCustomToast'
import CustomTextInput from '../Inputs/CustomTextInput'
import { CiSearch } from 'react-icons/ci'
import { formatUtcToLocal } from '@/utils'


// active
// inactive
// in_verify
// blocked
// cancelled

const TextsTab = ({
    SSRTemplates,
    user,
}) => {
    const { errorToast, successToast } = useCustomToast()
    const router = useRouter()
    const page = router.query?.page ?? 1
    const limit = router.query?.limit ?? 10
    const [chakraData, setChakraData] = useState({ templates: SSRTemplates?.templates ?? [], count: SSRTemplates?.count ?? 0 })
    const { isOpen: isOpenDeleteModal, onOpen: onOpenDeleteModal, onClose: onCloseDeleteModal } = useDisclosure();
    const { isOpen: isOpenCustomModal, onOpen: onOpenCustomModal, onClose: onCloseCustomModal } = useDisclosure();
    const { t } = useTranslation()
    const [deleteState, setDeleteState] = useState({})
    const [objId, setObjId] = useState("")
    const [filters, setFilters] = useState({ search: "" })
    const { refetch, isLoading } = useTemplatesGetList({
        params: {
            page,
            limit,
            userId: user.id,
            search: filters.search,
        },
        queryParams: {
            onSuccess: (res) => {
                setChakraData({ templates: res?.templates ?? [], count: res?.count ?? 0 })
            }
        }
    })

    const { mutate: deleteMutate, isLoading: deleteLoading } = useTemplateDeleteMutation({
        onSuccess: res => {

            refetch()
            successToast()
            onCloseDeleteModal()
        },
        onError: err => {
            errorToast(`${err?.status}, ${err?.data?.error}`)
            console.log(err)
        },
    })

    const deleteFn = (props) => {
        setDeleteState(props)
        onOpenDeleteModal()
    }

    return (
        <div className={styles.texts}>
            <div className={styles.warningMessage}>
                <IoIosWarning />

                <p>Tasdiqlash uchun yuborilgan Matnlar Dushanbadan-Jumagacha 09:00-17:00 gacha ko&apos;rib chiqiladi.

                    SMS habar matnlari 1 soatdan 3 soatgacha moderatsiyadan o&apos;tkaziladi.</p>
            </div>
            <div className={styles.setcion}>

                <div className={styles.head}>

                    <h2 className={styles.textsTitle}>{t("texts")}</h2>

                    <div className={styles.btns}>

                        <InputGroup flex={1}>
                            <CustomTextInput
                                icon={<CiSearch fontSize={"20px"} />}
                                placeholder={t("search")}
                                onChange={(e) => setFilters(old => ({ ...old, search: e?.target?.value }))}
                                value={filters?.search}
                            />
                        </InputGroup>

                        <Button onClick={onOpenCustomModal} className={styles.addBtn}><FaPlus />{t("addText")}</Button>

                        <Add
                            objId={objId}
                            isOpenCustomModal={isOpenCustomModal}
                            user={user}
                            onClose={() => {
                                onCloseCustomModal()
                                setObjId("")
                                refetch()
                            }}
                        />

                    </div>

                </div>

                <Instruction />

                <ChakraTable
                    wrapperCls={styles.chakraTable}
                    keys={keys}
                    data={chakraData.templates}
                    count={chakraData.count}
                    customCellRender={{
                        name: {
                            render: (el) => (
                                <Flex flexDirection={"column"} gap={"5px"} width={"180px"}>
                                    <Box>{el?.name}</Box>
                                    <Box sx={{
                                        ...statusStyles[el.status],
                                        width: 'fit-content',
                                    }}>{t(el?.status)}</Box>
                                </Flex>
                            )
                        },
                        sender_name: {
                            render: (el) => el?.user_full_name
                        },
                        template_types: {
                            render: (el) => (
                                <Flex flexDirection={"column"} >
                                    {template_types?.map((type, i) => (
                                        <div key={i} dangerouslySetInnerHTML={{ __html: type }} />
                                    ))}
                                </Flex>
                            )
                        },
                        content: {
                            render: (el) => (
                                <Box maxW={"90%"}>
                                    <div style={{ marginBottom: "24px", width: '100%' }} dangerouslySetInnerHTML={{ __html: el?.content }} />
                                    {!!el?.reason && <Flex gap={"5px"} style={{ color: el.status == "cancelled" ? "red" : "#000" }}>
                                        {el.status == "cancelled" && <IoIosWarning style={{ flexShrink: 0 }} />}
                                        {el?.reason}
                                    </Flex>}
                                </Box>
                            )
                        },
                        createdAt: {
                            render: (el) => (
                                <Flex flexDirection={"column"} gap={"12px"} alignItems={"start"} width={"200px"}>
                                    {el?.createdAt && <div><b>{t("createdAt")}:</b> {formatUtcToLocal(el.createdAt)}</div>}
                                    {el?.acceptedAt && <div><b>{t("textAccepted")}:</b> {formatUtcToLocal(el.acceptedAt)}</div>}
                                    {el?.cancelledAt && <div><b>{t("textRejected")}:</b> {formatUtcToLocal(el.cancelledAt)}</div>}
                                    {/* {el?.dates?.map((date, i) => (
                                        <div key={i} dangerouslySetInnerHTML={{ __html: date }} />
                                    ))} */}
                                    {el.status == "cancelled" && <Button onClick={() => deleteFn(el)} variant={"delete"}>{t("delete")}</Button>}
                                    {el.status == "cancelled" && <Button
                                        onClick={() => {
                                            setObjId(el.id)
                                            onOpenCustomModal()
                                        }}
                                        variant={"rejectEdit"}
                                    >
                                        {t("edit")}
                                    </Button>}
                                </Flex>
                            )
                        },
                    }}
                    // emptyTitle={t("noChangesInOrder")}
                    isLoading={isLoading}
                />

                <DeleteModal
                    onDelete={() => {

                        if (deleteState.id) {
                            deleteMutate({ id: deleteState?.id })
                        }
                    }}
                    isOpen={isOpenDeleteModal}
                    onClose={onCloseDeleteModal}
                    isLoading={deleteLoading}
                >
                    <Text fontWeight={600} fontSize={"16px"} lineHeight={"28px"}>
                        {t("deleteFullName", { name: deleteState.name })}
                    </Text>
                    <Text fontWeight={400} fontSize={"14px"} lineHeight={"20px"}>
                        {t("confirmDeletion")}
                    </Text>
                </DeleteModal>

            </div>

        </div>
    )
}

export default TextsTab