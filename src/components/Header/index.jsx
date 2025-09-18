import React from 'react'
import styles from './styles.module.scss'
import classNames from 'classnames'
import { Button, Flex, useColorModeValue } from '@chakra-ui/react'
import { IoIosNotificationsOutline } from 'react-icons/io'
import LangSelect from '../LangSelect'
import { CoinIcon } from '../svg'
import { numberWithSpaces } from '@/utils/formatNumbers'
import useTranslation from 'next-translate/useTranslation'
import { IoArrowBack } from 'react-icons/io5'
import { useRouter } from 'next/router'

const Header = ({ children, title, titleCls, cls, user, backButton = false, backButtonUrl }) => {
    const primaryColor = useColorModeValue('#000', '#fff')
    const { t } = useTranslation()
    const router = useRouter()

    return (
        <div className={classNames(styles.pageHeader, cls)}>
            <Flex alignItems={'center'} gap={8}>
                {backButton && <Button
                    onClick={() => router.push(backButtonUrl)}
                    variant="outline"
                    leftIcon={<IoArrowBack />}
                >
                    {t("back")}
                </Button>}
                <div className={classNames(styles.title, titleCls)} style={{ color: primaryColor }}>{title}</div>
            </Flex>

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