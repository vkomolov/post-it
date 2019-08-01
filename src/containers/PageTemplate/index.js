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
            {/*<main className={ styles.main }>
                <div className={styles.aside}>
                    <div className={styles.aside__button}>Sort by Title</div>
                </div>
                <div className={styles.content}>
                    { children }
                </div>
            </main>*/}
            { children }
            <Footer />
        </div>
    );
};

export default PageTemplate;