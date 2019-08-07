///node_modules
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { matchPath } from 'react-router-dom';
import { v4 } from 'uuid';

///components
import PostDetail from '../../components/PostDetail';
import Button from '../../components/Button';
import LoadingAlert from '../../components/LoadingAlert';
import PageTemplate from '../../containers/PageTemplate';

import { mapStateToProps, mapActionsToProps } from './PostPage.redux';
import userService from '../../utils/userService';
import funcs from '../../utils/funcsCollection';


///styles
import styles from './PostPage.module.scss';

class PostPage extends Component {
    constructor(props) {
        super(props);
        this.history = props.history;
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        /**Fetching all Posts from API, if the Page was reached without
         * the Main Page (by inputting the url path)
         * */
        if ( !this.props.posts.loaded && !this.props.posts.error ) {
            log('getAllPosts... from componentDidMount');
            userService.fetchAll(
                'https://bloggy-api.herokuapp.com/posts',
                this.props.gotSuccess,
                this.props.gotFailure
            );
        } else {
            console.log('passing PostPage didMount...');
        }
        //проверка акшенов
    }

    handleClick({ target }) {
        const dataSet = target.dataset.value;
        if( dataSet ) {
            const datasetObj = {
                backToList: () => {
                    this.props.getDefault();
                    this.history.push('/');
                },
                createComment: () => {
                    log('createComment');
                },
                savePost: () => {
                    log('savePost');
                },
                undo: () => {
                    this.props.getDefault();
                    log('undoUpdate');
                },
                deletePost: () => {
                    log('deletePost');
                },
            };
            if (dataSet in datasetObj) {
                datasetObj[dataSet]();
            } else {
                throw new Error('no match of dataSet.value');
            }
        } else {
            throw new Error('no dataSet.value found in the button');
        }
    }

    getId( pathName ) {
        if( matchPath ) {
            let matchedPars = matchPath(pathName, {
                path: '/posts/:id',
            });
            return matchedPars.params.id;
        } else {
            throw new Error('no matchPath module found...');
        }
    }

    getPostById( id, postArr ) {
        let innData = [];
        let post = {};

        if (id !== 'default') {
            innData = postArr.filter(el => {
                return el.id === +id;
            });
            /**returning the copy of the Post
             * */
            post = ( innData.length ) ? { ...innData[0] } : {};

        } else {
            post = userService.initDefaultPars(); //for new post
        }

        return this.preparePost( post );
    }

    /**@description adding additional properties to the fetched Post
     * */
    preparePost( post ) {
        if (Object.keys(post).length) {
            let innPost = userService.initDefaultPars( post );
            if (!innPost.createDate) {
                innPost.createDate = new Date().toDateString();
            }
            if (innPost.id === 'default') {
                innPost.id = v4();
            }

            return innPost;
        }
    }

    render() {
        log('rendering PostPage...');
        const stateProps = this.props.posts; //can will be re-rendered
        const postData = this.props.postData; //reducer

        let pathName = this.history.location.pathname;
        const id = this.getId( pathName ); //getting id from the pathName
        let innPost = {}; //will be original Post by id from the state.data

        if ( id.length && stateProps.data.length ) {
            /**taking the copy of the Post by id from the state data
             * */
            innPost = this.getPostById(id, stateProps.data);
        }

        const body = (
            <div className={styles.topWrapper}>
                <div className={styles.postHeadingBlock}>
                    <Button dataValue='backToList'
                            handle={ this.handleClick }
                    >
                        Back to list
                    </Button>
                    <h2 className={styles.heading}>
                       {/* POST DETAIL id: { showId }*/}
                        POST DETAIL
                    </h2>
                </div>
                <div className={styles.asideBar}>
                    <div className={styles.flexBoxCenter}>
                        <Button dataValue='createComment'
                                handle={ this.handleClick }
                        >
                            New Comment
                        </Button>
                        <Button dataValue='savePost'
                                handle={ this.handleClick }
                                active={ postData.isUpdate }
                        >
                            Save Post
                        </Button>
                    </div>
                    <div className={styles.flexBoxCenter}>
                        <Button dataValue='undo'
                                handle={ this.handleClick }
                                active={ postData.isUpdate }
                        >
                            Undo
                        </Button>
                        <Button dataValue='deletePost'
                                handle={ this.handleClick }
                        >
                            Delete Post
                        </Button>
                    </div>
                </div>
                <div className={styles.contentBar}>
                    <div className={styles.fixedContainer}>
                        {
                            (Object.keys( innPost ).length)
                                ? <PostDetail data={ innPost } />
                                : <LoadingAlert />
                        }
                    </div>
                </div>
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