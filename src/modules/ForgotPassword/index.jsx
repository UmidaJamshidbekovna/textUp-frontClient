import styles from "./styles.module.scss"
import useTranslation from "next-translate/useTranslation";
import { useState } from "react";
import StepOne from "./StepOne";
import LoginHeader from "@/components/LoginHeader";

const ForgotPassword = () => {
    const { t } = useTranslation()
    const [state, setState] = useState({})

    return (
        <div className={styles.forgotPassword}>

            <LoginHeader />

            <StepOne />

        </div>
    )
};
export default ForgotPassword;
