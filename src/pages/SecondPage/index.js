///node_modules
import React, { Component } from 'react';
import { connect } from 'react-redux';

///components

///pages
import PageTemplate from '../../containers/PageTemplate';
import { mapStateToProps, mapActionsToProps } from './SecondPage.redux';

///styles
import styles from './SecondPage.module.scss';

class SecondPage extends Component {

    componentDidMount() {

    }

    render() {
        const body = (
            <div className={styles.topWrapper}>
                SECOND PAGE
            </div>
        );

        return (
            <PageTemplate>
                {body}
            </PageTemplate>
        );
    }
}

export default connect(mapStateToProps, mapActionsToProps)(SecondPage);