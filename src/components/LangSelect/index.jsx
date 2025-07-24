import React, { useState, useRef, useEffect } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { CiGlobe } from "react-icons/ci";
import useTranslation from 'next-translate/useTranslation';
import { FaAngleDown } from "react-icons/fa6";
import { useRouter } from 'next/router';

const langs = [
    {
        id: "ru",
        value: "РУ",
    },
    {
        id: "en",
        value: "ENG",
    },
    {
        id: "uz",
        value: "O'ZB",
    },
]

const LangSelect = ({ containerCls }) => {
    const router = useRouter()
    const { t, lang } = useTranslation()
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

    const handleOptionClick = (locale) => {
        setIsOpen(false);
        router.push(router.asPath, router.asPath, { locale });
    };

    return (
        <div className={classNames(styles.selectContainer, containerCls)} ref={selectRef} onBlur={() => setIsOpen(false)} tabIndex={0}>
            <div
                className={`${styles.selectHeader} ${isOpen ? styles.open : ''}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <CiGlobe fontSize={"20px"} />
                <span className={styles.placeholder}>{langs.find(el => el.id == lang).value}</span>
                <FaAngleDown />
            </div>
            <div className={`${styles.optionsContainer} ${isOpen ? styles.open : ''}`}>
                {langs?.map((option) => (
                    <div
                        key={option?.id}
                        className={`${styles.option} ${lang === option?.id ? styles.selected : ''}`}
                        onClick={() => handleOptionClick(option.id)}
                    >
                        {option.value}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LangSelect;
