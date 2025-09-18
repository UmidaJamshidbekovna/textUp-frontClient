import MainLayout from "@/Layouts/MainLayout"
import ContactsTab from "@/components/ContactsTab"
import Header from "@/components/Header"
import { fetchMultipleUrls } from "@/services/fetchMultipleUrls"
import httpRequest from "@/services/httpRequest"
import { Flex } from "@chakra-ui/react"
import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import { parseCookies } from "nookies"

const ContactsByGroupPage = ({
    tab,
    contactsTab,
    group,
    user,
    groups,
    contacts,
    templates,
}) => {
    const { t } = useTranslation()

    return (
        <MainLayout user={user}>
            <Flex direction={'column'} padding={'32px 32px 0'}>
                <Header title={t("contactsByGroup", { name: `"${group?.name}"` ?? "" })} user={user} backButton backButtonUrl={'/user/send-sms?tab=groups'} />
                <ContactsTab
                    tab={tab}
                    contactsTab={contactsTab}
                    group={group}
                    groups={groups}
                    SSRContacts={contacts}
                    user={user}
                />
            </Flex>
        </MainLayout >
    )
}

export default ContactsByGroupPage

export async function getServerSideProps(context) {
    const cookies = parseCookies(context);
    const accessToken = cookies?.accessToken;
    const id = cookies.id;
    const page = context.query.page ?? 1;
    const limit = context.query.limit ?? 10;
    const groupId = context.query?.groupId;

    if (!groupId) {
        return {
            redirect: {
                destination: '/user/send-sms?tab=groups',
                permanent: false,
            },
        }
    }

    let contactsUrl = `contacts?userId=${id}&page=${page}&limit=${limit}`;
    if (groupId) {
        contactsUrl += `&groupId=${groupId}`;
    }

    const urls = [
        `users/${id}`,
        `groups?userId=${id}&page=${page}&limit=${limit}`,
        contactsUrl,
    ];

    if (groupId) {
        urls.push(`groups/${groupId}`);
    }

    const responses = await fetchMultipleUrls(urls, accessToken, context);

    const [user, groups, contacts, maybeGroup] = responses;

    const userData = {
        phone: user?.phone || cookies?.phone || "",
        email: user?.email || cookies?.email || "",
        id: user?.id || cookies?.id || "",
        ...user,
    };

    return {
        props: {
            tab: context.query.tab ?? "",
            contactsTab: context.query.contactsTab ?? "",
            group: maybeGroup ?? {},
            user: userData,
            groups: groups ?? {},
            contacts: contacts ?? {},
        },
    };
}