import useTranslation from 'next-translate/useTranslation'
import styles from './styles.module.scss'
import { Button, Flex } from '@chakra-ui/react'
import { data, acrossUzbekistanKeys, internationalKeys, internationalData } from './initialData'
import { useState } from 'react'
import AcrossUzbekistan from '../AcrossUzbekistan'
import International from '../International'

const tabs = {
    acrossUzbekistan: <AcrossUzbekistan keys={acrossUzbekistanKeys} data={data} styles={styles} />,
    international: <International keys={internationalKeys} data={internationalData} styles={styles} />,
}

const Prices = () => {
    const [tabState, setTabState] = useState("acrossUzbekistan")
    const { t } = useTranslation()

    return (
        <div className={styles.prices}>

            <div className={styles.setcion}>

                <div className={styles.head}>

                    <h2 className={styles.pricesTitle}>{t("prices")}</h2>

                    <div className={styles.btns}>
                        <Button
                            onClick={() => setTabState("acrossUzbekistan")}
                            variant={tabState == "acrossUzbekistan" ? "solid" : "outline"}
                            padding={"10px 16px"}
                            borderRadius={"33px"}
                            border={"1px solid #D0D5DD"}
                        >
                            {t("acrossUzbekistan")}
                        </Button>
                        <Button
                            onClick={() => setTabState("international")}
                            variant={tabState == "international" ? "solid" : "outline"}
                            padding={"10px 16px"}
                            borderRadius={"33px"}
                            border={"1px solid #D0D5DD"}
                        >
                            {t("international")}
                        </Button>
                    </div>

                </div>

                {tabs?.[tabState]}

            </div>

        </div>
    )
}

export default Prices