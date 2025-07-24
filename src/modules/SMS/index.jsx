import styles from './styles.module.scss'
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import SMSBalance from '@/components/SMSBalance';
import Prices from '@/components/Prices';
import Header from '@/components/Header';
import SMSGateway from '@/components/SMSGateway';
import ApplicationForNick from '@/components/ApplicationForNick';
import { useMemo } from 'react';

const tabs = [
    {
        id: 1,
        tab: "balance",
    },
    {
        id: 2,
        tab: "prices",
    },
    {
        id: 4,
        tab: "applicationForNick",
    },
    {
        id: 5,
        tab: "SMSGateway",
    },
]

const SMS = ({
    tab,
    user,
    transactions,
}) => {
    const router = useRouter()
    const { t } = useTranslation()
    const tabState = router.query.tab || tab || "balance"

    const handleTabClick = (el) => {
        router.push({
            pathname: router.pathname,
            query: { ...router.query, tab: el.tab }
        }, undefined, { shallow: true });
    }

    const tabSections = useMemo(() => ({
        balance: <SMSBalance user={user} transactions={transactions} />,
        prices: <Prices />,
        smsApi: <></>,
        applicationForNick: <ApplicationForNick />,
        SMSGateway: <SMSGateway />,
    }), [])

    return (
        <div className={styles.sms}>

            <Header title={"SMS"} user={user} />

            <div className={styles.tabList}>

                {
                    tabs.map(el => (
                        <div
                            onClick={() => handleTabClick(el)}
                            className={classNames(styles.tab, tabState == el.tab && styles.activeTab)}
                            key={el.id}
                        >
                            {t(el.tab)}
                        </div>
                    ))
                }

            </div>

            {!!tabState && tabSections?.[tabState]}

        </div>
    )
}

export default SMS