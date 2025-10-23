import useTranslation from 'next-translate/useTranslation'
import styles from './styles.module.scss'
import { Box, Button, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react'
import Link from 'next/link'
import CustomChakraInput from '@/components/Inputs/CustomChakraInput'
import { useOtpSendMutation } from '@/services/auth.service'
import { useRouter } from 'next/router'
import useCustomToast from '@/hooks/useCustomToast'
import { useState } from 'react'
import { GoEye, GoEyeClosed } from "react-icons/go"

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const StepOne = () => {
    const { t } = useTranslation()
    const router = useRouter()
    const { errorToast, successToast } = useCustomToast()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [errors, setErrors] = useState({})

    const { mutate: otpSendMutate, isLoading } = useOtpSendMutation({
        onSuccess: () => {
            successToast(t('otpSentToEmail'))
            localStorage.setItem('resetEmail', email)
            localStorage.setItem('resetPassword', password)
            router.push('/auth/forgot-password?step=2')
        },
        onError: (err) => {
            errorToast(`${err?.status}: ${err?.data?.error || t('emailNotFound')}`)
        },
    })

    const validateForm = () => {
        const newErrors = {}

        if (!email) {
            newErrors.email = t('emailRequired')
        } else if (!emailRegex.test(email)) {
            newErrors.email = t('invalidEmail')
        }

        if (!password) {
            newErrors.password = t('passwordRequired')
        } else if (password.length < 6) {
            newErrors.password = t('passwordTooShort')
        }

        if (!confirmPassword) {
            newErrors.confirmPassword = t('confirmPasswordRequired')
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = t('passwordsDoNotMatch')
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSendOtp = () => {
        if (!validateForm()) return

        otpSendMutate({
            email,
            purpose: "password"
        })
    }

    const isFormValid = email && emailRegex.test(email) && password && confirmPassword && password === confirmPassword && password.length >= 6

    return (
        <div className={styles.section}>

            <h2 className={styles.title}>{t("forgotPassword")}</h2>

            <p className={styles.description}>
                {t("enterEmailAndNewPassword")}
            </p>

            <div className={styles.form}>

                <CustomChakraInput
                    inpGr={styles.drawerInp}
                    label={t('email')}
                    placeholder={t('enterEmail')}
                    onChange={(e) => {
                        setEmail(e?.target?.value)
                        setErrors(prev => ({ ...prev, email: '' }))
                    }}
                    value={email}
                    error={errors.email}
                />

                <Box display={'flex'} flexDirection={'column'}>
                    <InputGroup className={styles.passwordInp}>
                        <Text className={styles.text} mb={"6px"}>{t("newPassword")}</Text>
                        <Input
                            name='password'
                            onChange={(e) => {
                                const newPassword = e.target.value
                                setPassword(newPassword)
                                setErrors(prev => ({ ...prev, password: '' }))

                                // Check if confirm password matches the new password
                                if (confirmPassword && newPassword !== confirmPassword) {
                                    setErrors(prev => ({ ...prev, confirmPassword: t('passwordsDoNotMatch') }))
                                } else if (confirmPassword && newPassword === confirmPassword) {
                                    setErrors(prev => ({ ...prev, confirmPassword: '' }))
                                }
                            }}
                            value={password}
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
                    {errors.password && <Text color="red.500" fontSize="12px" mt="4px">{errors.password}</Text>}
                </Box>

                <Box display={'flex'} flexDirection={'column'}>
                    <InputGroup className={styles.passwordInp}>
                        <Text className={styles.text} mb={"6px"}>{t("confirmPassword")}</Text>
                        <Input
                            name='confirmPassword'
                            onChange={(e) => {
                                const newConfirmPassword = e.target.value
                                setConfirmPassword(newConfirmPassword)

                                // Real-time validation for password matching
                                if (password && newConfirmPassword && password !== newConfirmPassword) {
                                    setErrors(prev => ({ ...prev, confirmPassword: t('passwordsDoNotMatch') }))
                                } else {
                                    setErrors(prev => ({ ...prev, confirmPassword: '' }))
                                }
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
                    {errors.confirmPassword && <Text color="red.500" fontSize="12px" mt="4px">{errors.confirmPassword}</Text>}
                </Box>

                <Button
                    className={styles.submitBtn}
                    onClick={handleSendOtp}
                    isLoading={isLoading}
                    isDisabled={!isFormValid}
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