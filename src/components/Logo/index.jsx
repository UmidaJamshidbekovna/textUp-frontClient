import styles from './styles.module.scss'

const Logo = ({
    color = "",
    size = "bg"
}) => {
    return (
        <div className={size == "bg" ? styles.logo : styles.smLogo}>
            {
                color == "white"
                    ? size == "bg" ? <img src='/images/SMS-white-Logo.webp' alt='Logo' /> : <img src='/images/SMS-white-sm-Logo.webp' alt='Logo' />
                    : <img src='/images/SMS-Logo.webp' alt='Logo' />
            }
        </div>
    )
}

export default Logo