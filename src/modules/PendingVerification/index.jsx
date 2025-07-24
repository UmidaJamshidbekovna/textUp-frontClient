import Image from 'next/image'
import styles from './styles.module.scss'
import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import { PiTelegramLogoThin } from "react-icons/pi";

const PendingVerification = ({ user }) => {
    const { t } = useTranslation()
    const reason = user?.reason ?? ""

    return (
        <div className={styles.wrapper}>

            <Image
                className={styles.img}
                width={500}
                height={500}
                src='/images/SMS-white-Logo.webp'
                alt='/images/SMS-white-Logo.webp'
            />

            {user.status === "in_verify" && <h4 className={styles.text} dangerouslySetInnerHTML={{ __html: t("moderatorCheckStatusInVerify") }} />}

            {user.status === "active" && <h4 className={styles.text} dangerouslySetInnerHTML={{ __html: t("moderatorCheckStatusActive") }} />}

            {
                user.status !== "in_verify" && user.status !== "active" && <h4 className={styles.text}>{t("yourStatus", { status: t(user?.status).toLocaleLowerCase() })}</h4>
            }

            {reason && (
                <h4 className={styles.reasonWrapper}>
                    {t("reasonForBlocking")}:
                    <p className={styles.reason} dangerouslySetInnerHTML={{ __html: reason }} />
                </h4>
            )}

            <div className={styles.links}>
                <Link className={styles.link} href={"/auth/login"}>{t("toLogin")}</Link>
                <Link className={styles.link} href={"https://t.me/textupuzbot"}><PiTelegramLogoThin fontSize={"24px"} />{t("supportInTelegram")}</Link>
            </div>

        </div>
    )
}

export default PendingVerification