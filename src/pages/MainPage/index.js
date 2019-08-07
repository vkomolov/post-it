///node_modules
import React, { Component } from 'react';
import { connect } from 'react-redux';

///components
import Post from '../../components/Post';
import Button from '../../components/Button';
import LoadingAlert from '../../components/LoadingAlert';
import userService from '../../utils/userService';

import PageTemplate from '../../containers/PageTemplate';
import { mapStateToProps, mapActionsToProps } from './MainPage.redux';

///styles
import styles from './MainPage.module.scss';

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.propState = this.props.posts; //for componentDidMount
        this.history = this.props.history;
        this.handleClick = this.handleClick.bind(this);
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

    handleClick({ target }) {
        const dataValue = target.dataset.value;
        const funcObj = {
            createPost: () => this.history.push('/posts/default'),
            sortByTitle: () => console.log('sortByTitle'),
            sortByDate: () => console.log('sortByDate'),
        };
        if (dataValue && dataValue in funcObj) {
            funcObj[dataValue]();
        }
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
            <div className={styles.topWrapper}>
                <div className={styles.postHeadingBlock}>
                    <Button dataValue='createPost'
                            handle={ this.handleClick }
                    >
                        Create Post
                    </Button>
                    <h2 className={styles.heading}>POST LIST</h2>
                </div>
                <div className={styles.asideBar}>
                    <Button dataValue='sortByTitle'
                            handle={ this.handleClick }
                    >
                        Sort by Title
                    </Button>
                    <Button dataValue='sortByDate'
                            handle={ this.handleClick }
                    >
                        Sort by Date
                    </Button>
                </div>
                <div className={styles.contentBar}>
                    <div className={styles.fixedContainer}>
                        { ( state.loaded ) ? innData : <LoadingAlert /> }
                    </div>
                </div>
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