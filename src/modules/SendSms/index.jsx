import styles from './styles.module.scss'
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import Header from '@/components/Header';
import TextsTab from '@/components/TextsTab';
import SendSMSTab from '@/components/SendSMSTab';
import ContactsTab from '@/components/ContactsTab';
import { useMemo } from 'react';
import GroupsTab from '@/components/GroupsTab';
import ReportByDate from '@/components/ReportByDate';

const tabs = [
    {
        id: 1,
        tab: "sendSms",
    },
    {
        id: 2,
        tab: "contacts",
    },
    {
        id: 3,
        tab: "groups",
    },
    {
        id: 4,
        tab: "texts",
    },
    {
        id: 5,
        tab: "reportByDate",
    },
]

const SendSms = ({
    tab,
    contactsTab,
    groups,
    group,
    contacts,
    user,
    templates,
    reportByDate,
}) => {
    const router = useRouter()
    const { t } = useTranslation()
    const tabState = router.query.tab || tab || "sendSms"

    const handleTabClick = (el) => {
        router.push({
            pathname: router.pathname,
            query: { tab: el.tab }
        }, undefined, { shallow: false });
    }

    const tabSections = useMemo(() => ({
        sendSms: <SendSMSTab user={user} groupsCount={groups.count ?? 0} templatesCount={templates.count ?? 0} />,
        contacts: <ContactsTab group={group} contactsTab={contactsTab} SSRContacts={contacts} groups={groups} user={user} />,
        groups: <GroupsTab SSRGroups={groups} user={user} />,
        texts: <TextsTab SSRTemplates={templates} user={user} />,
        reportByDate: <ReportByDate reportByDate={reportByDate} user={user} />,
    }), [contactsTab])

    return (
        <div className={styles.sms}>

            <Header title={group.id ? t("contactsByGroup", { name: `"${group?.name}"` ?? "" }) : t("sendSms")} user={user} />

            <div className={styles.tabList}>

                {
                    tabs.map(el => (<div onClick={() => handleTabClick(el)} className={classNames(styles.tab, tabState == el.tab && styles.activeTab)} key={el.id}>{t(el.tab)}</div>))
                }

            </div>

            {!!tabState && tabSections?.[tabState]}

        </div>
    )
}

export default SendSms