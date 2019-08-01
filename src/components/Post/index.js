///node_modules
import React from 'react';

///styles
import styles from './Post.module.scss';

export default function Post({ data }) {
    const { title } = data;
    const maxLength = 200;
    const body = (data.body.length > maxLength)
        ? data.body.slice(maxLength) + '...'
        : data.body;

    return (
        <div className={styles.postWrapper}>
            <h3 className={styles.heading}>{ title }</h3>
            <p className={styles.postBody}>{ body }</p>
        </div>
    );
}