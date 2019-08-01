///node_modules
import React from 'react';

///styles
import styles from './Aside.module.scss';

export default function Aside({ children }) {

    return (
        <div className={styles.wrapper}>
            {children}
        </div>
    );
}