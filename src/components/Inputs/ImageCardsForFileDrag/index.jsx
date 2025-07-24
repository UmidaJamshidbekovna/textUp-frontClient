import { useImageModal } from '@/Providers/ImageModalContext';
import styles from './styles.module.scss'
import { IoClose } from "react-icons/io5";
import { TbDownload } from 'react-icons/tb';

const ImageCardsForFileDrag = ({
    images,
    removeFile,
    downloadFile,
    image,
}) => {
    const openModalProps = useImageModal();

    return (
        <div className={styles.imgs}>

            {
                !!image && <div className={styles.img} onClick={() => openModalProps?.openModal({ link: image?.url || process.env.NEXT_PUBLIC_MEDIA_URL + image?.name })}>
                    <div className={styles.btns}>
                        <button
                            className={styles.download}
                            onClick={(e) => {
                                e.stopPropagation()
                                downloadFile(image)
                            }}
                        >
                            <TbDownload color='#000' fontSize={"20px"} />
                        </button>
                        <button
                            className={styles.remove}
                            onClick={(e) => {
                                e.stopPropagation()
                                removeFile(image)
                            }}
                        >
                            <IoClose color='#fff' fontSize={"20px"} />
                        </button>
                    </div>
                    <img src={image?.url || process.env.NEXT_PUBLIC_MEDIA_URL + image?.name} alt={process.env.NEXT_PUBLIC_MEDIA_URL + image?.name} />
                </div>
            }

            {images?.map((el, i) => (
                <div key={el?.id || i} className={styles.img} onClick={() => openModalProps?.openModal({ link: el?.url || process.env.NEXT_PUBLIC_MEDIA_URL + el?.name })}>
                    <div className={styles.btns}>
                        <button
                            className={styles.download}
                            onClick={(e) => {
                                e.stopPropagation()
                                downloadFile(el)
                            }}
                        >
                            <TbDownload color='#000' fontSize={"20px"} />
                        </button>
                        <button
                            className={styles.remove}
                            onClick={(e) => {
                                e.stopPropagation()
                                removeFile(el)
                            }}
                        >
                            <IoClose color='#fff' fontSize={"20px"} />
                        </button>
                    </div>
                    <img src={el?.url || process.env.NEXT_PUBLIC_MEDIA_URL + el?.name} alt={process.env.NEXT_PUBLIC_MEDIA_URL + el?.name} />
                </div>
            ))}

        </div>
    )
}

export default ImageCardsForFileDrag