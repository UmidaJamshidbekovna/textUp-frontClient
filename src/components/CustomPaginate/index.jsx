import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import styles from './styles.module.scss';
import { Menu, MenuButton, MenuItem, MenuList, Button } from '@chakra-ui/react';
import { FaFile } from "react-icons/fa";
import useTranslation from 'next-translate/useTranslation';

const CustomPagination = ({ count, resetState }) => {
    const { t, lang } = useTranslation()
    const router = useRouter();
    const { page: queryPage, limit: queryLimit } = router.query;
    const [currentPage, setCurrentPage] = useState(queryPage ? Number(queryPage) : 1);
    const [itemsPerPage, setItemsPerPage] = useState(queryLimit ? Number(queryLimit) : 10);
    const totalPages = Math.ceil(count / itemsPerPage);

    useEffect(() => {
        if (totalPages < queryPage && queryPage != 0) {
            router.push({
                pathname: router.pathname,
                query: { ...router.query, page: 1 }
            }, undefined, { shallow: true });
        }
        if (queryPage) {
            setCurrentPage(Number(queryPage));
        }
        if (queryLimit) {
            setItemsPerPage(Number(queryLimit));
        }
    }, [queryPage, queryLimit]);

    useEffect(() => {
        setCurrentPage(queryPage ? Number(queryPage) : 1);
    }, [resetState]);

    const handlePageChange = (newPage) => {
        router.push({
            pathname: router.pathname,
            query: { ...router.query, page: newPage }
        }, undefined, { shallow: true });
    };

    const handleLimitChange = (limit) => {
        router.push({
            pathname: router.pathname,
            query: { ...router.query, limit: limit, page: totalPages > queryPage ? 1 : queryPage ?? 1 }
        }, undefined, { shallow: true });
    };

    const renderPageNumbers = () => {
        const pages = [];
        const addPageButton = (pageNum) => (
            <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`${styles.button} ${currentPage === pageNum ? styles.active : ''}`}
            >
                {pageNum}
            </button>
        );

        // Всегда показываем первую страницу
        pages.push(addPageButton(1));

        // Определяем диапазон страниц для отображения
        let startPage = Math.max(2, currentPage - 1);
        let endPage = Math.min(totalPages - 1, currentPage + 1);

        // Добавляем многоточие после первой страницы, если нужно
        if (startPage > 2) {
            pages.push(<span key="ellipsis1" className={styles.ellipsis}>...</span>);
        }

        // Добавляем страницы в диапазоне
        for (let i = startPage; i <= endPage; i++) {
            pages.push(addPageButton(i));
        }

        // Добавляем многоточие перед последней страницей, если нужно
        if (endPage < totalPages - 1) {
            pages.push(<span key="ellipsis2" className={styles.ellipsis}>...</span>);
        }

        // Всегда показываем последнюю страницу, если она существует
        if (totalPages > 1) {
            pages.push(addPageButton(totalPages));
        }

        return pages;
    };


    return (
        <div className={styles.customPagination}>
            <Menu>
                <MenuButton variant={"outline"} className={styles.menuButton} _active={{ bg: "transparent" }} as={Button} rightIcon={<ChevronDownIcon fontSize={"24px"} color={"main"} />}>
                    <FaFile color='var(--primary-bg)' />{lang == "uz" ? `${itemsPerPage} ${t("view_by")}` : `${t("view_by")} ${itemsPerPage}`}
                </MenuButton>
                <MenuList minW={"none"}>
                    <MenuItem onClick={() => handleLimitChange(10)}>{t("10_per_page")}</MenuItem>
                    <MenuItem onClick={() => handleLimitChange(20)}>{t("20_per_page")}</MenuItem>
                    <MenuItem onClick={() => handleLimitChange(30)}>{t("30_per_page")}</MenuItem>
                    <MenuItem onClick={() => handleLimitChange(40)}>{t("40_per_page")}</MenuItem>
                    <MenuItem onClick={() => handleLimitChange(50)}>{t("50_per_page")}</MenuItem>
                </MenuList>
            </Menu>
            <div className={styles.pagination}>
                <button
                    onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`${styles.button} ${currentPage === 1 ? styles.disabled : ''}`}
                >
                    <ChevronLeftIcon fontSize={"24px"} />
                </button>

                {renderPageNumbers()}

                <button
                    onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages}
                    className={`${styles.button} ${currentPage >= totalPages ? styles.disabled : ''}`}
                >
                    <ChevronRightIcon fontSize={"24px"} />
                </button>
            </div>
        </div>
    );
};

export default CustomPagination;