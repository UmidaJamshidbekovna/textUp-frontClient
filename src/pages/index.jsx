import { parseCookies } from 'nookies';
import React from 'react'
import Landing from '@/components/Landing'

const HomePage = () => {
    return <Landing />
}

export default HomePage

export async function getServerSideProps(context) {
    // const cookies = parseCookies(context);
    // const accessToken = cookies?.accessToken;
    return {
        redirect: {
            destination: '/user/sms',
            permanent: false,
        },
    };

    // If user is already logged in, redirect to dashboard
    // if (accessToken) {
    //     return {
    //         redirect: {
    //             destination: '/user/sms',
    //             permanent: false,
    //         },
    //     };
    // }

    return {
        props: {},
    };
}