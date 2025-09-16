import useTranslation from 'next-translate/useTranslation'
import ChakraTable from '../ChakraTable'
import styles from './styles.module.scss'
import Link from 'next/link'
import DatePicker from 'react-multi-date-picker'
import { CiCalendar } from 'react-icons/ci'
import CustomSelect from '../Inputs/CustomSelect'
import { keys, statuses } from './initialData'
import classNames from 'classnames'
import { useSmsGetList } from '@/services/sms.service'
import useCustomToast from '@/hooks/useCustomToast'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Box } from '@chakra-ui/react'

const ReportByDate = ({
    reportByDate,
    user,
}) => {
    const { successToast, errorToast, infoToast } = useCustomToast()
    const router = useRouter()
    const page = router.query?.page ?? 1
    const limit = router.query?.limit ?? 10
    const [chakraData, setChakraData] = useState({
        smsList: reportByDate?.smsList ?? [],
        count: reportByDate?.count ?? 0,
        deliveredCount: reportByDate?.deliveredCount ?? 0,
        notDeliveredCount: reportByDate?.notDeliveredCount ?? 0,
        sendCount: reportByDate?.sendCount ?? 0,
    })

    const [filters, setFilters] = useState({
        from: "",
        to: "",
        status: "",
        type: "",
    })
    const { t } = useTranslation()

    const { isLoading } = useSmsGetList({
        queryParams: {
            onSuccess: res => {
                setChakraData({
                    smsList: res?.smsList ?? [],
                    count: res?.count ?? [],
                    deliveredCount: res?.deliveredCount ?? [],
                    notDeliveredCount: res?.notDeliveredCount ?? [],
                    sendCount: res?.sendCount ?? [],
                })
            },
        },
        params: (() => {
            const p = { userId: user?.id, page, limit };
            if (router.query?.groupId) p.groupId = router.query.groupId;
            return p;
        })(),
    })

    return (
        <div className={styles.contacts}>

            <div className={styles.setcion}>

                <div className={styles.head}>

                    <h2 className={styles.title}>{t("reportByDate")}</h2>

                    <Link href={"/sms-symbol"} className={styles.link}>{t("instructionReview")}</Link>

                </div>

                <div className={styles.filters}>

                    <label className={styles.label}>
                        {t("fromDate")}
                        <div className={styles.inp}>
                            <CiCalendar fontSize={"20px"} />
                            <DatePicker
                                value={filters.from}
                                onChange={(e) => setFilters(old => ({ ...old, from: e?.format("YYYY-MM-DD") }))}
                                placeholder={t("selectDate")}
                                dateSeparator=" => "
                                style={{
                                    width: "100px",
                                    border: "none",
                                    fontWeight: "600",
                                    fontSize: "14px",
                                    lineHeight: "20px",
                                }}
                                calendarPosition='bottom'
                            />
                        </div>
                    </label>

                    <label className={styles.label}>
                        {t("toDate")}
                        <div className={styles.inp}>
                            <CiCalendar fontSize={"20px"} />
                            <DatePicker
                                value={filters.to}
                                onChange={(e) => setFilters(old => ({ ...old, to: e?.format("YYYY-MM-DD") }))}
                                placeholder={t("selectDate")}
                                dateSeparator=" => "
                                style={{
                                    width: "100px",
                                    border: "none",
                                    fontWeight: "600",
                                    fontSize: "14px",
                                    lineHeight: "20px",
                                }}
                                calendarPosition='bottom'
                            />
                        </div>
                    </label>

                    {/* <label className={styles.label}>
                        {t("time")}
                        <input className={styles.inp} type="time" name="time" id="time" />
                    </label> */}

                    {/* <CustomSelect
                        label={t("region")}
                        options={[{ id: 1, label: "Контакты", value: "Контакты" }]}
                        placeholder={t("all")}
                    /> */}

                    {/* <CustomSelect
                        label={t("operator")}
                        options={[{ id: 1, label: "Контакты", value: "Контакты" }]}
                        placeholder={t("all")}
                    /> */}

                    <Box w={"200px"}>
                        <CustomSelect
                            label={t("byStatus")}
                            options={statuses}
                            placeholder={t("all")}
                            onChange={(e) => setFilters(old => ({ ...old, status: e?.id }))}
                            value={statuses.find(el => el?.id == filters.status)}
                            t={t}
                        />
                    </Box>

                    {/* <CustomSelect
                        label={t("byType")}
                        options={[{ id: 1, label: "Контакты", value: "Контакты" }]}
                        placeholder={t("all")}
                    /> */}

                </div>

                <button className={styles.reset}>{t("reset")}</button>

                <div className={styles.statusesCounts}>
                    <div
                        className={styles.statusDiv}
                        onClick={() => setFilters(old => ({ ...old, status: "" }))}
                    >
                        {t("all")} ({chakraData.count})
                    </div>
                    <div
                        className={classNames(styles.statusDiv, styles.delivered)}
                        onClick={() => setFilters(old => ({ ...old, status: "delivered" }))}
                    >
                        {t("deliveredWithNumber", { number: chakraData.deliveredCount })}
                    </div>
                    <div
                        className={classNames(styles.statusDiv, styles.transferred)}
                        onClick={() => setFilters(old => ({ ...old, status: "send" }))}
                    >
                        {t("transferredWithNumber", { number: chakraData?.sendCount })}
                    </div>
                    <div
                        className={classNames(styles.statusDiv, styles.notDelivered)}
                        onClick={() => setFilters(old => ({ ...old, status: "not_delivered" }))}
                    >
                        {t("notDeliveredWithNumber", { number: chakraData?.notDeliveredCount })}
                    </div>
                </div>

                <div className={styles.info}>
                    <h2 className={styles.smsCost}>{t("smsCost")}</h2>
                    <h2 className={styles.smsPaymentInfo}>{t("smsPaymentInfo")}</h2>
                </div>

                <div className={styles.table}>

                    <ChakraTable
                        wrapperCls={styles.chakraTable}
                        data={chakraData.smsList}
                        count={chakraData.count}
                        keys={keys}
                        isLoading={isLoading}
                        customCellRender={{
                            // phone: {
                            //     render: el => (
                            //         <div className={styles.phone}>
                            //             {numberAutoSpace(el.phone)}
                            //             <button className={styles.viewCharacters}>{t("viewCharacters")}</button>
                            //         </div>
                            //     ),
                            // },
                            // messageText: {
                            //     render: el => (
                            //         <div className={styles.messageText}>
                            //             <div className={styles.text}>{el?.messageText?.text}</div>
                            //             <div className={styles.link}>{el?.messageText?.link}</div>
                            //             <div>{t("characterCount", { symbol: el?.messageText?.symbol, count: el?.messageText?.count, })}</div>
                            //         </div>
                            //     ),
                            // },
                            // status_data: {
                            //     render: el => (
                            //         <div className={styles.statusWrapper}>
                            //             <span className={styles.statusDate}>{el.status_data.date}</span>
                            //             <span className={classNames(styles.statusDiv, styles?.[el?.status_data?.status])}>{t(el.status_data.status)}</span>
                            //         </div>
                            //     ),
                            // },
                        }}
                    />

                </div>

            </div>

        </div>
    )
}

export default ReportByDate