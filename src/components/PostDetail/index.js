///node_modules
import React from 'react';

///styles
import styles from './PostDetail.module.scss';

export default function PostDetail({ data }) {
    const { title, body } = data;

    return (
        <div className={styles.postWrapper}>
            <h3 className={styles.headingTitle}>Post Title</h3>
            <hr className={styles.hr}/>
            <textarea name="postHeader"
                      className={ styles.textAreaHeader }
                      defaultValue={ title }
            />
            <h3 className={styles.headingTitle}>Post Content</h3>
            <hr className={styles.hr}/>
            <textarea name="postBody"
                      className={ styles.textAreaBody }
                      defaultValue={ body }
            />
        </div>
    );
}

/////dev
function log(it) {
    console.log(it);
}