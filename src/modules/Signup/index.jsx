import styles from "./styles.module.scss"
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import LoginHeader from "@/components/LoginHeader";
import StageOne from "./StageOne";
import classNames from "classnames";
import { Box } from "@chakra-ui/react";
import StageTwo from "./StageTwo";
import StageThree from "./StageThree";

const Signup = ({
    countries,
    regions,
    cities,
}) => {
    const router = useRouter()
    const { t } = useTranslation()
    const step = router.query.step ?? 1

    return (
        <div className={styles.signup}>

            <LoginHeader wrapperCls={styles.loginHeader} />

            <Box w={"100%"} bg={"#fff"}>

                <div className={styles.stages}>

                    {
                        [1, 2, 3].map(el => (
                            <div className={styles.stage} key={el}>

                                <div className={classNames(styles.line, step == el && styles.activeStep)}></div>

                                <h2 className={styles.stageName}>{el} {t("step")}</h2>

                            </div>
                        ))
                    }

                </div>

            </Box>

            {step == 1 && <StageOne
                countries={countries}
                regions={regions}
                cities={cities}
            />}
            {step == 2 && <StageTwo />}
            {step == 3 && <StageThree />}

        </div>
    )
};
export default Signup;