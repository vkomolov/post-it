///node_modules
import React, { Component } from 'react';

///components

///pages
import PageTemplate from '../../containers/PageTemplate';

///styles
import styles from './NotFound.module.scss';

class NotFound extends Component {

    componentDidMount() {

    }

    render() {
        const body = (
            <div className={styles.topWrapper}>
                NOT FOUND PAGE
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