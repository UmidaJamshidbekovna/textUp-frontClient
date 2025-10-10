import styles from './styles.module.scss'
import {
    Button,
    Flex,
    InputGroup,
    ModalBody,
    ModalCloseButton,
    ModalFooter,
    ModalHeader,
    Text,
} from '@chakra-ui/react'
import CustomModal from '../../Modals/CustomModal'
import CustomTextInput from '../../Inputs/CustomTextInput'
import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'
import { useState } from 'react'
import { useTemplateCreateMutation, useTemplateEdit, useTemplateGetById } from '@/services/templates.service'
import useCustomToast from '@/hooks/useCustomToast'
import { isFormFilled } from '@/utils'
import analyzeSMSTemplateContent from '@/hooks/analyzeSMSTemplateContent'
import useSMSStatsText from '@/hooks/useSMSStatsText'

const initData = {
    name: "",
    content: "",
    comment: "",
    confirmEnteredSmsText: false,
    readCharacterGuide: false,
}

const Add = ({
    objId,
    isOpenCustomModal,
    onClose = () => { },
    user,
}) => {
    const { errorToast, successToast } = useCustomToast()
    const { t } = useTranslation()
    const [state, setState] = useState(initData)
    const [characterCountingCisible, setCharacterCountingCisible] = useState(false)
    const smsStats = useSMSStatsText(analyzeSMSTemplateContent(state?.content), t);

    const { isLoading } = useTemplateGetById({
        id: objId,
        queryParams: {
            enabled: !!objId,
            onSuccess: res => {
                setState({
                    ...res,
                })
            },
            onError: err => console.log(err),
        }
    })

    const { mutate: createMutate } = useTemplateCreateMutation({
        onSuccess: res => {
            handleClose()
            successToast()
        },
        onError: err => {
            handleClose()
            errorToast(`${err?.status}, ${err?.data?.error}`)
        },
    })

    const { mutate: editMutate } = useTemplateEdit({
        onSuccess: res => {
            handleClose()
            successToast()
        },
        onError: err => {
            handleClose()
            errorToast(`${err?.status}, ${err?.data?.error}`)
        },
    })

    const data = {
        name: state?.name,
        content: state?.content,
        comment: state?.comment,
    }

    const handleConfirm = () => {
        if (objId) {
            editMutate({ id: objId, data: { ...data, status: "in_verify" } })
        } else {
            createMutate({ ...data, userId: user?.id, })
        }
    }

    const handleClose = () => {
        onClose()
        setState(initData)
    }

    return (
        <>
            <CustomModal
                isOpen={isOpenCustomModal}
                onClose={handleClose}
                contentProps={{ maxWidth: "610px" }}
            >

                <ModalHeader marginBottom={"20px"}>
                    {t("addTextTemplate")}*
                    <ModalCloseButton top={"16px"} right={"16px"} />
                </ModalHeader>

                <ModalBody className={styles.modalBody}>

                    <CustomTextInput
                        label={t("templateTitle") + "*"}
                        placeholder={t("title")}
                        onChange={(e) => setState((old) => ({ ...old, name: e.target.value }))}
                        value={state.name}
                    />

                    <InputGroup className={styles.textarea}>

                        <Text
                            className={styles.originalTextRequirement}
                        >
                            {t('originalTextRequirement')}
                        </Text>

                        <textarea
                            onChange={(e) => {
                                setState(old => ({ ...old, content: e.target.value }))
                                e.target.value.length < 1 && setCharacterCountingCisible(false)
                            }}
                            value={state.content}
                            name="text"
                            id="text"
                        ></textarea>

                        {characterCountingCisible && (
                            <p dangerouslySetInnerHTML={{ __html: smsStats }} />
                        )}

                        {!characterCountingCisible && !!state?.content?.length > 0 && (
                            <span onClick={() => setCharacterCountingCisible(true)} className={styles.characterCountingBtn}>{t("characterCounting")}</span>
                        )}

                    </InputGroup>

                    <InputGroup className={styles.textarea}>

                        <Text>{t('addComment')}</Text>

                        <textarea
                            name="commit"
                            id="commit"
                            onChange={(e) => {
                                setState(old => ({ ...old, comment: e.target.value }))
                            }}
                            value={state.comment}
                        >
                        </textarea>

                    </InputGroup>

                    <div>
                        <Link className={styles.characterUsageGuide} href={"/sms-symbol"}>{t("characterUsageGuide")}</Link>

                        <div className={styles.agreements}>

                            <label>
                                <input
                                    checked={state?.confirmEnteredSmsText}
                                    onChange={() => setState((old) => ({ ...old, confirmEnteredSmsText: !old?.confirmEnteredSmsText }))}
                                    type="checkbox"
                                />
                                {" "}
                                {t("confirmEnteredSmsText")}
                            </label>

                            <label>
                                <input
                                    checked={state?.readCharacterGuide}
                                    onChange={() => setState((old) => ({ ...old, readCharacterGuide: !old?.readCharacterGuide }))}
                                    type="checkbox"
                                />
                                {" "}
                                {t("readCharacterGuide")}
                            </label>

                        </div>
                    </div>

                </ModalBody>

                <ModalFooter>

                    <Flex gap={"12px"} w={"100%"}>

                        <Button onClick={() => handleClose()} variant={"outline"} w={"50%"}>{t("back")}</Button>

                        <Button
                            onClick={() => handleConfirm()}
                            w={"50%"}
                            isDisabled={
                                !state?.name || !state?.content || !state?.readCharacterGuide || !state.confirmEnteredSmsText
                            }
                        >
                            {t("save")}
                        </Button>

                    </Flex>

                </ModalFooter>

            </CustomModal>
        </>
    )
}

export default Add