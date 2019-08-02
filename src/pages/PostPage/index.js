///node_modules
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { matchPath } from 'react-router-dom';

///components
import Aside from '../../components/Aside';
import Content from '../../components/Content';
import PostDetail from '../../components/PostDetail';

///components
import PageTemplate from '../../containers/PageTemplate';
import { mapStateToProps, mapActionsToProps } from './PostPage.redux';
import userService from '../../utils/userService';

///styles
import styles from './PostPage.module.scss';

class PostPage extends Component {
    constructor(props) {
        super(props);
        this.propState = props.posts; //for componentDidMount
        this.history = props.history;
    }

    componentDidMount() {
        if ( !this.propState.loaded && !this.propState.error ) {
            log('getAllPosts... from componentDidMount');
            userService.fetchAll
            (
                'https://bloggy-api.herokuapp.com/posts',
                this.props.gotSuccess,
                this.props.gotFailure
            );
        }
    }

    render() {
        const stateProps = this.props.posts; //can will be re-rendered
        let pathName = this.history.location.pathname;
        let matchedPars = matchPath(pathName, {
            path: '/posts/:id',
        });
        const id = matchedPars.params.id;
        let innData = [];

        if ( id.length && stateProps.data.length ) {
            innData = [...stateProps.data].filter(el => {
                return el.id === parseInt(id);
            });
        }

        const body = (
            <div className={styles.contentWrapper}>
                <Aside>
                    <div className={styles.asideButton}>SAVE</div>
                    <div className={styles.asideButton}>UNDO</div>
                </Aside>
                <Content>
                    <h2 className={styles.postsHeading}>
                        POST DETAIL id: { id }
                    </h2>
                    { innData.length && <PostDetail data={innData[0]}/> }
                </Content>
            </div>
        );

        return <PageTemplate>{ body }</PageTemplate>
    }
}

export default connect(mapStateToProps, mapActionsToProps)(PostPage);

/////dev
function log(it) {
    console.log(it);
}