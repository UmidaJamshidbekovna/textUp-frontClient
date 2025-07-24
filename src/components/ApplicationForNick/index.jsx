import useTranslation from 'next-translate/useTranslation'
import styles from './styles.module.scss'
import { Button, Flex, InputGroup, ModalBody, ModalCloseButton, ModalFooter, ModalHeader, Text, useDisclosure } from '@chakra-ui/react'
import CustomModal from '../Modals/CustomModal'
import CustomTextInput from '../Inputs/CustomTextInput'
import { useState } from 'react'
import SingleFileDragInput from '../Inputs/SingleFileDragInput'
import { useRouter } from 'next/router'

const items = [
    "beelineMonthlyFee",
    "ucellMonthlyFee",
    "uzmobileMonthlyFee",
    "mobiuzOneTimeFee",
    "humansOneTimeFee",
    "perfectumNotAvailable",
]

const ApplicationForNick = () => {
    const router = useRouter()
    const { t } = useTranslation()
    const { isOpen: isOpenCustomModal, onOpen: onOpenCustomModal, onClose: onCloseCustomModal } = useDisclosure({ defaultIsOpen: router?.query?.modal === "open", onClose: () => closeModal() });
    const [state, setState] = useState({})

    const closeModal = () => {
        router.push({
            pathname: router.pathname,
            query: { ...router.query, modal: "", }
        }, undefined, { shallow: true });
    };

    return (
        <div className={styles.applicationForNick}>

            <div className={styles.section}>

                <div className={styles.title}>{t("applicationForAlphaName")}</div>

                <h4 className={styles.desc}>{t("alphaNameApprovalTime")}</h4>

                <h4 className={styles.desc}>{t("alphaNameCreationCost")}</h4>

                <ol className={styles.list}>

                    {items.map((el, i) => (

                        <li key={el + i}>{el}</li>

                    ))}

                </ol>

                <h4 className={styles.desc}>{t("paymentNotice")}</h4>

                <div className={styles.example}>
                    <h4 className={styles.exampleTitle}>{t("exampleAlphaName")}</h4>
                    <h4 className={styles.exampleDesc}>{t("exampleAlphaNames")}</h4>
                    <h4 className={styles.exampleDesc}>{t("alphaNameRequirements")}</h4>
                    <h4 className={styles.exampleDesc}>{t("exampleAlphaNamesList")}</h4>
                    <h4 className={styles.exampleDesc}>{t("enterBusinessActivity")}: {t("enterBusinessActivityExample")}</h4>
                </div>

                <Button onClick={onOpenCustomModal} className={styles.applicationForNik}>{t("applicationForNik")}</Button>

                <CustomModal
                    isOpen={isOpenCustomModal}
                    onClose={onCloseCustomModal}
                    contentProps={{ maxWidth: "610px" }}
                >

                    <ModalHeader marginBottom={"20px"}>
                        {t("applicationForNick")}
                        <ModalCloseButton top={"16px"} right={"16px"} />
                    </ModalHeader>

                    <ModalBody className={styles.modalBody}>

                        <Text
                            className={styles.applicationAcceptedAfterPayment}
                        >
                            {t('applicationAcceptedAfterPayment')}
                        </Text>

                        <CustomTextInput
                            label={t("nickname") + "*"}
                            // placeholder={t("title")}
                            onChange={(e) => setState({ title: e.target.value })}
                            value={state.title}
                        />

                        <CustomTextInput
                            label={t("enterBusinessActivity") + "*"}
                            // placeholder={t("title")}
                            onChange={(e) => setState({ title: e.target.value })}
                            value={state.title}
                        />

                        <CustomTextInput
                            label={t("enterOrganizationLink") + "*"}
                            // placeholder={t("title")}
                            onChange={(e) => setState({ title: e.target.value })}
                            value={state.title}
                        />

                        <InputGroup className={styles.drawerInp}>

                            <Text>{t("uploadCertificateOrLicense")}</Text>

                            <SingleFileDragInput id={"uploadCertificateOrLicense"} />

                        </InputGroup>

                    </ModalBody>

                    <ModalFooter>

                        <Flex gap={"12px"} w={"100%"}>

                            <Button onClick={() => onCloseCustomModal()} variant={"outline"} w={"50%"}>{t("close")}</Button>

                            <Button w={"50%"}>{t("send")}</Button>

                        </Flex>

                    </ModalFooter>

                </CustomModal>

            </div>

        </div >
    )
}

export default ApplicationForNick