import React from 'react'
import {
    Modal,
    ModalContent,
    ModalOverlay,
} from '@chakra-ui/react'

const CustomModal = ({
    isOpen,
    onClose,
    children,
    contentProps,
}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>

            <ModalOverlay />

            <ModalContent {...contentProps}>

                {children}

            </ModalContent>

        </Modal>
    )
}

export default CustomModal