import useTranslation from 'next-translate/useTranslation'
import styles from './styles.module.scss'
import { Button, Flex } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import CustomTextInput from '@/components/Inputs/CustomTextInput'
import { useState, useEffect } from 'react'
import { useOtpSendMutation, useResetPasswordMutation } from '@/services/auth.service'
import useCustomToast from '@/hooks/useCustomToast'
import Link from 'next/link'

const RESEND_TIMEOUT = 60

const StepTwo = () => {
    const { t } = useTranslation()
    const router = useRouter()
    const { errorToast, successToast } = useCustomToast()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [otpCode, setOtpCode] = useState('')
    const [timer, setTimer] = useState(RESEND_TIMEOUT)
    const [error, setError] = useState('')

    useEffect(() => {
        // Get email and password from localStorage
        const savedEmail = localStorage.getItem('resetEmail')
        const savedPassword = localStorage.getItem('resetPassword')

        if (!savedEmail || !savedPassword) {
            router.push('/auth/forgot-password')
            return
        }

        setEmail(savedEmail)
        setPassword(savedPassword)
    }, [router])

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer(prev => prev - 1)
            }, 1000)
            return () => clearInterval(interval)
        }
    }, [timer])

    const { mutate: otpSendMutate, isLoading: otpSendLoading } = useOtpSendMutation({
        onSuccess: () => {
            successToast(t('otpResentSuccess'))
            setTimer(RESEND_TIMEOUT)
        },
        onError: (err) => {
            errorToast(`${err?.status}: ${err?.data?.error}`)
        },
    })

    const { mutate: resetPasswordMutate, isLoading: resetLoading } = useResetPasswordMutation({
        onSuccess: () => {
            successToast(t('passwordResetSuccess'))
            localStorage.removeItem('resetEmail')
            localStorage.removeItem('resetPassword')
            router.push('/auth/login')
        },
        onError: (err) => {
            errorToast(`${err?.status}: ${err?.data?.error || t('resetPasswordFailed')}`)
        },
    })

    const handleResend = () => {
        if (email) {
            otpSendMutate({
                email,
                purpose: "password"
            })
        }
    }

    const handleResetPassword = () => {
        if (!otpCode) {
            setError(t('otpRequired'))
            return
        }

        setError('')
        resetPasswordMutate({
            email,
            password,
            otp_code: otpCode,
        })
    }

    return (
        <div className={styles.section}>
            <h2 className={styles.title}>{t("verifyCode")}</h2>
            <p className={styles.description}>
                {t("verificationCodeSentTo")} <strong>{email}</strong>
            </p>

            <div className={styles.form}>
                <CustomTextInput
                    label={t("verificationCode")}
                    placeholder="123456"
                    onChange={(e) => {
                        setOtpCode(e.target.value)
                        setError('')
                    }}
                    value={otpCode}
                    error={error}
                />

                <button
                    className={styles.resendCode}
                    disabled={timer > 0 || otpSendLoading}
                    onClick={handleResend}
                >
                    {timer > 0 ? `${t("resendCodeIn", { sec: timer })}` : t("resendCode")}
                </button>

                <Flex gap={"8px"}>
                    <Button
                        w={"100%"}
                        variant={"outline"}
                        onClick={() => {
                            localStorage.removeItem('resetEmail')
                            localStorage.removeItem('resetPassword')
                            router.push('/auth/forgot-password')
                        }}
                    >
                        {t("back")}
                    </Button>
                    <Button
                        w={"100%"}
                        onClick={handleResetPassword}
                        isLoading={resetLoading}
                        isDisabled={!otpCode}
                    >
                        {t("confirm")}
                    </Button>
                </Flex>

                <div className={styles.goBack}>
                    <Link href={"/auth/login"}>{t("goBackToLogin")}</Link>
                </div>
            </div>
        </div>
    )
}

export default StepTwo

