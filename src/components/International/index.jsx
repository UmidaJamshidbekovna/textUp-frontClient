import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import ChakraTable from '../ChakraTable'
import { Flex } from '@chakra-ui/react'
import { numberWithSpaces } from '@/utils/formatNumbers'

const International = ({
    keys,
    data,
    styles,
}) => {
    const { t } = useTranslation()
    return (
        <>
            <div style={{ color: "red", marginBottom: "20px" }}>

                <div dangerouslySetInnerHTML={{ __html: t("pricesUpdatedMonthly") }} />

                <div dangerouslySetInnerHTML={{ __html: t("serviceAvailableForSmsGateway") }} />

                <div dangerouslySetInnerHTML={{ __html: t("smsChargeForAllStatuses") }} />

            </div>

            <ChakraTable
                wrapperCls={styles.chakraTable}
                keys={keys}
                data={data}
                orders={false}
                customCellRender={{
                    price: {
                        render: (el) => numberWithSpaces(el.price) + " " + t("uzs"),
                    }
                }}
            // emptyTitle={t("noChangesInOrder")}
            // isLoading={isLoading}
            />
        </>
    )
}

export default International