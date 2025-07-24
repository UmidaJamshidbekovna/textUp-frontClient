import React, { useState, useRef, useEffect } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { LuListFilter } from "react-icons/lu";

const FilterSelect = ({
    options = [],
    onChange,
    placeholder = 'Select option',
    label,
    disabled,
    selectKey = "label",
    formatOption,
    typeToggle = false,
    inpGr,
    value,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleOptionClick = (option) => {
        setIsOpen(false);
        onChange(option);
    };

    // Получение текста для отображения (динамично)
    const getDisplayText = (option) => {
        if (formatOption) {
            return formatOption(option); // Используем пользовательскую функцию
        }
        return option?.[selectKey] || ''; // Фолбэк на selectKey
    };

    return (
        <div className={classNames(styles.selectContainer, inpGr)} ref={selectRef} onBlur={() => setIsOpen(false)} tabIndex={0}>
            {label && <label className={styles.label}>{label}</label>}
            <div
                className={`${styles.selectHeader} ${isOpen ? styles.open : ''}`}
                onClick={() => !disabled && setIsOpen(!isOpen)}
            >
                <span className={styles?.placeholder}><LuListFilter />{value ? getDisplayText(value) : placeholder}</span>
                <svg
                    className={`${styles.arrow} ${isOpen ? styles.open : ''}`}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M6 9L12 15L18 9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
            <div className={`${styles.optionsContainer} ${isOpen ? styles.open : ''}`}>
                {options?.map((option) => (
                    <div
                        key={option?.id}
                        className={`${styles.option} ${value?.id === option?.id ? styles.selected : ''}`}
                        onClick={() => handleOptionClick(option)}
                    >
                        {getDisplayText(option)}
                        {typeToggle && <span>{!!option?.type && option.type}</span>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FilterSelect;
