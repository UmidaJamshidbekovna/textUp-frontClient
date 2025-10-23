import useTranslation from 'next-translate/useTranslation'
import ChakraTable from '../ChakraTable'
import styles from './styles.module.scss'
import Link from 'next/link'
import DatePicker, { DateObject } from 'react-multi-date-picker'
import { CiCalendar } from 'react-icons/ci'
import CustomSelect from '../Inputs/CustomSelect'
import { keys, statuses } from './initialData'
import classNames from 'classnames'
import { Box } from '@chakra-ui/react'
import { useReportByDate } from './hooks'

const ReportByDate = ({ reportByDate, user }) => {
    const { t } = useTranslation()

    const {
        chakraData,
        filters,
        isLoading,
        searchInputRef,
        handleSearchChange,
        handleDateRangeChange,
        handleStatusChange,
        handleGroupChange,
        handleReset,
        groupOptions,
    } = useReportByDate({ reportByDate, user })



    return (
        <div className={styles.contacts}>

            <div className={styles.setcion}>

                <div className={styles.head}>

                    <h2 className={styles.title}>{t("reportByDate")}</h2>

                    <Link href={"/sms-symbol"} className={styles.link}>{t("instructionReview")}</Link>

                </div>

                <div className={styles.filters}>
                    <label className={styles.label}>
                        {t("searchByPhone")}
                        <input
                            type="text"
                            placeholder={t("phoneNumber")}
                            className={`${styles.inp} ${styles.searchInput}`}
                            ref={searchInputRef}
                            onChange={handleSearchChange}
                        />
                    </label>

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
                                onChange={handleDateRangeChange}
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
                            onChange={(e) => handleStatusChange(e?.id)}
                            value={statuses.find(el => el?.id == filters.status)}
                            t={t}
                        />
                    </Box>
                    <Box w={"200px"}>
                        <CustomSelect
                            label={t("byGroup")}
                            options={groupOptions}
                            placeholder={t("all")}
                            onChange={(e) => handleGroupChange(e?.id)}
                            value={groupOptions.find(el => el?.id == filters.group)}
                            t={t}
                        />
                    </Box>

                </div>

                <button
                    className={styles.reset}
                    onClick={handleReset}
                >
                    {t("reset")}
                </button>

                <div className={styles.statusesCounts}>
                    <div
                        className={styles.statusDiv}
                        onClick={() => handleStatusChange("")}
                    >
                        {t("all")} ({chakraData.count})
                    </div>
                    <div
                        className={classNames(styles.statusDiv, styles.delivered)}
                        onClick={() => handleStatusChange("delivered")}
                    >
                        {t("deliveredWithNumber", { number: chakraData.deliveredCount })}
                    </div>
                    <div
                        className={classNames(styles.statusDiv, styles.transferred)}
                        onClick={() => handleStatusChange("send")}
                    >
                        {t("transferredWithNumber", { number: chakraData?.sendCount })}
                    </div>
                    <div
                        className={classNames(styles.statusDiv, styles.notDelivered)}
                        onClick={() => handleStatusChange("not_delivered")}
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
                            phone: {
                                render: (el) => {
                                    return el.recipients && el.recipients.length > 0 ? el.recipients[0] : "-";
                                }
                            },
                            status: {
                                render: (el) => {
                                    return <div className={classNames(styles.statusDiv, el.status == "delivered" ? styles.delivered : el.status == "send" ? styles.transferred : styles.notDelivered)}>{t(el.status)}</div>
                                }
                            }
                        }}
                    />

                </div>

            </div>

        </div>
    )
}

export default ReportByDate