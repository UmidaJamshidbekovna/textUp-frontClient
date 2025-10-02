import useTranslation from 'next-translate/useTranslation'
import styles from './styles.module.scss'
import { Button, Flex, InputGroup, ModalBody, ModalCloseButton, ModalFooter, ModalHeader, Text, useDisclosure } from '@chakra-ui/react'
import CustomModal from '../Modals/CustomModal'
import CustomTextInput from '../Inputs/CustomTextInput'
import { useState } from 'react'
// import SingleFileDragInput from '../Inputs/SingleFileDragInput'
import { useRouter } from 'next/router'
import { getCookie } from 'cookies-next'
import useCustomToast from '@/hooks/useCustomToast'
import { useNickNameCreateMutation } from '@/services/nickname.service'

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
    const [state, setState] = useState({
        name: "",
        companyType: "",
        companyLink: "",
    })
    const { errorToast, successToast } = useCustomToast()

    const { mutate: createNick, isLoading: isCreating } = useNickNameCreateMutation({
        onSuccess: () => {
            successToast()
            setState({ name: "", companyType: "", companyLink: "" })
            onCloseCustomModal()
        },
        onError: (err) => {
            errorToast(`${err?.status ?? ''} ${err?.data?.error ?? ''}`)
        }
    })

    const handleSubmit = () => {
        const userId = getCookie('id') || ""
        if (!state.name || !state.companyType || !state.companyLink) {
            errorToast(t('Please fill all required fields'))
            return
        }
        const body = {
            name: state.name,
            userId,
            companyType: state.companyType,
            companyLink: state.companyLink,
        }
        createNick(body)
    }

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
                            onChange={(e) => setState(old => ({ ...old, name: e.target.value }))}
                            value={state.name}
                        />

                        <CustomTextInput
                            label={t("enterBusinessActivity") + "*"}
                            onChange={(e) => setState(old => ({ ...old, companyType: e.target.value }))}
                            value={state.companyType}
                        />

                        <CustomTextInput
                            label={t("enterOrganizationLink") + "*"}
                            onChange={(e) => setState(old => ({ ...old, companyLink: e.target.value }))}
                            value={state.companyLink}
                        />

                        {/* <InputGroup className={styles.drawerInp}>

                            <Text>{t("uploadCertificateOrLicense")}</Text>

                            <SingleFileDragInput id={"uploadCertificateOrLicense"} />

                        </InputGroup> */}

                    </ModalBody>

                    <ModalFooter>

                        <Flex gap={"12px"} w={"100%"}>

                            <Button onClick={() => onCloseCustomModal()} variant={"outline"} w={"50%"} >{t("close")}</Button>

                            <Button w={"50%"} onClick={handleSubmit} isLoading={isCreating}>{t("send")}</Button>

                        </Flex>

                    </ModalFooter>

                </CustomModal>

            </div>

        </div >
    )
}

export default ApplicationForNick