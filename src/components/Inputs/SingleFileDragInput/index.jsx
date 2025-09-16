import { useCallback, useState } from 'react';
import styles from './styles.module.scss';
import useTranslation from 'next-translate/useTranslation';
import { BsCheckCircle } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { TbDownload } from "react-icons/tb";
import ImageCardsForFileDrag from '../ImageCardsForFileDrag';

const SingleFileDragInput = ({
    id,
    acceptedFileTypes = ".png, .jpg, .jpeg, .pdf",
    maxSizeInMB = 5,
    onChange = () => { },
    value = null,
    removeFile = () => { },
}) => {
    const { t } = useTranslation();
    const [dragActive, setDragActive] = useState(false);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        onChange(e.dataTransfer.files);
        setDragActive(false);
    }, []);

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        setDragActive(true);
    }, []);

    const handleDragLeave = useCallback(() => {
        setDragActive(false);
    }, []);

    const downloadFile = async (file) => {

        if (file?.file) {
            try {
                const blob = new Blob([file.file], { type: file.file.type });
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = file.file.name; // имя файла
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } catch (error) {
                console.error('Ошибка при загрузке файла:', error);
            }
        }

        if (file?.photo) {
            try {
                const response = await fetch(process.env.NEXT_PUBLIC_MEDIA_URL + file?.photo);
                if (response.ok) {
                    const blob = await response.blob();
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(blob);
                    link.download = file?.photo; // имя файла
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                } else {
                    console.error('Ошибка при загрузке файла:', response.statusText);
                }
            } catch (error) {
                console.error('Ошибка при загрузке файла:', error);
            }
        }

        if (file?.urlId) {
            try {
                const response = await fetch(process.env.NEXT_PUBLIC_MEDIA_URL + file?.urlId);
                if (response.ok) {
                    const blob = await response.blob();
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(blob);
                    link.download = file?.urlId; // имя файла
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                } else {
                    console.error('Ошибка при загрузке файла:', response.statusText);
                }
            } catch (error) {
                console.error('Ошибка при загрузке файла:', error);
            }
        }
    };

    if (!id) {
        return "not ID in <SingleFileDragInput />";
    }

    const image = String(value?.type).includes("image") && value

    const files = !String(value?.type).includes("image") && value

    return (
        <div className={styles.singleFileDragInput}>
            <label htmlFor={id} className={styles.fileUploadLabel}>
                <div
                    className={`${styles.dropArea} ${dragActive ? styles.active : ''}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <div>
                        <span>{t("dropFilesHereOrClickToUpload", { maxSizeInMB, formats: acceptedFileTypes })}</span>
                    </div>
                </div>
            </label>

            <input
                id={id}
                className={styles.fileUploadInp}
                type="file"
                multiple={false}
                accept={acceptedFileTypes}
                onChange={(e) => onChange(e.target.files)}
            />

            {image && <ImageCardsForFileDrag
                removeFile={removeFile}
                downloadFile={downloadFile}
                image={image}
            />}

            {files?.name && (
                <div className={styles.uploadsList}>
                    <div className={styles.uploadItem}>
                        <div className={styles.section}>
                            <div className={styles.fileInfo}>
                                <a className={styles.fileName} href={files?.url || process.env.NEXT_PUBLIC_MEDIA_URL + files?.name} target="_blank" rel="noopener noreferrer">
                                    {files.name}
                                </a>
                            </div>

                            <div className={styles.actions}>
                                {files.size && <span className={styles.fileSize}>
                                    {Math.round(files.size / 1024)} KB
                                </span>}
                                {files?.progress && (files?.progress === 100 ? (
                                    <BsCheckCircle />
                                ) : (
                                    <div className={styles.progressBar}>
                                        <div
                                            style={{ width: `${files?.progress || 0}%` }}
                                        />
                                    </div>
                                ))}
                                {files && <button
                                    onClick={() => downloadFile(files)}
                                    className={styles.removeButton}
                                    type='button'
                                >
                                    <TbDownload />
                                </button>}
                                {files && <button
                                    onClick={() => removeFile(files)}
                                    className={styles.removeButton}
                                    type='button'
                                >
                                    <IoMdClose />
                                </button>}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SingleFileDragInput;
