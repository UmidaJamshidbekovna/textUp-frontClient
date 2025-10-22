import useTranslation from 'next-translate/useTranslation'
import styles from './styles.module.scss'
import { Box, Button, Flex, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import CustomTextInput from '@/components/Inputs/CustomTextInput'
import { useState, useEffect } from 'react'
import { GoEye, GoEyeClosed } from "react-icons/go"
import { useOtpSendMutation, useResetPasswordMutation } from '@/services/auth.service'
import useCustomToast from '@/hooks/useCustomToast'
import Link from 'next/link'

const RESEND_TIMEOUT = 60

const StepTwo = () => {
    const { t } = useTranslation()
    const router = useRouter()
    const { errorToast, successToast } = useCustomToast()

    const [email, setEmail] = useState('')
    const [otpCode, setOtpCode] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [timer, setTimer] = useState(RESEND_TIMEOUT)
    const [errors, setErrors] = useState({})

    useEffect(() => {
        // Get email from localStorage
        const savedEmail = localStorage.getItem('resetEmail')
        if (!savedEmail) {
            router.push('/auth/forgot-password')
            return
        }
        setEmail(savedEmail)
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
        onSuccess: (res) => {
            successToast(t('passwordResetSuccess'))
            localStorage.removeItem('resetEmail')
            router.push('/auth/login')
        },
        onError: (err) => {
            errorToast(`${err?.status}: ${err?.data?.error || t('resetPasswordFailed')}`)
        },
    })

    const handleResend = () => {
        if (email) {
            otpSendMutate({ email })
        }
    }

    const validateForm = () => {
        const newErrors = {}

        if (!otpCode) {
            newErrors.otpCode = t('otpRequired')
        }

        if (!newPassword) {
            newErrors.newPassword = t('passwordRequired')
        } else if (newPassword.length < 6) {
            newErrors.newPassword = t('passwordTooShort')
        }

        if (!confirmPassword) {
            newErrors.confirmPassword = t('confirmPasswordRequired')
        } else if (newPassword !== confirmPassword) {
            newErrors.confirmPassword = t('passwordsDoNotMatch')
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleResetPassword = () => {
        if (!validateForm()) return

        resetPasswordMutate({
            email,
            otp_code: otpCode,
            newPassword,
        })
    }

    return (
        <div className={styles.section}>
            <h2 className={styles.title}>{t("resetPassword")}</h2>
            <p className={styles.description}>
                {t("verificationCodeSentTo")} <strong>{email}</strong>
            </p>


            <div className={styles.form}>
                <CustomTextInput
                    label={t("verificationCode")}
                    placeholder="123456"
                    onChange={(e) => {
                        setOtpCode(e.target.value)
                        setErrors(prev => ({ ...prev, otpCode: '' }))
                    }}
                    value={otpCode}
                    error={errors.otpCode}
                />

                <button
                    className={styles.resendCode}
                    disabled={timer > 0 || otpSendLoading}
                    onClick={handleResend}
                >
                    {timer > 0 ? `${t("resendCodeIn", { sec: timer })}` : t("resendCode")}
                </button>



                <Box display={'flex'} flexDirection={'column'} itemsAlign={'center'}>
                    <InputGroup className={styles.passwordInp}>
                        <Text className={styles.text} mb={"6px"}>{t("newPassword")}</Text>
                        <Input
                            name='newPassword'
                            onChange={(e) => {
                                setNewPassword(e.target.value)
                                setErrors(prev => ({ ...prev, newPassword: '' }))
                            }}
                            value={newPassword}
                            minH={"44px"}
                            type={showPassword ? "text" : 'password'}
                            placeholder={t("enterNewPassword")}
                            _focusVisible={{ outline: "none" }}
                        />
                        <InputRightElement top={"auto"} bottom={"0"}>
                            <button type='button' onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <GoEye /> : <GoEyeClosed />}
                            </button>
                        </InputRightElement>
                    </InputGroup>
                    {errors.newPassword && <Text color="red.500" fontSize="12px" mt="4px">{errors.newPassword}</Text>}
                </Box>

                <Box display={'flex'} flexDirection={'column'} itemsAlign={'center'}>
                    <InputGroup className={styles.passwordInp}>
                        <Text className={styles.text} mb={"6px"}>{t("confirmPassword")}</Text>
                        <Input
                            name='confirmPassword'
                            onChange={(e) => {
                                setConfirmPassword(e.target.value)
                                setErrors(prev => ({ ...prev, confirmPassword: '' }))
                            }}
                            value={confirmPassword}
                            minH={"44px"}
                            type={showConfirm ? "text" : 'password'}
                            placeholder={t("enterConfirmPassword")}
                            _focusVisible={{ outline: "none" }}
                        />
                        <InputRightElement top={"auto"} bottom={"0"}>
                            <button type='button' onClick={() => setShowConfirm(!showConfirm)}>
                                {showConfirm ? <GoEye /> : <GoEyeClosed />}
                            </button>
                        </InputRightElement>
                    </InputGroup>
                    {errors.confirmPassword && <Text color="red.500" fontSize="12px" mt="0">{errors.confirmPassword}</Text>}
                </Box>

                <Flex gap={"8px"} mt={"24px"}>
                    <Button
                        w={"100%"}
                        variant={"outline"}
                        onClick={() => router.push('/auth/forgot-password')}
                    >
                        {t("back")}
                    </Button>
                    <Button
                        w={"100%"}
                        onClick={handleResetPassword}
                        isLoading={resetLoading}
                        isDisabled={!otpCode || !newPassword || !confirmPassword}
                    >
                        {t("resetPassword")}
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

