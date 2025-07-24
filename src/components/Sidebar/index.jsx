import React, { useState } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { links } from './data';
import { IoIosArrowDown } from "react-icons/io";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import { Avatar, Menu, MenuButton, MenuItem, MenuList, useDisclosure } from '@chakra-ui/react';
import { MdLogout } from "react-icons/md";
import Logo from '../Logo';
import { useSidebar } from '@/Providers/SidebarProvider';
import { useImageModal } from '@/Providers/ImageModalContext';
import CustomDeleteModal from '../CustomDeleteModal';
import { logout } from '@/services/authService';
import { numberAutoSpace } from '@/utils/validatePhoneNumber';

const Sidebar = ({ user }) => {
    const openModalProps = useImageModal();
    const { isOpen, onClose, onOpen } = useDisclosure()
    const { t } = useTranslation()
    const router = useRouter();
    const [activeId, setActiveId] = useState(null);
    const sidebar = useSidebar();
    const open = sidebar?.open
    const setOpen = sidebar?.setOpen

    const isItemActive = (item) => {
        if (item.link) {
            return router.pathname === item.link;
        }
        if (item.chuldItem?.length > 0) {
            return item.chuldItem.some(child => child.link && router.pathname === child.link);
        }
        return false;
    };

    const isChildActive = (childLink) => {
        return childLink && router.pathname === childLink;
    };

    const handleItemClick = (item) => {
        if (item.link) {
            router.push(item?.link);
        } else if (item.chuldItem?.length > 0) {
            setActiveId(activeId === item.id ? null : item.id);
        }
    };

    const handleLogout = async () => {
        logout()
        router.reload()
    };

    const handleOpenModal = ({ e, link }) => {
        e.preventDefault();
        e.stopPropagation();
        // openModalProps?.openModal({ link: process.env.NEXT_PUBLIC_MEDIA_URL + link });
    };

    return (
        <div className={classNames(styles.sidebar, open && styles.sidebarMd)}>

            <div className={styles.head}>

                <Logo
                    color='white'
                    size={open ? "sm" : "bg"}
                />

                <TbLayoutSidebarLeftCollapse
                    onClick={() => setOpen(!open)}
                    fontSize={26}
                    className={classNames(styles.toggle, open && styles.open)}
                />

            </div>

            <div className={styles.list}>
                {links.map((item) => (
                    <React.Fragment key={item.id}>
                        <button
                            className={classNames(
                                styles.item,
                                (activeId === item.id || isItemActive(item) && !item?.chuldItem) && styles.active
                            )}
                            onClick={() => handleItemClick(item)}
                            style={{ padding: open ? "0" : "8px 12px" }}
                        >
                            {open ? (
                                <Menu>
                                    <MenuButton className={styles.menuButton} w="100%" h="100%">
                                        {item.icon}
                                    </MenuButton>
                                    {item.chuldItem?.length > 0 && (
                                        <MenuList border="none" p="0" boxShadow={"0 0 10px #eee"} borderRadius={"8px"} overflow={"hidden"}>
                                            {item.chuldItem.map((child) => (
                                                <React.Fragment key={child.id}>
                                                    <MenuItem
                                                        onClick={() => child.link && router.push(child.link)}
                                                        className={styles.childItem}
                                                        color={"#000"}
                                                        isDisabled={!child.link}
                                                    >
                                                        {t(child.label)}
                                                    </MenuItem>
                                                </React.Fragment>
                                            ))}
                                        </MenuList>
                                    )}
                                </Menu>
                            ) : (
                                <div className={styles.section}>
                                    <div className={styles.icon}>{item.icon}</div>
                                    <div className={styles.label}>{t(item.label)}</div>
                                </div>
                            )}
                            {item.chuldItem?.length > 0 && !open && (
                                <IoIosArrowDown
                                    className={classNames(
                                        styles.arrowDownIcon,
                                        (activeId === item.id && !isItemActive(item)) && styles.rotated,
                                        isItemActive(item) && styles.rotated,
                                    )}
                                />
                            )}
                        </button>

                        {item.chuldItem?.length > 0 && (
                            <div
                                key={item.id}
                                className={classNames(
                                    styles.childItemList,
                                    (activeId === item.id || isItemActive(item)) &&
                                    !open &&
                                    styles.listVisible
                                )}
                            >
                                {item.chuldItem.map((child) => (
                                    <React.Fragment key={child.id}>
                                        <button
                                            disabled={!child.link}
                                            onClick={() => child.link && router.push(child.link)}
                                            className={classNames(
                                                styles.childItem,
                                                isChildActive(child.link) && styles.activeChild
                                            )}
                                        >
                                            {t(child.label)}
                                        </button>
                                    </React.Fragment>
                                ))}
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>

            <div className={styles.footer}>

                <div className={classNames(styles.user, open && styles.userModefied)}>
                    <div className={styles.section}>
                        <Avatar
                            className={classNames(styles.avatar, open && styles.avatarModefied)}
                            name={user?.firstName}
                            src={user?.photo && process.env.NEXT_PUBLIC_MEDIA_URL + user?.photo}
                            onClick={(e) => !!user?.photo && handleOpenModal({ e, link: user?.photo })}
                        />
                        <div className={classNames(styles.userInfo, open && styles.userInfoHidden)}>
                            {/* <h2>{numberAutoSpace(user?.phone)}</h2> */}
                            <h2 className={styles.fullName}>{user?.firstName} {user?.lastName}</h2>
                            <h3  className={styles.fullName}>{user?.email}</h3>
                        </div>
                    </div>
                    <MdLogout
                        onClick={() => {
                            onOpen()
                        }}
                        className={classNames(styles.logout, open && styles.open)}
                    />
                    <CustomDeleteModal
                        isOpen={isOpen}
                        onClose={onClose}
                        headerContent={t("areYouSureLogout")}
                        bodyContent={user?.active && t("statusChangeWarning")}
                        confirm={handleLogout}
                    // isLoading={isLoading}
                    />
                </div>
            </div>
        </div>
    );
};

export default Sidebar;