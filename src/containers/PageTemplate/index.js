import React from 'react';

//containers
import Header from '../Header';
import Footer from '../Footer';

//css
import styles from './PageTemplate.module.scss';

const PageTemplate = ({ children }) => {
    return (
        <div className={styles.pageWrapper}>
            <Header />
            {children}
            <Footer />
        </div>
    );
};

export default PageTemplate;