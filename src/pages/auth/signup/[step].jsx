import React from 'react'
import Signup from '@/modules/Signup'
import { fetchMultipleUrls } from '@/services/fetchMultipleUrls'
import { parseCookies } from 'nookies'

const SignupPage = ({
    countries,
    regions,
    cities,
}) => {

    return (
        <div className="body">
            <Signup
                countries={countries}
                regions={regions}
                cities={cities}
            />
        </div>
    )
}

export default SignupPage

export async function getServerSideProps(context) {
    const cookies = parseCookies(context);
    const accessToken = cookies.accessToken;

    const urls = [
        `countries`,
        `regions`,
        `cities`,
    ]

    const [
        countries,
        regions,
        cities,
    ] = await fetchMultipleUrls(urls, accessToken, context)

    return {
        props: {
            countries: countries ?? {},
            regions: regions ?? {},
            cities: cities ?? {},
        }
    }
}