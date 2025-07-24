import useTranslation from 'next-translate/useTranslation'
import styles from './styles.module.scss'
import { Button, Flex, Text } from '@chakra-ui/react'
import { FaExternalLinkAlt } from "react-icons/fa";
import { useState } from 'react'
import Link from 'next/link'
import CustomSelect from '../Inputs/CustomSelect';
import CustomTextInput from '../Inputs/CustomTextInput';
import classNames from 'classnames';
import RadioInput from '../Inputs/RadioInput';
import PhoneNumberInput from '../Inputs/PhoneNumberInput';
import { useGroupsGetList } from '@/services/groups.service';
import useCustomToast from '@/hooks/useCustomToast';
import { useTemplatesGetList } from '@/services/templates.service';
import MultiSelect from '../Inputs/MultiSelect';
import { useSmsCreateMutation } from '@/services/sms.service';

const initialData = {
    "message": "",
    "recipients": [""],
    "userId": "",
    "templateId": "",
    "groupId": "",
    "name": "",
    "plannedTime": "",
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
    const { t } = useTranslation()

    const { data: groupsData } = useGroupsGetList({
        params: {
            userId,
            page: 1,
            limit: groupsCount,
        },
        queryParams: {
            onError: err => {
                errorToast(`${err?.status}, ${err?.data?.error}`)
                console.log(err)
            },
            enabled: !!userId,
        },
    })

    const { data: templatesData } = useTemplatesGetList({
        params: {
            page: 1,
            limit: templatesCount,
            userId,
        },
    })

    const { mutate: sendSmsMutate, isLoading: sendLoading } = useSmsCreateMutation()

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            message: state?.message,
            recipients: state?.recipients,
            userId: state?.userId,
            templateId: state?.templateId,
            groupId: state?.groupId?.id,
            name: state?.name,
            plannedTime: state.shipment == "scheduledShipment" ? state?.date + " " + state?.time : "",
            userId,
        }
        sendSmsMutate(data)
    }

    return (
        <div className={styles.sendSMS}>

            <div className={styles.setcion}>

                <div className={styles.head}>

                    <div className={styles.btns}>

                        <Button
                            onClick={() => setTabState("byGroups")}
                            className={styles.btn}
                            variant={tabState == "byGroups" ? "solid" : "outline"}
                        >
                            {t("byGroups")}
                        </Button>

                        <Button
                            onClick={() => setTabState("byNumber")}
                            className={styles.btn}
                            variant={tabState == "byNumber" ? "solid" : "outline"}
                        >
                            {t("byNumber")}
                        </Button>

                    </div>

                    <Link href={"/sms-symbol"} className={styles.viewInstructionsLink}>{t("viewInstructions")}</Link>

                </div>

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
                                onChange={(e) => setState(old => ({ ...old, nickname: e }))}
                                options={[]}
                                value={state?.nickname}
                                placeholder={t("selectNickname")}
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
                                onChange={(e) => setState(old => ({ ...old, templates: e, templateId: e.id }))}
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
                                onChange={(e) => setState(old => ({ ...old, nickname: e }))}
                                options={[]}
                                value={state?.email}
                                placeholder={t("selectNickname")}
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
                                onChange={(e) => setState(old => ({ ...old, templates: e, templateId: e.id }))}
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
                }

            </div>

        </div>
    )
}

export default SendSMSTab