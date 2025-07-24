import React from 'react'
import styles from './styles.module.scss'
import classNames from 'classnames'
import { useColorModeValue } from '@chakra-ui/react'
import { IoIosNotificationsOutline } from 'react-icons/io'
import LangSelect from '../LangSelect'
import { CoinIcon } from '../svg'
import { numberWithSpaces } from '@/utils/formatNumbers'
import useTranslation from 'next-translate/useTranslation'

const Header = ({ children, title, titleCls, cls, user }) => {
    const primaryColor = useColorModeValue('#000', '#fff')
    const { t } = useTranslation()

    return (
        <div className={classNames(styles.pageHeader, cls)}>
            <div className={classNames(styles.title, titleCls)} style={{ color: primaryColor }}>{title}</div>

            {/* <div className={styles.children}>{children}</div> */}

            <div className={styles.info}>

                <button><IoIosNotificationsOutline fontSize={"26px"} /></button>

                <LangSelect containerCls={styles.langSelect} />

                <div className={styles.balance}>
                    <CoinIcon />{" "} {t("balance")} {numberWithSpaces(user?.balance ?? 0)} {t("uzs")}
                </div>

            </div>

        </div>
    )
}

export default Header