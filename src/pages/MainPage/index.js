///node_modules
import React, { Component } from 'react';
import { connect } from 'react-redux';

///components
import Post from '../../components/Post';
import Button from '../../components/Button';
import LoadingAlert from '../../components/LoadingAlert';
import userService from '../../utils/userService';
import { urlSource } from '../../utils/userService/initialData';

import PageTemplate from '../../containers/PageTemplate';
import { mapStateToProps, mapActionsToProps } from './MainPage.redux';

///styles
import styles from './MainPage.module.scss';

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.statePosts = {};
        this.innData = []; //received array of posts from Receiver 'posts'
        this.sortBy = 'title';
        this.history = this.props.history;
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        if(!this.props.posts.loaded && !this.props.posts.error) {
            log('getAllPosts... from MainPage DidMount');
            userService.fetchAllPosts(
                this.props.gotSuccess,
                this.props.gotFailure
            );
        }
    }

    handleClick({ target }) {
        const dataValue = target.dataset.value;
        const funcObj = {
            createPost: () => this.history.push('/posts/default'),
            sortByTitle: () => this.sortBy = 'title',
            sortByDate: () => this.sortBy = 'date',
        };
        if (dataValue && dataValue in funcObj) {
            funcObj[dataValue]();
        } else {
            throw new Error('no data-value found or incorrect');
        }
    }

    initPosts() {
        const comparePosts = (postA, postB) => {
            if (this.sortBy === 'title') {
                if (postA.title > postB.title) {
                    return 1
                }
                if (postA.title < postB.title) {
                    return -1;
                }
                return 0;
            }
            if (this.sortBy === 'date') {
                const aDate = ( postA.date ) ? Date.parse(postA.date) : new Date();
                const bDate = (postB.date) ? Date.parse(postB.date) : new Date();

                return aDate - bDate;
            }
        };
        const sortedArr = [...this.statePosts.data].sort( comparePosts );

        return sortedArr.map(el => {
            return (
                <Post key={ el.id } data={ el } />
            );
        });
    }

    render() {
        log('rendering MainPage...');
        this.statePosts = this.props.posts; //will be re-rendered

        if ( this.statePosts.data && this.statePosts.data.length ) {
            this.innData = this.initPosts();
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
                        { ( this.innData.length )
                            ? this.innData
                            : <LoadingAlert />
                        }
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

export default connect( mapStateToProps, mapActionsToProps )( MainPage );

/////dev
function log(it) {
    console.log(it);
}