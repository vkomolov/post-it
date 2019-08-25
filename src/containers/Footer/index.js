import React from 'react';

///styles
import styles from './Footer.module.scss';

const Footer = () => {
    return (
        <div className={styles.footerWrapper}>
            <div className={styles.blocksWrapper}>
                <div className={styles.footerBlock}>Block</div>
                <div className={styles.footerBlock}>Block</div>
                <div className={styles.footerBlock}>Block</div>
                <div className={styles.footerBlock}>Block</div>
            </div>
            <div className={styles.footerTale}>
                <span>2019 Company Name</span>
                <div className={styles.socialLinksWrappper}>
                    <i className={styles.socialLink}>Link</i>
                    <i className={styles.socialLink}>Link</i>
                    <i className={styles.socialLink}>Link</i>
                    <i className={styles.socialLink}>Link</i>
                    <i className={styles.socialLink}>Link</i>
                </div>
            </div>
        </div>
    );
};

export default Footer;