import useTranslation from 'next-translate/useTranslation';
import styles from './styles.module.scss'
import { FaChevronDown } from "react-icons/fa";
import { useState } from 'react';
import classNames from 'classnames';

const Instruction = () => {
    const { t } = useTranslation()
    const [open, setOpen] = useState(false)

    return (
        <div className={styles.instruction}>

            <button onClick={() => setOpen(!open)} className={styles.accordionButton} style={{ marginBottom: open ? "18.5px" : "0" }}>

                <div>{t("instruction")}</div>

                <FaChevronDown style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: ".3s all" }} color='var(--primary-color)' />

            </button>

            <div className={classNames(styles.accordionBody, open && styles.accordionBodyOpen)}>

                <div className={styles.moderationGuidelines}>

                    <h2 className={styles.moderationGuidelinesTitle}>{t("moderationGuidelines")}</h2>

                    <div className={styles.moderationGuidelinesDesc}>{t("moderationInfo")}</div>

                    <div className={styles.moderationGuidelinesDesc}>{t("moderationTime")}</div>

                </div>

                <div className={styles.points}>

                    <div className={styles.point}>

                        <h2 className={styles.pointTitle}>{t("point", { number: 1 })}</h2>

                        <div className={styles.pointDesc}>{t("originalTextRequirement")}</div>

                        <ul className={styles.examples}>
                            <span>{t("examples")}</span>
                            <li>- {t("incorrectAttendanceMessage")}</li>
                            <li>- {t("correctAttendanceMessage")}</li>
                            <li>- {t("incorrectBalanceMessage")}</li>
                            <li>- {t("correctBalanceMessage")}</li>
                            <li>- {t("incorrectOrderMessage")}</li>
                            <li>- {t("correctOrderMessage")}</li>
                        </ul>

                    </div>

                    <div className={styles.point}>

                        <h2 className={styles.pointTitle}>{t("point", { number: 2 })}</h2>

                        <div className={styles.pointDesc}>{t("confirmationCodeRequirement")}</div>

                        <ul className={styles.examples}>
                            <span>{t("examples")}</span>
                            <li>- {t("incorrectRegistrationCodeMessage")}</li>
                            <li>- {t("correctRegistrationCodeMessage")}</li>
                            <li>- {t("incorrectPasswordResetMessage")}</li>
                            <li>- {t("correctPasswordResetMessage")}</li>
                            <li>- {t("incorrectAppCodeMessage")}</li>
                            <li>- {t("correctAppCodeMessage")}</li>
                            <li>- {t("incorrectOrderConfirmationMessage")}</li>
                            <li>- {t("correctOrderConfirmationMessage")}</li>
                        </ul>
                    </div>

                </div>

                <div className={styles.statuses}>
                    <h2 className={styles.statusesTitle}>{t("statuses")}</h2>
                    <ol className={styles.statusesList}>
                        <li>{t("underModeration")}</li>
                        <li>{t("sentToOperator")}</li>
                        <li>{t("approvedFromModerator")}</li>
                    </ol>
                </div>

            </div>

        </div>
    )
}

export default Instruction
