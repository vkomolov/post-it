///node_modules
import React, { Component } from 'react';
import { connect } from 'react-redux';

///components
import Post from '../../components/Post';
import Aside from '../../components/Aside';
import Content from '../../components/Content';
import userService from '../../utils/userService';

///pages
import PageTemplate from '../../containers/PageTemplate';
import { mapStateToProps, mapActionsToProps } from './MainPage.redux';

///styles
import styles from './MainPage.module.scss';

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.propState = this.props.posts; //for componentDidMount
        this.history = this.props.history;
    }

    componentDidMount() {
        if(!this.propState.loaded && !this.propState.error) {
            log('getAllPosts...');
            userService.fetchAll(
                'https://bloggy-api.herokuapp.com/posts',
                this.props.gotSuccess,
                this.props.gotFailure
            );
        }
    }

    createPost() {
        this.history.push('/posts/default');
    }

    render() {
        log('rendering MainPage...');

        const state = this.props.posts; //will be re-rendered
        let innData = [];

        if (state.data && state.data.length){
            innData = [...state.data].map(el => {
                return (
                    <Post key={el.id} data={el} />
                );
            });
        }
        const body = (
            <div className={styles.contentWrapper}>
                <Aside>
                    <div className={styles.asideButton}
                         onClick={() => this.createPost()}
                    >
                        Create Post
                    </div>
                    <div className={styles.asideButton}>Sort by Title</div>
                </Aside>
                <Content>
                    <h2 className={styles.postsHeading}>POST LIST</h2>
                    <div className={styles.postList}>{ innData }</div>
                </Content>
            </div>
        );

        return (
            <PageTemplate>
                { body }
            </PageTemplate>
        );
    }
}

export default connect(mapStateToProps, mapActionsToProps)(MainPage);

/////dev
function log(it) {
    console.log(it);
}