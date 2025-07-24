import useTranslation from 'next-translate/useTranslation'
import styles from './styles.module.scss'
import { Button } from '@chakra-ui/react'
import Link from 'next/link'
import CustomChakraInput from '@/components/Inputs/CustomChakraInput'

const StepOne = ({ setState = () => { }, state }) => {
    const { t } = useTranslation()

    return (
        <div className={styles.section}>

            <h2 className={styles.title}>{t("forgotPassword")}</h2>

            <div>

                <CustomChakraInput
                    inpGr={styles.drawerInp}
                    label={t('email')}
                    placeholder={t('enterEmail')}
                    onChange={(e) => setState(old => ({ ...old, email: e?.target?.value }))}
                    value={state?.email}
                />

                <Button className={styles.resetPassword}>{t("resetPassword")}</Button>

                <div className={styles.goBack}>
                    <Link href={"/auth/login"}>{t("goBack")}</Link>
                </div>

            </div>

        </div>
    )
}

export default StepOne