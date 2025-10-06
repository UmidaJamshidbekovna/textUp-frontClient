import React, { useState, useRef, useEffect } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';

const MultiSelect = ({
    options = [],
    onChange = () => { },
    placeholder = 'Select option(s)',
    label,
    disabled,
    selectKey = 'label',
    formatOption,
    inpGr,
    value = [],
    menuPosition = 'bottom', // New prop: 'top' or 'bottom'
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            // Close on click outside
            const handleClickOutside = (event) => {
                if (selectRef.current && !selectRef.current.contains(event.target)) {
                    setIsOpen(false);
                }
            };

            // Close on escape key
            const handleKeyDown = (event) => {
                if (event.key === 'Escape') {
                    setIsOpen(false);
                }
            };

            // Close on scroll
            const handleScroll = () => {
                setIsOpen(false);
            };

            // Use capture phase for better event handling
            document.addEventListener('mousedown', handleClickOutside, true);
            document.addEventListener('keydown', handleKeyDown);
            document.addEventListener('scroll', handleScroll, true);

            return () => {
                document.removeEventListener('mousedown', handleClickOutside, true);
                document.removeEventListener('keydown', handleKeyDown);
                document.removeEventListener('scroll', handleScroll, true);
            };
        }
    }, [isOpen]);

    const getDisplayText = (option) => {
        if (formatOption) return formatOption(option);
        return option?.[selectKey] || '';
    };

    const toggleOption = (option) => {
        const exists = value.find((sel) => sel.id === option.id);
        const newSelected = exists
            ? value.filter((sel) => sel.id !== option.id)
            : [...value, option];

        onChange(newSelected);
    };

    const removeOption = (option) => {
        const newSelected = value.filter((sel) => sel.id !== option.id);
        onChange(newSelected);
    };

    const isSelected = (option) => value.some((sel) => sel.id === option.id);

    return (
        <div
            className={classNames(styles.selectContainer, inpGr)}
            ref={selectRef}
            tabIndex={0}
        >
            {label && <label className={styles.label}>{label}</label>}
            <div
                className={classNames(styles.selectHeader, { [styles.open]: isOpen })}
                onClick={() => !disabled && setIsOpen(!isOpen)}
            >
                <div className={styles.selectedItems}>
                    {value.length > 0 ? (
                        value.map((item) => (
                            <div key={item.id} className={styles.selectedTag}>
                                {getDisplayText(item)}
                                <span
                                    className={styles.removeTag}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeOption(item);
                                    }}
                                >
                                    ×
                                </span>
                            </div>
                        ))
                    ) : (
                        <span className={styles.placeholder}>{placeholder}</span>
                    )}
                </div>
                <svg
                    className={classNames(styles.arrow, { [styles.open]: isOpen })}
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
            <div className={classNames(
                styles.optionsContainer,
                {
                    [styles.open]: isOpen,
                    [styles.top]: menuPosition === 'top',
                    [styles.bottom]: menuPosition === 'bottom'
                }
            )}>
                {options.map((option) => (
                    <div
                        key={option.id}
                        className={classNames(styles.option, {
                            [styles.selected]: isSelected(option),
                        })}
                        onClick={() => toggleOption(option)}
                    >
                        {getDisplayText(option)}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MultiSelect;
