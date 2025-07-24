import CustomTextInput from '@/components/Inputs/CustomTextInput';
import CustomModal from '@/components/Modals/CustomModal';
import { Box, Button, Flex, ModalBody, ModalCloseButton, ModalFooter, ModalHeader, Spinner } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import styles from './styles.module.scss';
import { useGroupCreateMutation, useGroupEdit, useGroupGetById } from '@/services/groups.service';
import { useState } from 'react';
import useCustomToast from '@/hooks/useCustomToast';

const initialState = {
    name: "",
    description: "",
}

const Add = ({
    isOpen,
    onClose,
    userId,
    objId,
}) => {
    const { errorToast, successToast } = useCustomToast()
    const { t } = useTranslation();
    const [state, setState] = useState(initialState)

    const { isLoading } = useGroupGetById({
        id: objId,
        queryParams: {
            enabled: !!objId,
            onSuccess: res => {
                setState({
                    name: res?.name,
                    description: res?.description,
                })
            },
            onError: err => console.log(err),
        }
    })

    const { mutate: createMutate } = useGroupCreateMutation({
        onSuccess: res => {
            handleClose()
            successToast()
        },
        onError: err => {
            handleClose()
            errorToast(`${err?.status}, ${err?.data?.error}`)
        },
    })

    const { mutate: editMutate } = useGroupEdit({
        onSuccess: res => {
            handleClose()
            successToast()
        },
        onError: err => {
            handleClose()
            errorToast(`${err?.status}, ${err?.data?.error}`)
        },
    })

    const onSave = () => {
        if (userId) {
            if (objId) {
                editMutate({
                    id: objId,
                    data: {
                        name: state?.name,
                        description: state?.description,
                    }
                })
            } else {
                createMutate({
                    name: state?.name,
                    description: state?.description,
                    userId: userId,
                })
            }
        } else {
            alert("userId is REQUIRED")
        }
    };

    const handleClose = () => {
        onClose()
        setState(initialState)
    }

    return (
        <CustomModal
            isOpen={isOpen}
            onClose={() => {
                setState({ name: "", description: "" })
                handleClose()
            }}
            contentProps={{ maxWidth: "610px" }}
        >
            <ModalHeader marginBottom="20px">
                {t("addGroup")}
                <ModalCloseButton top="16px" right="16px" />
            </ModalHeader>

            <ModalBody className={styles.modalBody}>
                {
                    isLoading
                        ? <Flex justifyContent={"center"} alignItems={"center"}>
                            <Spinner size={"xl"} />
                        </Flex>
                        : <>
                            <CustomTextInput
                                label={t("title")}
                                onChange={(e) => setState((prev) => ({ ...prev, name: e.target.value }))}
                                value={state.name || ""}
                            />
                            <CustomTextInput
                                label={t("description")}
                                onChange={(e) => setState((prev) => ({ ...prev, description: e.target.value }))}
                                value={state.description || ""}
                            />
                        </>
                }
            </ModalBody>

            <ModalFooter>
                <Flex gap="12px" w="100%">
                    <Button onClick={() => {
                        handleClose()
                    }} variant="outline" w="50%">
                        {t("back")}
                    </Button>
                    <Button onClick={onSave} isDisabled={!state?.name} w="50%">
                        {t("save")}
                    </Button>
                </Flex>
            </ModalFooter>
        </CustomModal>
    );
};

export default Add;
