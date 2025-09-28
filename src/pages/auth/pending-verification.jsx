import PendingVerification from "@/modules/PendingVerification"
import { fetchMultipleUrls } from "@/services/fetchMultipleUrls"
import { parseCookies } from "nookies"
import React from "react"


const PendingVerificationPage = ({ user }) => {

    return (
        <PendingVerification user={user} />
    )
}

export default PendingVerificationPage

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

    // Redirect logic removed - handled by middleware to prevent loops

    return {
        props: {
            user: user ?? {},
        }
    }
}