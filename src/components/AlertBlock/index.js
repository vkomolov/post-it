///node_modules
import React, { Component } from 'react';

import funcs from '../../utils/funcsCollection';
///styles
import styles from './AlertBlock.module.scss';

class AlertBlock extends Component {
    componentDidMount() {
        const domAlert = document.getElementById('alert-block');
        funcs.getAbsCenter( domAlert );
    }
    render() {
        const { isConfirm, data: { message, isPositive, callbacks }
        } = this.props.data;
        let cssStyles = ( isPositive )
            ? styles.alertBlock :
            `${styles.alertBlock} ${styles.negative}`;

        let confirmBlock = {};

        if ( isConfirm && Object.keys(callbacks).length ) {
            const { positive, negative } = callbacks;

            if (typeof positive !== 'function'
                || typeof negative !== 'function') {
                throw new Error('no positive or negative callbacks found... in confirmation');
            }

            cssStyles = styles.alertBlock;

            confirmBlock = (
                <div className={styles.buttonsWrapper}>
                    <div className={ styles.bttn }
                         onClick={() => positive()}
                    >
                        Confirm
                    </div>
                    <div className={ styles.bttnCancel }
                         onClick={() => negative()}
                    >
                        Cancel
                    </div>
                </div>
            );
        }
        return (
            <div className={ cssStyles } id="alert-block">
                <h3>{ message }</h3>
                { !!Object.keys(confirmBlock).length && confirmBlock }
            </div>
        );
    }
}

export default AlertBlock;

/////dev
/*function log(it) {
    console.log(it);
}*/
