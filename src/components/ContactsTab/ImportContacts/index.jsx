import { useContactsImport } from '@/services/contacts.service';
import { Button, Text } from '@chakra-ui/react'
import { FiUpload } from 'react-icons/fi'
import styles from "../styles.module.scss"
import useTranslation from 'next-translate/useTranslation';
import useCustomToast from '@/hooks/useCustomToast';
import { useRouter } from 'next/router';

export const ImportContacts = ({
    refetch,
    user,
}) => {
    const router = useRouter();
    const { errorToast, successToast } = useCustomToast()
    const { t } = useTranslation()
    const { mutate: importContacts, isLoading, isSuccess, isError } = useContactsImport({
        onSuccess: res => {
            refetch()
            successToast(t("importSuccess"))
        },
        onError: err => {
            errorToast(t("importError"))
        }
    });

    // Обработчик для выбора файла
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && user?.id) {
            const formData = new FormData();
            formData.append('userId', user.id);
            if (router.query?.groupId) {
                formData.append('groupId', router.query.groupId);
            }
            formData.append('file', file, file.name);

            importContacts(formData);
        }
    };

    return (
        <div>
            <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileChange}
                style={{ display: 'none' }} // скрываем input
                id="fileInput"
            />

            <Button
                className={styles.addContact}
                variant="outline"
                onClick={() => document.getElementById('fileInput').click()} // инициируем клик по скрытому input
                isLoading={isLoading} // показываем загрузку на кнопке
                loadingText="Загрузка..."
            >
                <FiUpload fontSize="16px" />
                {t("uploadContacts")}
            </Button>

        </div>
    );
};
