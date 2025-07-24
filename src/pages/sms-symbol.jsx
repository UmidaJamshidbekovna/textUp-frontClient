import MainLayout from "@/Layouts/MainLayout"
import SmsSymbol from "@/modules/SmsSymbol"
import { fetchMultipleUrls } from "@/services/fetchMultipleUrls"
import { parseCookies } from 'nookies'

const SmsSymbolPage = ({ user }) => {

    return (
        <MainLayout user={user}>
            <SmsSymbol user={user} />
        </MainLayout>
    )
}

export default SmsSymbolPage

export async function getServerSideProps(context) {
    const cookies = parseCookies(context);
    const accessToken = cookies.accessToken;
    const id = cookies.id;

    const urls = [
        `users/${id}`,
    ]

    const [
        user,
    ] = await fetchMultipleUrls(urls, accessToken, context)

    const userData = {
        phone: user?.phone || cookies?.phone || "",
        email: user?.email || cookies?.email || "",
        id: user?.id || cookies?.id || "",
        ...user
    }

    return {
        props: {
            user: userData,
        }
    }
}
