import styles from './styles.module.scss'
import useTranslation from 'next-translate/useTranslation';
import Header from '@/components/Header';
import ChakraTable from '@/components/ChakraTable';
import { data, keys } from './data';

const SmsSymbol = ({
    user,
}) => {
    const { t } = useTranslation()

    return (
        <div className={styles.wrapper}>

            <Header title={t("characterGuide")} user={user} />

            <div className={styles.section}>

                <div className={styles.textsWrapper}>

                    <div className={styles.texts} dangerouslySetInnerHTML={{ __html: t("smsCostInfo") }} />

                    <div className={styles.texts} dangerouslySetInnerHTML={{ __html: t("latinLetters") }} />

                    <div className={styles.texts} dangerouslySetInnerHTML={{ __html: t("cyrillicLetters") }} />

                    <div className={styles.texts} dangerouslySetInnerHTML={{ __html: t("smsPartsInfo") }} />

                </div>

                <div className={styles.smsLengthAndCharacters}>{t("smsLengthAndCharacters")}</div>

                <ChakraTable
                    wrapperCls={styles.chakraTable}
                    data={data}
                    keys={keys}
                    pagination={false}
                    orders={false}
                />

                <div className={styles.important}>

                    <div dangerouslySetInnerHTML={{ __html: t("important") + ":" }} />
                    <div dangerouslySetInnerHTML={{ __html: t("importantNote1") }} />
                    <div dangerouslySetInnerHTML={{ __html: t("importantNote2") }} />
                    <div dangerouslySetInnerHTML={{ __html: t("importantNote3") }} />
                    <div dangerouslySetInnerHTML={{ __html: t("importantNote4") }} />

                </div>

            </div>

        </div>
    )
}

export default SmsSymbol