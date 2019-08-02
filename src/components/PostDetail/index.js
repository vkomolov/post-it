///node_modules
import React from 'react';

///styles
import styles from './PostDetail.module.scss';

export default function PostDetail({ data }) {
    const { title, body } = data;

    return (
        <div className={styles.postWrapper}>
            <h3 className={styles.heading}>{ title }</h3>
            <p className={styles.postBody}>{ body }</p>
        </div>
    );
}