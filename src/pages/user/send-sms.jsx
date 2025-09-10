import MainLayout from "@/Layouts/MainLayout"
import SendSms from "@/modules/SendSms"
import { fetchMultipleUrls } from "@/services/fetchMultipleUrls"
import httpRequest from "@/services/httpRequest"
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

    // Fetch SMS report data using SSR-compatible httpRequest
    let reportByDate = { count: 0, smsList: [] };
    try {
        const reportResponse = await httpRequest.get('sms', {
            params: { page: 1, limit: 10 },
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        reportByDate = reportResponse || { count: 0, smsList: [] };
    } catch (error) {
        console.error('Error fetching SMS report:', error);
        // Keep default empty data on error
    }

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
