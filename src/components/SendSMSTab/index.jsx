import useTranslation from 'next-translate/useTranslation'
import styles from './styles.module.scss'
import { Button, Flex, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton } from '@chakra-ui/react'
import { FaExternalLinkAlt, FaCheckCircle } from "react-icons/fa";
import { useState } from 'react'
import Link from 'next/link'
import CustomSelect from '../Inputs/CustomSelect';
import CustomTextInput from '../Inputs/CustomTextInput';
import classNames from 'classnames';
import RadioInput from '../Inputs/RadioInput';
import PhoneNumberInput from '../Inputs/PhoneNumberInput';
import useCustomToast from '@/hooks/useCustomToast';
import { useSmsCreateMutation } from '@/services/sms.service';
import { useSendSMSData } from './hook/useSendSMSData';


const initialData = {
    "message": "",
    "recipients": [""],
    "userId": "",
    "templateId": "",
    "groupId": "",
    "name": "",
    "plannedTime": "",
    "templates": "",
    "phone": "",
    "nicknameId": "",
}

const SendSMSTab = ({
    user,
    groupsCount,
    templatesCount,
}) => {
    const userId = user?.id ?? ""
    const { errorToast, successToast } = useCustomToast()
    const [tabState, setTabState] = useState("byGroups")
    const [state, setState] = useState(initialData)
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
    const { t } = useTranslation()


    const { groupsData, templatesData, nickNamesData, isLoading } = useSendSMSData({
        user,
        groupsCount,
        templatesCount
    })

    console.log('nickNamesData', nickNamesData)
    console.log('templatesData', templatesData)


    const { mutate: sendSmsMutate, isLoading: sendLoading } = useSmsCreateMutation({
        onSuccess: (data) => {
            setIsSuccessModalOpen(true)
            setState(initialData) // Reset form after successful send
        },
        onError: (error) => {
            errorToast(error?.data?.error_message || "Failed to send message")
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        const phoneOrRec = tabState == "byGroups" ? ({ recipients: state?.recipients }) : ({ recipients: [`${state?.phone}`] })
        const data = {
            message: state?.message,
            userId: state?.userId,
            templateId: state?.templateId,
            groupId: state?.groupId?.id,
            name: state?.name,
            nicknameId: state?.nicknameId?.id,
            plannedTime: state.shipment == "scheduledShipment" ? state?.date + " " + state?.time : "",
            userId,
            ...phoneOrRec,
        }
        sendSmsMutate(data)
    }





    return (
        <div className={styles.sendSMS}>

            <div className={styles.setcion}>

                <div className={styles.head}>

                    <div className={styles.btns}>

                        <Button
                            onClick={() => {
                                setTabState("byGroups")
                                setState(initialData)
                            }
                            }
                            className={styles.btn}
                            variant={tabState == "byGroups" ? "solid" : "outline"}
                        >
                            {t("byGroups")}
                        </Button>

                        <Button
                            onClick={() => {
                                setTabState("byNumber")
                                setState(initialData)
                            }}
                            className={styles.btn}
                            variant={tabState == "byNumber" ? "solid" : "outline"}
                        >
                            {t("byNumber")}
                        </Button>

                    </div>

                    <Link href={"/sms-symbol"} className={styles.viewInstructionsLink}>{t("viewInstructions")}</Link>

                </div>

                {/* ========================== by Groups ========================== */}
                {tabState == "byGroups"
                    ? <form onSubmit={handleSubmit} className={styles.form}>

                        <div className={styles.drawerInp}>

                            <Flex justifyContent={"space-between"}>
                                <Text mb='6px'>{t('nickname')}</Text>
                                <Link href={"/user/sms?tab=applicationForNick&modal=open"}>
                                    <Flex alignItems={"center"} fontWeight={600} fontSize={"14px"} lineHeight={"20px"} gap={"4px"} color={"primary.main"}>
                                        {t("getNickname")}
                                        <FaExternalLinkAlt />
                                    </Flex>
                                </Link>
                            </Flex>
                            <CustomSelect
                                onChange={(e) => setState(old => ({ ...old, nicknameId: e }))}
                                options={nickNamesData?.nickNames ?? []}
                                value={state?.nicknameId}
                                placeholder={t("selectNickname")}
                                selectKey='name'
                            />

                        </div>

                        <CustomTextInput
                            label={t("shipmentName")}
                            placeholder={t("enterShipmentName")}
                            onChange={(e) => setState(old => ({ ...old, name: e.target.value }))}
                            value={state.name}
                        />

                        <div className={classNames(styles.drawerInp, styles.fullWidth)}>

                            <Flex justifyContent={"space-between"}>
                                <Text mb='6px'>{t('group')}</Text>
                                <Link href={"/user/send-sms?tab=groups&modal=open"}>
                                    <Flex alignItems={"center"} fontWeight={600} fontSize={"14px"} lineHeight={"20px"} gap={"4px"} color={"primary.main"}>
                                        {t("createGroup")}
                                        <FaExternalLinkAlt />
                                    </Flex>
                                </Link>
                            </Flex>

                            <CustomSelect
                                onChange={(e) => setState(old => ({ ...old, groupId: e }))}
                                options={groupsData?.groups ?? []}
                                value={state?.groupId}
                                placeholder={t("selectGroup")}
                                selectKey='name'
                            />

                        </div>

                        <div className={styles.sendTypes}>

                            <RadioInput
                                label={t("quickShipment")}
                                onChange={(e) => setState(old => ({ ...old, shipment: "quickShipment" }))}
                                value={"quickShipment"}
                                name={"sendType"}
                            />

                            <RadioInput
                                label={t("scheduledShipment")}
                                onChange={(e) => setState(old => ({ ...old, shipment: "scheduledShipment" }))}
                                value={"scheduledShipment"}
                                name={"sendType"}
                            />

                        </div>

                        {
                            state.shipment == "scheduledShipment" && (
                                <div className={styles.dateInps}>

                                    <label className={styles.date}>
                                        <input onChange={(e) => setState(old => ({ ...old, date: e.target.value }))} value={state?.date} type="date" />
                                    </label>

                                    <label className={styles.date}>
                                        <input onChange={(e) => setState(old => ({ ...old, time: e.target.value }))} value={state?.time} type="time" />
                                    </label>

                                </div>
                            )
                        }

                        <div className={classNames(styles.drawerInp, styles.fullWidth)}>

                            <Flex justifyContent={"space-between"}>
                                <Text mb='6px'>{t('approvedTemplates')}</Text>
                                <Link href={""}>
                                    <Flex alignItems={"center"} fontWeight={600} fontSize={"14px"} lineHeight={"20px"} gap={"4px"} color={"primary.main"}>
                                        {t("createTemplate")}
                                        <FaExternalLinkAlt />
                                    </Flex>
                                </Link>
                            </Flex>

                            <CustomSelect
                                onChange={(template) => {
                                    setState(old => ({
                                        ...old,
                                        templates: template,
                                        templateId: template.id,
                                        message: template?.content || old.message
                                    }))
                                }}
                                options={templatesData?.templates ?? []}
                                value={state?.templates}
                                placeholder={t("selectTemplate")}
                                selectKey='name'
                            />

                        </div>

                        <div className={classNames(styles.drawerInp, styles.fullWidth)}>

                            <Text mb='6px'>{t('messageText')}</Text>

                            <textarea
                                className={styles.textarea}
                                placeholder={t("message")}
                                name="text"
                                id="text"
                                onChange={(e) => setState(old => ({ ...old, message: e.target.value }))}
                                value={state.message}
                            >
                            </textarea>

                        </div>

                        <Button type='submit' className={styles.sendBtn}>{t("send")}</Button>

                    </form>
                    /* ========================== by Number ========================== */
                    : <form onSubmit={handleSubmit} className={styles.form}>

                        <div className={classNames(styles.drawerInp, styles.fullWidth)}>

                            <Flex justifyContent={"space-between"}>
                                <Text mb='6px'>{t('nickname')}</Text>
                                <Link href={"/user/sms?tab=applicationForNick&modal=open"}>
                                    <Flex alignItems={"center"} fontWeight={600} fontSize={"14px"} lineHeight={"20px"} gap={"4px"} color={"primary.main"}>
                                        {t("getNickname")}
                                        <FaExternalLinkAlt />
                                    </Flex>
                                </Link>
                            </Flex>

                            <CustomSelect
                                onChange={(e) => setState(old => ({ ...old, nicknameId: e }))}
                                options={nickNamesData?.nickNames ?? []}
                                value={state?.nicknameId}
                                placeholder={t("selectNickname")}
                                selectKey='name'
                            />


                        </div>

                        <div className={classNames(styles.drawerInp, styles.fullWidth)}>
                            <Text mb='6px'>{t('phoneNumber')}</Text>
                            <PhoneNumberInput
                                label={t("phoneNumber")}
                                placeholder={"+998"}
                                onChange={(e) => setState(old => ({ ...old, phone: String(e.target.value)?.replace(/\ /g, "") }))}
                                value={state.phone}
                            />
                        </div>

                        <div className={classNames(styles.drawerInp, styles.fullWidth)}>

                            <Flex justifyContent={"space-between"}>
                                <Text mb='6px'>{t('approvedTemplates')}</Text>
                                <Link href={""}>
                                    <Flex alignItems={"center"} fontWeight={600} fontSize={"14px"} lineHeight={"20px"} gap={"4px"} color={"primary.main"}>
                                        {t("createTemplate")}
                                        <FaExternalLinkAlt />
                                    </Flex>
                                </Link>
                            </Flex>

                            <CustomSelect
                                onChange={(template) => {
                                    console.log('Selected template:', template)
                                    setState(old => ({
                                        ...old,
                                        templates: template,
                                        templateId: template.id,
                                        message: template?.content || old.message
                                    }))
                                }}
                                options={templatesData?.templates ?? []}
                                value={state?.templates}
                                placeholder={t("selectTemplate")}
                                selectKey='name'
                            />

                        </div>

                        <div className={classNames(styles.drawerInp, styles.fullWidth)}>

                            <Text mb='6px'>{t('messageText')}</Text>

                            <textarea
                                className={styles.textarea}
                                placeholder={t("message")}
                                name="text"
                                id="text"
                                onChange={(e) => setState(old => ({ ...old, message: e.target.value }))}
                                value={state.message}
                            >
                            </textarea>

                        </div>

                        <Button type='submit' className={styles.sendBtn} isLoading={sendLoading} loadingText={t("sending")}>
                            {t("send")}
                        </Button>

                    </form>
                }

            </div>

            {/* Success Modal */}
            <Modal isOpen={isSuccessModalOpen} onClose={() => setIsSuccessModalOpen(false)} isCentered>
                <ModalOverlay />
                <ModalContent maxW="400px" mx={4}>
                    <ModalHeader textAlign="center" pb={2}>
                        <Flex direction="column" align="center" gap={3}>
                            <FaCheckCircle size={48} color="#48BB78" />
                            <Text fontSize="xl" fontWeight="bold" color="green.500">
                                {t("success")}
                            </Text>
                        </Flex>
                    </ModalHeader>
                    <ModalBody textAlign="center" py={4}>
                        <Text fontSize="md" color="gray.600">
                            {t("yourMessageHasBeenSentSuccessfully")}
                        </Text>
                    </ModalBody>
                    <ModalFooter justifyContent="center" pt={2}>
                        <Button
                            colorScheme="green"
                            onClick={() => setIsSuccessModalOpen(false)}
                            px={8}
                        >
                            {t("ok")}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </div>
    )
}

export default SendSMSTab