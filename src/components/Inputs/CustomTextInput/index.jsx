import {
    Input,
    InputGroup,
    InputLeftElement,
    Text
} from '@chakra-ui/react'
import classNames from 'classnames'
import React from 'react'

const CustomTextInput = ({
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
    error,
}) => {
    return (
        <InputGroup display={"flex"} flexDirection={"column"} className={classNames(inpGr)}>

            {icon && <InputLeftElement pointerEvents='none'>
                {icon}
            </InputLeftElement>}

            {label && <Text fontWeight={500} fontSize={"14px"} mb='6px'>{label}</Text>}

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

            {error && <Text fontSize="12px" color="red.500" mt="4px">{error}</Text>}

        </InputGroup>
    )
}

export default CustomTextInput