import styles from "./styles.module.scss"
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import LoginHeader from "@/components/LoginHeader";
import { useRouter } from "next/router";

const ForgotPassword = () => {
    const router = useRouter()
    const step = router.query.step ?? "1"

    return (
        <div className={styles.forgotPassword}>
            <LoginHeader />
            {step === "1" && <StepOne />}
            {step === "2" && <StepTwo />}
        </div>
    )
};
export default ForgotPassword;
