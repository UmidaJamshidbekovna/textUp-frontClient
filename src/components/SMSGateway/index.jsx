import useTranslation from 'next-translate/useTranslation'
import styles from './styles.module.scss'
import CustomChakraInput from '../Inputs/CustomChakraInput'
import { useState } from 'react'

const SMSGateway = () => {
    const { t } = useTranslation()
    const [state, setState] = useState({
        login: "",
        secret_key: "",
    })

    return (
        <div className={styles.SMSGateway}>

            <div className={styles.setcion}>

                <h2 className={styles.SMSGatewayTitle}>{t("connectSmsGateway")}</h2>

                <div className={styles.docs}>

                    <div className={styles.docsTitle}>{t("apiDocumentation")}</div>

                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://docs.google.com/document/d/1EoWbc9UPmZg9jUC4ys_o7cYbX72vAfs4m0-aTXh5tCc/edit?usp=sharing"
                    >
                        https://docs.google.com/document/d/1EoWbc9UPmZg9jUC4ys_o7cYbX72vAfs4m0-aTXh5tCc/edit?usp=sharing
                    </a>

                </div>

                <div className={styles.form}>

                    <CustomChakraInput
                        inpGr={styles.drawerInp}
                        label={t('emailLogin')}
                        placeholder={"user@example.com"}
                        onChange={(e) => setState(old => ({ ...old, login: e?.target?.value }))}
                        value={state?.email}
                    />

                    <CustomChakraInput
                        inpGr={styles.drawerInp}
                        label={t('secretKeyPassword')}
                        placeholder={"key..."}
                        onChange={(e) => setState(old => ({ ...old, secret_key: e?.target?.value }))}
                        value={state?.email}
                    />

                </div>

            </div>

        </div>
    )
}

export default SMSGateway