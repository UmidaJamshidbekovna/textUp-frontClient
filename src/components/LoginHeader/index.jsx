import styles from './styles.module.scss'
import Logo from "@/components/Logo";
import LangSelect from "@/components/LangSelect";
import { IoCallOutline } from "react-icons/io5";
import useTranslation from 'next-translate/useTranslation';
import classNames from 'classnames';
import PhoneIcon from 'public/icons/phoneIcon';

const LoginHeader = ({ wrapperCls, }) => {
    const { t } = useTranslation()

    return (
        <div className={classNames(styles.headerWrapper, wrapperCls)}>

            <div className={styles.header}>

                <div className={styles.logo}>
                    <Logo />
                </div>

                <div className={styles.right}>

                    <LangSelect />

                    <div className={styles.verticalLine}>
                        <div></div>
                    </div>

                    <button className={styles.callBtn}>

                        <div className={styles.callIcon}>
                            <PhoneIcon fontSize={"20px"} fill={"none"} />
                        </div>

                        <div className={styles.callInfo}>

                            <div className={styles.number}>71 123 45 67</div>

                            <div className={styles.subscriberDepartmenText}>{t("subscriberDepartmen")}</div>

                        </div>

                    </button>

                </div>

            </div>

        </div>
    )
}

export default LoginHeader