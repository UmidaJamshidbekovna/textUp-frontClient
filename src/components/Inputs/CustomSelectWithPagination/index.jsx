import React, { useState, useRef, useEffect } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { useInView } from 'react-intersection-observer';

const CustomSelectWithPagination = ({
    options = [],
    onChange = () => { },
    placeholder = 'Select option',
    label,
    disabled,
    selectKey = "label",
    idKey = "id",
    formatOption,
    typeToggle = false,
    inpGr,
    value,
    loadMore = null, // 👈 функция для подгрузки
    hasMore = false,  // 👈 есть ли ещё страницы
    isLoading = false, // 👈 флаг загрузки
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef(null);
    const { ref, inView } = useInView({ threshold: 1 });

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    useEffect(() => {
        if (inView && hasMore && !isLoading && isOpen && loadMore) {
            loadMore();
        }
    }, [inView, hasMore, isLoading, isOpen]);

    const handleOptionClick = (option) => {
        setIsOpen(false);
        onChange(option);
    };

    const getDisplayText = (option) => {
        if (formatOption) return formatOption(option);
        return option?.[selectKey] || '';
    };

    return (
        <div className={classNames(styles.selectContainer, inpGr)} ref={selectRef} onBlur={() => setIsOpen(false)} tabIndex={0}>
            {label && <label className={styles.label}>{label}</label>}
            <div className={`${styles.selectHeader} ${isOpen ? styles.open : ''}`}
                onClick={() => !disabled && setIsOpen(!isOpen)}>
                <span className={styles.placeholder}>
                    {value ? getDisplayText(value) : placeholder}
                </span>
                <svg className={`${styles.arrow} ${isOpen ? styles.open : ''}`} width="24" height="24">
                    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
            <div className={`${styles.optionsContainer} ${isOpen ? styles.open : ''}`}>
                {options.map((option) => (
                    <div
                        key={option?.[idKey]}
                        className={`${styles.option} ${value?.[idKey] === option?.[idKey] ? styles.selected : ''}`}
                        onClick={() => handleOptionClick(option)}
                    >
                        {getDisplayText(option)}
                        {typeToggle && <span>{option?.type || ''}</span>}
                    </div>
                ))}
                {hasMore && (
                    <div ref={ref} className={styles.option}>
                        {isLoading ? "Загрузка..." : "Загрузить ещё..."}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CustomSelectWithPagination;
