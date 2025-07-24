import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from "@chakra-ui/react"
import useTranslation from "next-translate/useTranslation";
import ucFirst from "@/utils/ucFirst";
import { useResponsive } from "@/hooks/useResponsive";

const CustomDeleteModal = ({ isOpen, onClose, isLoading, isDisabled, confirm, bodyContent, headerContent }) => {
    const md = useResponsive("md")
    const { t } = useTranslation()

    return (
        <Modal isOpen={isOpen} closeOnOverlayClick={false} isCentered>

            <ModalOverlay />

            <ModalContent>

                <ModalHeader>{headerContent}</ModalHeader>

                <ModalBody>

                    {bodyContent}

                </ModalBody>

                <ModalFooter gap={"10px"}>

                    <Button w={md ? "50%" : "auto"} variant="outline" onClick={onClose}>{ucFirst(t("cancel"))}</Button>

                    <Button w={md ? "50%" : "auto"} variant={"delete"} isLoading={isLoading} isDisabled={isDisabled} onClick={confirm}>{ucFirst(t("confirm"))}</Button>

                </ModalFooter>

            </ModalContent>

        </Modal>
    );
};

export default CustomDeleteModal;