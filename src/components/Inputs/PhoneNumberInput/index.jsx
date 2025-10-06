import { Input } from '@chakra-ui/react'
import React from 'react'
import ReactInputMask from 'react-input-mask'
import styles from "./styles.module.scss"

const PhoneNumberInput = ({
    name = "",
    value,
    onChange,
    disabled,
    ...props
}) => {

    return (
        <ReactInputMask
            mask={"+\\9\\9\\8 99 999 99 99"}
            maskChar={null}
            value={value ?? ""}
            onChange={onChange}
            disabled={disabled}
            className={styles.inputMask}
        >
            {(inputProps) => (
                <Input
                    {...inputProps}
                    type="tel"
                    name={name}
                    id={name}
                    minH={"40px"}
                    _focusVisible={{ outline: "none", borderColor: "black", color: "black" }}
                    autoComplete="off"
                    placeholder={"+998"}
                    {...props}
                />
            )}
        </ReactInputMask>
    )
}

export default PhoneNumberInput