import React from 'react'
import {
    Button,
    Flex,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react'
import { FaRegTrashAlt } from 'react-icons/fa'
import useTranslation from 'next-translate/useTranslation'

const DeleteModal = ({
    isOpen,
    onClose = () => { },
    onDelete = () => { },
    children,
}) => {
    const { t } = useTranslation()

    return (
        <Modal isOpen={isOpen} onClose={onClose}>

            <ModalOverlay />

            <ModalContent>

                <ModalHeader>

                    <Flex
                        borderRadius={"50%"}
                        border={"8px solid #FEF3F2"}
                        bg={"#FEE4E2"}
                        w={"48px"}
                        h={"48px"}
                        justifyContent={"center"}
                        alignItems={"center"}
                    >
                        <FaRegTrashAlt color='#D92D20' />
                    </Flex>

                </ModalHeader>

                <ModalCloseButton right={"16px"} top="16px" w={"44px"} h={"44px"} fontSize={"18px"} />

                <ModalBody>

                    {children}

                </ModalBody>

                <ModalFooter p={"32px 24px 24px"} display={"grid"} gridTemplateColumns={"repeat(2, 1fr)"} gap={"12px"}>
                    <Button variant={"outline"} onClick={onClose}>
                        {t("no")}
                    </Button>
                    <Button variant={"delete"} onClick={onDelete}>
                        {t("delete")}
                    </Button>
                </ModalFooter>

            </ModalContent>

        </Modal>
    )
}

export default DeleteModal