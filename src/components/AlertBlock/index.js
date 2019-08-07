///node_modules
import React from 'react';

///styles
import styles from './Alert.module.scss';

function AlertBlock() {


    return (
        <div className={styles.topWrapper} >
            <div className={styles.alertBlock}>
                <h3>Message</h3>

            </div>
        </div>
    );
}

export default AlertBlock;

/////dev
/*
function log(it) {
    console.log(it);
}*/
