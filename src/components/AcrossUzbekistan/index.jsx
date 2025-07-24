import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import ChakraTable from '../ChakraTable'
import { Flex } from '@chakra-ui/react'

const AcrossUzbekistan = ({
    keys,
    data,
    styles,
}) => {
    const { t } = useTranslation()
    return (
        <>
            <div className={styles.infoSection}>

                <div dangerouslySetInnerHTML={{ __html: t("smsCategoriesInfo") }} />

                <div dangerouslySetInnerHTML={{ __html: t("serviceSmsInfo") }} />

                <div dangerouslySetInnerHTML={{ __html: t("advertisingSmsInfo") }} />

            </div>

            <ChakraTable
                wrapperCls={styles.chakraTable}
                keys={keys}
                data={data}
                customCellRender={{
                    phone_code: {
                        render: (el) => (
                            <Flex flexDirection={"column"}>{el?.phone_code?.map((el, i) => (
                                <div key={el + i}>{el}</div>
                            ))}</Flex>
                        )
                    },
                    price_service_type: {
                        render: (el) => (
                            <Flex flexDirection={"column"}>{el?.price_service_type?.map((el, i) => (
                                <div key={el + i}>{el}</div>
                            ))}</Flex>
                        )
                    },
                    price_advertising_type: {
                        render: (el) => (
                            <Flex flexDirection={"column"}>{el?.price_advertising_type?.map((el, i) => (
                                <div key={el + i}>{el}</div>
                            ))}</Flex>
                        )
                    },
                }}
            // emptyTitle={t("noChangesInOrder")}
            // isLoading={isLoading}
            />
        </>
    )
}

export default AcrossUzbekistan