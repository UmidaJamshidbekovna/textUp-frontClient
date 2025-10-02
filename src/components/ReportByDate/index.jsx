import useTranslation from 'next-translate/useTranslation'
import ChakraTable from '../ChakraTable'
import styles from './styles.module.scss'
import Link from 'next/link'
import DatePicker, { DateObject } from 'react-multi-date-picker'
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
        from_date: "",
        to_date: "",
        status: "",
        type: "",
    })
    const { t } = useTranslation()

    const { isLoading } = useSmsGetList({
        queryParams: {
            onSuccess: res => {
                setChakraData({
                    smsList: res?.smsList ?? [],
                    count: res?.count ?? 0,
                    deliveredCount: res?.deliveredCount ?? 0,
                    notDeliveredCount: res?.notDeliveredCount ?? 0,
                    sendCount: res?.sendCount ?? 0,
                })
            },
        },
        params: (() => {
            const p = { userId: user?.id, page, limit };

            // Add group ID if exists
            if (router.query?.groupId) p.groupId = router.query.groupId;

            // Add date filter based on range picker
            if (filters.from_date && filters.to_date) {
                p.from = filters.from_date;
                p.to = filters.to_date;
            }

            // Add status filter
            if (filters.status) {
                p.status = filters.status;
            }

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
                        {t("selectDateRange")}
                        <div className={styles.inp}>
                            <CiCalendar fontSize={"20px"} />
                            <DatePicker
                                range
                                value={
                                    filters.from_date && filters.to_date
                                        ? [
                                            new DateObject({ date: filters.from_date, format: "YYYY-MM-DD" }),
                                            new DateObject({ date: filters.to_date, format: "YYYY-MM-DD" })
                                        ]
                                        : null
                                }
                                onChange={(dateObjects) => {
                                    if (dateObjects && dateObjects.length === 2 && dateObjects[0] && dateObjects[1]) {
                                        const from_date = dateObjects[0].format("YYYY-MM-DD");
                                        const to_date = dateObjects[1].format("YYYY-MM-DD");
                                        setFilters(old => ({
                                            ...old,
                                            from_date,
                                            to_date
                                        }));
                                    }
                                }}
                                placeholder={t("selectDateRange")}
                                dateSeparator=" => "
                                format="YYYY-MM-DD"
                                style={{
                                    width: "250px",
                                    border: "none",
                                    fontWeight: "600",
                                    fontSize: "14px",
                                    lineHeight: "20px",
                                }}
                                calendarPosition='bottom'
                            />
                        </div>
                    </label>

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

                </div>

                <button
                    className={styles.reset}
                    onClick={() => setFilters({ from_date: "", to_date: "", status: "", type: "" })}
                >
                    {t("reset")}
                </button>

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
                        customCellRender={{}}
                    />

                </div>

            </div>

        </div>
    )
}

export default ReportByDate