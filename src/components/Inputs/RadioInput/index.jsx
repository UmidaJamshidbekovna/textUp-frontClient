import styles from './styles.module.scss'

const RadioInput = ({
    value = "",
    onChange = () => { },
    label = "",
    id = "",
    name = "",
}) => {
    return (
        <label className={styles.radioInput}>

            <input id={id} name={name} onChange={onChange} type="radio" value={value} />

            {label}

        </label>
    )
}

export default RadioInput