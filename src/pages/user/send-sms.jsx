import MainLayout from "@/Layouts/MainLayout"
import SendSms from "@/modules/SendSms"
import { fetchMultipleUrls } from "@/services/fetchMultipleUrls"
import smsService from "@/services/sms.service"
import { parseCookies } from "nookies"


const SmsPage = ({
    tab,
    contactsTab,
    group,
    user,
    groups,
    contacts,
    templates,
    reportByDate,
}) => {

    return (
        <MainLayout user={user}>
            <SendSms
                tab={tab}
                contactsTab={contactsTab}
                group={group}
                groups={groups}
                contacts={contacts}
                user={user}
                templates={templates}
                reportByDate={reportByDate}
            />
        </MainLayout>
    )
}

export default SmsPage

export async function getServerSideProps(context) {
    const cookies = parseCookies(context);
    const accessToken = cookies.accessToken;
    const id = cookies.id;
    const page = context.query.page ?? 1;
    const limit = context.query.limit ?? 10;
    const groupId = context.query?.groupId;

    const urls = [
        `users/${id}`,
        `groups?userId=${id}&page=${page}&limit=${limit}`,
        `contacts?userId=${id}&page=${page}&limit=${limit}`,
        `templates?userId=${id}&page=${page}&limit=${limit}`,
    ];

    if (groupId) {
        urls.push(`groups/${groupId}`);
    }

    const responses = await fetchMultipleUrls(urls, accessToken, context);

    const [user, groups, contacts, templates, maybeGroup] = responses;

    const userData = {
        phone: user?.phone || cookies?.phone || "",
        email: user?.email || cookies?.email || "",
        id: user?.id || cookies?.id || "",
        ...user,
    };

    const reportByDate = await smsService.smsGetList({ page: 1, limit: 10 })

    return {
        props: {
            tab: context.query.tab ?? "",
            contactsTab: context.query.contactsTab ?? "",
            group: maybeGroup ?? {},
            user: userData,
            groups: groups ?? {},
            contacts: contacts ?? {},
            templates: templates ?? {},
            reportByDate: reportByDate ?? { count: 0, smsList: [] }
        },
    };
}
