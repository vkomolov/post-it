import React from 'react';

//components
import Header from '../Header';
import Footer from '../Footer';

//styles
import styles from './PageTemplate.module.scss';

const PageTemplate = ({ children }) => {
    return (
        <div className={ styles.pageWrapper }>
            <Header />
            { children }
            <Footer />
        </div>
    );
};

export default PageTemplate;