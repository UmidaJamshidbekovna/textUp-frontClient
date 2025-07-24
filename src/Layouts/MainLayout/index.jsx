import React from 'react'
import styles from './styles.module.scss'
import Sidebar from '@/components/Sidebar'

const MainLayout = ({ children, user }) => {

    return (
        <div className={styles.mainLayout}>
            <Sidebar user={user} />
            {children}
        </div>
    )
}

export default MainLayout