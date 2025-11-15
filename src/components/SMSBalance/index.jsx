import useTranslation from 'next-translate/useTranslation'
import styles from './styles.module.scss'
import BalanceIcon from 'public/icons/BalanceIcon'
import { Flex, Text } from '@chakra-ui/react'
import { numberWithSpaces } from '@/utils/formatNumbers'
import DatePicker from 'react-multi-date-picker'
import ChakraTable from '../ChakraTable'
import { keys } from './initialData'
import { CiCalendar } from 'react-icons/ci'
import { useState, useMemo } from 'react'
import { useTransactionsGetList } from '@/services/transactions.service'
import useCustomToast from '@/hooks/useCustomToast'
import { useRouter } from 'next/router'
import classNames from 'classnames'

const SMSBalance = ({
    user,
    transactions,
}) => {
    const { successToast, errorToast, infoToast } = useCustomToast()
    const router = useRouter()
    const page = router.query?.page ?? 1
    const limit = router.query?.limit ?? 10
    const tabState = router.query.transactionTab || "all"
    const [chakraData, setChakraData] = useState({ transactions: transactions?.transactions ?? [], count: transactions?.count ?? 0 })
    const { t } = useTranslation()

    const tabs = useMemo(() => [
        {
            id: 1,
            transactionTab: "all",
            label: "all",
        },
        {
            id: 2,
            transactionTab: "deposit",
            label: "deposits",
        },
        {
            id: 3,
            transactionTab: "withdraw",
            label: "withdrawals",
        },
    ], [])

    const handleTabClick = (el) => {
        router.push({
            pathname: router.pathname,
            query: { ...router.query, transactionTab: el.transactionTab, page: 1 }
        }, undefined, { shallow: true });
    }

    const { isLoading } = useTransactionsGetList({
        queryParams: {
            onSuccess: res => {
                setChakraData({ transactions: res?.transactions ?? [], count: res?.count ?? 0 })
            },
        },
        params: {
            userId: user?.id,
            page,
            limit,
            ...(tabState !== "all" && { type: tabState }),
        },
    })

    return (
        <div className={styles.SMSBalance}>

            <div className={styles.balance}>

                <Flex justifyContent={"space-between"}>

                    <Flex gap={"5px"}>

                        <BalanceIcon fontSize={"24px"} />

                        <Text
                            fontSize={"14px"}
                            fontWeight={500}
                        >
                            {t("balance")}
                        </Text>

                    </Flex>

                    {!!user?.companyName && <div className={styles.company}>{user?.companyName}</div>}

                </Flex>

                <Flex justifyContent={"space-between"}>

                    <div className={styles.summ}>
                        {numberWithSpaces(user?.balance ?? 0)} {t("uzs")}
                    </div>

                </Flex>

            </div>

            <div className={styles.table}>

                <Flex justify={"space-between"} alignItems={"center"} mb={"20px"}>

                    <div className={styles.paymentHistoryTitle}>
                        {t("paymentHistory")}
                    </div>

                    <div className={styles.datePickerWrapper}>
                        <CiCalendar fontSize={"20px"} />
                        <DatePicker
                            range
                            value={[]}
                            onChange={() => { }}
                            placeholder={t("selectDate")}
                            dateSeparator=" => "
                            style={{
                                border: "none",
                                fontWeight: "600",
                                fontSize: "14px",
                                lineHeight: "20px",
                            }}
                            calendarPosition='bottom'
                        />
                    </div>

                </Flex>

                <div className={styles.tabList}>
                    {
                        tabs.map(el => (
                            <div
                                onClick={() => handleTabClick(el)}
                                className={classNames(styles.transactionTab, tabState == el.transactionTab && styles.activeTab)}
                                key={el.id}
                            >
                                {t(el.label)}
                            </div>
                        ))
                    }
                </div>

                <ChakraTable
                    wrapperCls={styles.chakraTable}
                    keys={keys}
                    data={chakraData.transactions}
                    count={chakraData.count}
                    isLoading={isLoading}
                    customCellRender={{
                        type: {
                            render: res => res?.type ? t(res.type) : "-"
                        },
                    }}
                // emptyTitle={t("noChangesInOrder")}
                />

            </div>

        </div>
    )
}

export default SMSBalance