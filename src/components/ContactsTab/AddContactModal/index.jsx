import React, { useState } from 'react'
import {
    ModalHeader, ModalCloseButton, ModalBody,
    ModalFooter, Flex, Button,
    Spinner
} from '@chakra-ui/react'
import CustomModal from '../../Modals/CustomModal'
import CustomTextInput from '../../Inputs/CustomTextInput'
import PhoneNumberInput from '../../Inputs/PhoneNumberInput'
import styles from '../styles.module.scss'
import { isFormFilled } from '@/utils'
import useTranslation from 'next-translate/useTranslation'
import MultiSelect from '@/components/Inputs/MultiSelect'
import { useContactCreateMutation, useContactEdit, useContactGetById } from '@/services/contacts.service'
import useCustomToast from '@/hooks/useCustomToast'

const initialState = {
    phone: "+998",
    fullName: "",
    group: [],
    status: "Processing",
    // confirmEnteredSmsText: false,
    // readCharacterGuide: false,
}

const AddContactModal = ({
    isOpen,
    onClose = () => { },
    groups,
    user,
    objId,
}) => {
    const { errorToast, successToast } = useCustomToast()
    const { t } = useTranslation()
    const [state, setState] = useState(initialState)

    const handleCheckboxChange = (key) => {
        setState((prev) => ({ ...prev, [key]: !prev[key] }))
    }

    const { isLoading, isSuccess } = useContactGetById({
        id: objId,
        queryParams: {
            enabled: !!objId && isOpen,
            onSuccess: res => {
                setState({
                    ...res,
                    group: (res.groupIds ?? []).map(id => groups?.groups?.find(g => g.id === id)).filter(Boolean),
                })
            },
            onError: err => console.log(err),
        }
    })

    const { mutate: createMutate, isLoading: createLoading } = useContactCreateMutation({
        onSuccess: res => {
            handleClose()
            successToast()
        },
        onError: err => {
            handleClose()
            errorToast(`${err?.status}, ${err?.data?.error}`)
        },
    })

    const { mutate: editMutate, isLoading: editLoading } = useContactEdit({
        onSuccess: res => {
            handleClose()
            successToast()
        },
        onError: err => {
            handleClose()
            errorToast(`${err?.status}, ${err?.data?.error}`)
        },
    })

    const onSubmit = () => {
        const data = {
            fullName: state?.fullName,
            phone: state?.phone,
            userId: user?.id,
            groupIds: state?.group?.map(el => el.id) ?? []
        }
        if (objId) {
            editMutate({
                id: objId,
                data,
            })
        } else {
            createMutate(data)
        }
    }

    const handleClose = () => {
        onClose()
        setState(initialState)
    }

    return (
        <CustomModal
            isOpen={isOpen}
            onClose={handleClose}
            contentProps={{ maxWidth: "610px" }}
        >
            <ModalHeader marginBottom={"20px"}>
                {t("addContact")}
                <ModalCloseButton top={"16px"} right={"16px"} />
            </ModalHeader>

            <ModalBody className={styles.modalBody}>
                {isOpen &&
                    (
                        isLoading
                            ? <Flex justifyContent={"center"} alignItems={"center"}>
                                <Spinner size={"xl"} />
                            </Flex>
                            : <>
                                <CustomTextInput
                                    label={t("fullName")}
                                    placeholder={t("fullName")}
                                    onChange={(e) => setState(old => ({ ...old, fullName: e.target.value }))}
                                    value={state.fullName}
                                />

                                <PhoneNumberInput
                                    label={t("phoneNumber")}
                                    placeholder={"+998"}
                                    onChange={(e) => setState(old => ({ ...old, phone: String(e.target.value)?.replace(/\ /g, "") }))}
                                    value={state.phone}
                                />

                                <MultiSelect
                                    label={t("groups")}
                                    onChange={(e) => setState(old => ({ ...old, group: e }))}
                                    options={groups?.groups ?? []}
                                    value={state?.group}
                                    placeholder={t("selectGroup")}
                                    selectKey='name'
                                    menuPosition='top'

                                />


                                {/* <div className={styles.agreements}> */}
                                {/* <label>
                                        <input
                                            type="checkbox"
                                            checked={state.confirmEnteredSmsText}
                                            onChange={() => handleCheckboxChange("confirmEnteredSmsText")}
                                        /> {t("confirmEnteredSmsText")}
                                    </label> */}
                                {/* <label>
                                        <input
                                            type="checkbox"
                                            checked={state.readCharacterGuide}
                                            onChange={() => handleCheckboxChange("readCharacterGuide")}
                                        /> {t("readCharacterGuide")}
                                    </label> */}
                                {/* </div> */}
                            </>
                    )}
            </ModalBody>

            <ModalFooter>
                <Flex gap={"12px"} w={"100%"}>
                    <Button onClick={handleClose} variant={"outline"} w={"50%"}>
                        {t("back")}
                    </Button>
                    <Button
                        onClick={onSubmit}
                        w={"50%"}
                        isDisabled={!isFormFilled(state) || state.phone?.length !== 13}
                        isLoading={createLoading || editLoading}
                    >
                        {t("save")}
                    </Button>
                </Flex>
            </ModalFooter>
        </CustomModal>
    )
}

export default AddContactModal
