import { parseCookies } from 'nookies';
import React from 'react'

const index = () => {
    return (
        <div>index</div>
    )
}

export default index

export async function getServerSideProps(context) {
    return {
        redirect: {
            destination: '/user/sms',
            permanent: false,
        },
    };
}