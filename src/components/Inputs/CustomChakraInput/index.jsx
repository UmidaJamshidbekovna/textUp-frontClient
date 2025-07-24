import {
    Input,
    InputGroup,
    InputLeftElement,
    Text
} from '@chakra-ui/react'
import classNames from 'classnames'
import React from 'react'

const CustomChakraInput = ({
    icon,
    type = "text",
    placeholder = "",
    inpGr,
    inpCls,
    label = "",
    onChange,
    value,
    register,
    inpProps,
}) => {
    return (
        <InputGroup className={classNames(inpGr)}>

            {icon && <InputLeftElement pointerEvents='none'>
                {icon}
            </InputLeftElement>}

            {label && <Text mb='6px'>{label}</Text>}

            <Input
                onChange={onChange}
                className={classNames(inpCls)}
                minH={"40px"}
                type={type}
                placeholder={placeholder}
                _focusVisible={{ outline: "none" }}
                borderRadius={"8px"}
                {...register}
                {...inpProps}
                value={value}
            />

        </InputGroup>
    )
}

export default CustomChakraInput