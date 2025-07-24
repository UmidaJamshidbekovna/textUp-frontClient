import useTranslation from 'next-translate/useTranslation'
import styles from './styles.module.scss'
import { useEffect, useState } from 'react'
import { Box, Button, Flex } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import CustomTextInput from '@/components/Inputs/CustomTextInput'
import { useLoginStore } from '@/stores/loginStore'
import { useOtpSendMutation, useRegisterMutation } from '@/services/auth.service'
import { setCookie } from 'nookies';
import useCustomToast from '@/hooks/useCustomToast'

const RESEND_TIMEOUT = 60

const StageThree = () => {
    const { errorToast, infoToast, successToast } = useCustomToast()
    const router = useRouter()
    const [code, setCode] = useState("")
    const [timer, setTimer] = useState(RESEND_TIMEOUT)
    const { t } = useTranslation()
    const { data, resetData } = useLoginStore()

    const { mutate: otpSendMutate, isLoading: otpSendLoading } = useOtpSendMutation({
        onError: err => {
            console.log(err)
            errorToast(`${err?.status}, ${err?.data?.error}`)
        },
    })

    const { mutate: registerMutate, isLoading: registerLoading } = useRegisterMutation({
        onSuccess: res => {
            setCookie(null, 'id', res?.user?.id, { domain: process.env.NEXTAUTH_URL, path: "/", maxAge: 30 * 24 * 60 * 60, });
            resetData()
            router.push("/")
        },
        onError: err => {
            console.log(err)
            errorToast(`${err?.status}, ${err?.data?.error}`)
        },
    })

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer(prev => prev - 1)
            }, 1000)
            return () => clearInterval(interval)
        }
    }, [timer])

    const handleResend = () => {
        otpSendMutate({ email: data.email }, {
            onSuccess: () => {
                setTimer(RESEND_TIMEOUT)
            }
        })
    }

    const handleConfirm = () => {
        const totalData = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: String(data.phone).replace(/\ /g, ""),
            password: data.password,
            // cityId: data.city.id,
            // regionId: data.region.id,
            // countryId: data.country.id,
            companyName: data.companyName,
            companyAddress: data.companyAddress,
            pinfl: data.TIN_or_JSHSHIR.key === "JSHSHIR" ? Number(data.TIN_or_JSHSHIR.value) : 0,
            bankAccount: data.bankAccount,
            address: data.address,
            inn: data.TIN_or_JSHSHIR.key === "TIN" ? data.TIN_or_JSHSHIR.value : "",
            // passportNumber: data.passportNumber,
            // passportSeries: data.passportSeries,
            zipCode: data.zipCode,
            oked: data.oked,
            opt_code: code,
        }
        registerMutate(totalData)
    }

    return (
        <div className={styles.stageThree}>
            <div className={styles.container}>
                <h2 className={styles.title}>{t("activateAccount")}</h2>

                <Box pl={"10px"}>
                    <CustomTextInput
                        inpGr={styles.inpGr}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder={"123..."}
                        label={t("activationCode")}
                        value={code}
                    />

                    <button
                        className={styles.resendCode}
                        disabled={timer > 0 || otpSendLoading}
                        onClick={handleResend}
                    >
                        {timer > 0 ? `${t("resendCodeIn", { sec: timer })}` : t("resendCode")}
                    </button>

                    <div
                        className={styles.activationCodeSent}
                        dangerouslySetInnerHTML={{ __html: t("activationCodeSent", { email: data?.email }) }}
                    />
                </Box>

                <Flex justifyContent={"flex-end"} gap={"8px"}>
                    <Button onClick={() => router.push("/auth/signup/2")} variant={"outline"}>{t("back")}</Button>
                    <Button isLoading={registerLoading} isDisabled={!code} onClick={() => handleConfirm()} w={"160px"}>{t("confirmation")}</Button>
                </Flex>
            </div>
        </div>
    )
}

export default StageThree
