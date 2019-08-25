import React from 'react';

//styles
import styles from './Header.module.scss';

const Header = () => {
    return (
        <header className={styles.headerWrapper}>
            <div className={styles.headingWrapper}>
                <span className={styles.heading}>Edit Posts</span>
            </div>
            <div className={styles.headerMain}>
                <img src="" alt=""/>
                HEADER MAIN BLOCK
            </div>
        </header>
    );
};

export default Header;
