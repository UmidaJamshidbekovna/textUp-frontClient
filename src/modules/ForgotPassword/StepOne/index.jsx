import useTranslation from 'next-translate/useTranslation'
import styles from './styles.module.scss'
import { Button } from '@chakra-ui/react'
import Link from 'next/link'
import CustomChakraInput from '@/components/Inputs/CustomChakraInput'
import { useOtpSendMutation } from '@/services/auth.service'
import { useRouter } from 'next/router'
import useCustomToast from '@/hooks/useCustomToast'
import { useState } from 'react'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const StepOne = () => {
    const { t } = useTranslation()
    const router = useRouter()
    const { errorToast, successToast } = useCustomToast()
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')

    const { mutate: otpSendMutate, isLoading } = useOtpSendMutation({
        onSuccess: (res) => {
            successToast(t('otpSentToEmail'))
            localStorage.setItem('resetEmail', email)
            router.push('/auth/forgot-password?step=2')
        },
        onError: (err) => {
            errorToast(`${err?.status}: ${err?.data?.error || t('emailNotFound')}`)
        },
    })

    const handleResetPassword = () => {
        if (!email) {
            setError(t('emailRequired'))
            return
        }
        if (!emailRegex.test(email)) {
            setError(t('invalidEmail'))
            return
        }

        setError('')
        otpSendMutate({ email })
    }

    return (
        <div className={styles.section}>

            <h2 className={styles.title}>{t("forgotPassword")}</h2>

            <p className={styles.description}>
                {t("enterEmailForPasswordReset")}
            </p>

            <div>

                <CustomChakraInput
                    inpGr={styles.drawerInp}
                    label={t('email')}
                    placeholder={t('enterEmail')}
                    onChange={(e) => {
                        setEmail(e?.target?.value)
                        setError('')
                    }}
                    value={email}
                    error={error}
                />

                <Button
                    className={styles.resetPassword}
                    onClick={handleResetPassword}
                    isLoading={isLoading}
                    isDisabled={!email || !emailRegex.test(email)}
                >
                    {t("sendVerificationCode")}
                </Button>

                <div className={styles.goBack}>
                    <Link href={"/auth/login"}>{t("goBack")}</Link>
                </div>

            </div>

        </div>
    )
}

export default StepOne