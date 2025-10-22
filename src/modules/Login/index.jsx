import styles from "./styles.module.scss"
import useTranslation from "next-translate/useTranslation";
import LoginHeader from "@/components/LoginHeader";
import CustomChakraInput from "@/components/Inputs/CustomChakraInput";
import { useState } from "react";
import { Box, Button, Input, InputGroup, InputRightElement, Text } from "@chakra-ui/react";
import { GoEye, GoEyeClosed } from "react-icons/go";
import Link from "next/link";
import { useRouter } from "next/router";
import { useLogin } from "@/services/auth.service";
import { login } from "@/services/authService";
import useCustomToast from "@/hooks/useCustomToast";

const Login = () => {
    const { errorToast, successToast, infoToast } = useCustomToast()
    const router = useRouter()
    const { t } = useTranslation()
    const [state, setState] = useState({ email: "", password: "" })
    const [error, setError] = useState({ isError: false, message: "" })
    const [show, setShow] = useState(false)

    const handleClick = () => setShow(!show)

    const { mutate, isError, isLoading } = useLogin({
        onSuccess: res => {
            if (res?.user?.status === "active") {
                login({
                    accessToken: res?.accessToken,
                    refreshToken: res?.refreshToken,
                    email: res?.user?.email,
                    id: res?.user?.id,
                    phone: res?.user?.phone,
                    roleId: res?.user?.roleId,
                    status: res?.user?.status,
                })
                router.push("/user/sms")
            } else {
                setError({ isError: true, message: t("yourStatus", { status: t(res?.user?.status).toLocaleLowerCase() }) })
                infoToast(t("yourStatus", { status: t(res?.user?.status).toLocaleLowerCase() }))
            }
        },
        onError: err => {
            setError({ isError: true, message: "invalidLoginOrPassword" })

        },
    })

    const handleLogin = () => {
        // console.log(state)
        mutate(state)
    }

    return (
        <div className={styles.login}>

            <LoginHeader />

            <div className={styles.section}>

                <h2
                    className={styles.title}
                    onDoubleClick={() => { setState({ email: "mn@mail.com", password: "password" }) }} // dilshod@gmail.com
                >
                    {t("personalAccountLogin")}
                </h2>

                <div>

                    <CustomChakraInput
                        inpGr={styles.drawerInp}
                        label={t('email')}
                        placeholder={t('enterEmail')}
                        onChange={(e) => {
                            setState(old => ({ ...old, email: e?.target?.value }))
                            setError({ message: "", isError: false })
                        }}
                        value={state?.email}
                    />

                    <InputGroup className={styles.passwordInp} mb={error?.isError ? "0" : "24px"}>

                        <Text
                            className={styles.text}
                            mb={"6px"}
                        >
                            {t("password")}
                        </Text>

                        <Input
                            onChange={(e) => {
                                setState(old => ({ ...old, password: e.target.value }))
                                setError({ message: "", isError: false })
                            }}
                            value={state.password}
                            minH={"44px"}
                            type={show ? "text" : 'password'}
                            placeholder={t("enterPassword")}
                            _focusVisible={{ outline: "none" }}
                        />

                        <InputRightElement top={"auto"} bottom={"0"}>
                            <button type='button' onClick={handleClick}>
                                {show ? <GoEye /> : <GoEyeClosed />}
                            </button>
                        </InputRightElement>

                    </InputGroup>

                    {error?.isError && <span style={{ color: "red" }}>{t(error.message)}</span>}

                    <Box display={"flex"} justifyContent={"center"}>
                        <Link className={styles.forgotPassword} href={"/auth/forgot-password"}>{t("forgotPassword")}?</Link>
                    </Box>

                    <Button onClick={() => handleLogin()} className={styles.loginBtn} isLoading={isLoading}>{t("login")}</Button>

                    <div className={styles.signUp}>
                        <span>{t("noProfile")}</span>
                        <Link href={"/auth/signup/1"}>{t("signUp")}</Link>
                    </div>

                </div>

            </div>

        </div>
    )
};
export default Login;
