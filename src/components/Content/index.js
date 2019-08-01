///node_modules
import React from 'react';

///styles
import styles from './Content.module.scss';

export default function Content({ children }) {

    return (
        <div className={styles.wrapper}>
            {children}
        </div>
    );
}