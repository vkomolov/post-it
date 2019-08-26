///node_modules
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

///components
import Post from '../../components/Post';
import Button from '../../components/Button';
import LoadingAlert from '../../components/LoadingAlert';
import PageTemplate from '../../containers/PageTemplate';
import AlertBlock from "../../components/AlertBlock";

import userService from '../../utils/userService';
import { mapStateToProps, mapActionsToProps } from './MainPage.redux';

///styles
import styles from './MainPage.module.scss';

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.statePosts = {};
        this.alertData = {};
        this.innData = []; //received array of posts from Receiver 'posts'
        this.sortBy = 'title';
        this.history = this.props.history;
        this.handleClick = this.handleClick.bind(this);
    }

    /**if in the 'posts' reducer the list of Posts is not fetched, then
     * to fetch all Posts and update the 'posts' reducer with the list;
     * */
    componentDidMount() {
        if(!this.props.posts.loaded && !Object.keys(this.props.posts.error).length) {
            const cbSuccess = [
                () => this.props.showAlert( 'API updated...',
                    true, 1500 ),
            ];

            userService.fetchAllPosts(
                ( data ) => this.props.gotSuccess( data, cbSuccess ),
                ( error ) => this.props.gotFailure( error )
            );
        }
    }

    /**@description it takes the 'data-value' attribute from the
     * clicked element; it starts the following callback;
     * @param {object} target: event.target;
     * */
    handleClick({ target }) {
        /**!!! ('sortByTitle', 'sortByDate') Click changes this.sortBy,
         * which is not in the reducer and cannot re-render this;
         * Solution: we show the alert by changing the reducer 'alertData'
         * which will re-render the Component, after this.sortBy is changed;
         * */
        const dataValue = target.dataset.value;
        const funcObj = {
            createPost: () => {
                this.history.push('/posts/default');
                this.props.showAlert('filling a new Post...', true, 1000);
            },
            sortByTitle: () => {
                this.sortBy = 'title';
                this.props.showAlert(`Sorting by ${this.sortBy}`, true, 1000);
            },
            sortByDate: () => {
                this.sortBy = 'date';
                this.props.showAlert(`Sorting by ${this.sortBy}`, true, 1000);
                /*this.props.withConfirm('Please, choose', {
                    positive: () => {
                        log('this is positive func...');
                    },
                    negative: () => {
                        log('this is negative func...');
                    }
                });*/
            },
        };
        if (dataValue && dataValue in funcObj) {
            funcObj[dataValue]();
        } else {
            throw new Error('no data-value found or incorrect');
        }
    }

    initPosts() {
        const comparePosts = ( postA, postB ) => {
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

                return bDate - aDate;
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
        log('Main Page rendering...');
        this.statePosts = this.props.posts; //will be re-rendered
        this.alertData = this.props.alertData;

        if ( this.statePosts.data && this.statePosts.data.length ) {
            this.innData = this.initPosts();
        }

        const isAlert = this.alertData.isAlert || this.alertData.isConfirm;

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
                { isAlert && <AlertBlock data={ this.alertData } /> }
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