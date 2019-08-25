///node_modules
import React, { Component } from 'react';

///components
import PageTemplate from '../../containers/PageTemplate';

///styles
import styles from './NotFound.module.scss';

class NotFound extends Component {

    handleBack() {
        this.props.history.push('/');
    }

    render() {
        const body = (
            <div className={styles.topWrapper}>
                <div className={styles.buttonBack} onClick={()=> this.handleBack()}>to Main Page</div>
                <span>NOT FOUND PAGE</span>
            </div>
        );

        return (
            <PageTemplate>
                {body}
            </PageTemplate>
        );
    }
}

export default NotFound;