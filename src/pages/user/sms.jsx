import MainLayout from "@/Layouts/MainLayout"
import SMS from "@/modules/SMS"
import { fetchMultipleUrls } from "@/services/fetchMultipleUrls"
import { parseCookies } from 'nookies'

const SmsPage = ({
    tab,
    user,
    transactions,
}) => {

    return (
        <MainLayout user={user}>
            <SMS
                tab={tab}
                user={user}
                transactions={transactions}
            />
        </MainLayout>
    )
}

export default SmsPage

export async function getServerSideProps(context) {
    const cookies = parseCookies(context);
    const accessToken = cookies.accessToken;
    const id = cookies.id;

    const urls = [
        `users/${id}`,
        `transactions?page=1&limit=10&userId=${id}`
    ]

    const [
        user,
        transactions,
    ] = await fetchMultipleUrls(urls, accessToken, context)

    const userData = {
        phone: user?.phone || cookies?.phone || "",
        email: user?.email || cookies?.email || "",
        id: user?.id || cookies?.id || "",
        ...user
    }

    return {
        props: {
            tab: context.query.tab ?? "",
            user: userData,
            transactions: transactions ?? { count: 0, transactions: [] }
        }
    }
}
