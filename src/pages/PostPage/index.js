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

import userService from '../../utils/userService';
import { defaultComment, urlSource } from '../../utils/userService/initialData';
import { mapStateToProps, mapActionsToProps } from './PostPage.redux';
import funcs from '../../utils/funcsCollection';


///styles
import styles from './PostPage.module.scss';

class PostPage extends Component {
    constructor(props) {
        super(props);
        this.history = props.history;
        this.statePosts = {};
        this.postData = {};
        this.innPost = {};
        this.urlId = '';
        this.postId = '';
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        /**Fetching all Posts from API, if the Page was reached by url without
         * the Main Page
         * */
        if ( !this.props.posts.loaded && !this.props.posts.error ) {
            log('getAllPosts... from PostPage DidMount');
            userService.fetchAllPosts(
                urlSource,
                this.props.gotSuccess,
                this.props.gotFailure
            );
        } else {
            console.log('passing PostPage didMount...');
        }
    }

    handleClick({ target }) {
        const dataSet = target.dataset.value;
        if( dataSet ) {
            const datasetObj = {
                backToList: () => {
                    this.history.push('/');
                    this.props.getDefault();
                },
                createComment: () => {
                    log('creating Comment...');
                    const comment = PostPage.preparePost(
                        userService.addDefaultPars({}, defaultComment),
                        true
                    );

                    let updated = {};
                    if (this.postData.isUpdate) {
                        updated = {
                            ...this.postData.data,
                            comments: [
                                ...this.postData.data.comments,
                                comment
                            ]
                        };
                    } else {
                        updated = {
                            ...this.innPost,
                            comments: [
                                ...this.innPost.comments,
                                comment
                            ]
                        }
                    }

                    this.props.putData( updated );
                },
                savePost: () => {
                    if ( this.postData.isUpdate ) {
                        const prevCommentsArr = this.innPost.comments;
                        const postCommentsArr = this.postData.data.comments;

                        userService.updatePost(
                            urlSource,
                            this.postData.data,

                        ).then(({ data }) => {
                            this.postId = String(data.id);
                            log('this.postId = ' + this.postId);

                            return userService.updateComments(
                                urlSource,
                                this.postId,
                                postCommentsArr,
                                prevCommentsArr
                            );
                        }).then(( resArr ) => {
                            log('resultArr...');
                            log( resArr );

                            //log('clean posts by getAllPosts ....after save');
                            //this.props.getAllPosts();

                            log(`this.postId = ${this.postId}; url.id = ${this.urlId}`);
                            let path = '/posts/' + this.postId;
                            log('path');
                            log(path);

                            log('getAllPosts... and history.push');
                            userService.fetchAllPosts(
                                urlSource,
                                ( data ) => this.props.gotSuccessAndReload( data, path, this.history),
                                this.props.gotFailure
                            );

                            //log('replacing history to :' + path);

                            log('getDefault ....after save');
                            this.props.getDefault();

                            //this.postId = '';
                            //this.history.replace( path );

                        } );
                    }
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

    initPost() {
        log('initPost runs...');
        let pathName = this.history.location.pathname;
        this.urlId = PostPage.getId(pathName);
        let innPost = {};

        if ( this.urlId.length && this.statePosts.data.length ) {
            if ( this.urlId !== 'default' ) {
                let foundById = PostPage.getPostById(this.urlId, this.statePosts.data);
                if (Object.keys(foundById).length) {
                    /**adding additional properties to the Post
                     * */
                    innPost = PostPage.preparePost(userService.addDefaultPars( foundById ));
                    log('found By Id ...');
                    log(foundById);
                } else {
                    //TO DO ALERT no id found in posts state
                    console.error('given id is not found...');
                    this.history.push('/');
                    this.props.getDefault();
                }
                /**@description deepClone gives the copies of comments, before they
                 * are changed: will be used for defaults with 'undo' and searching
                 * the differences in comments for PUT or POST options
                 */
                //return funcs.deepClone(innPost);
            } else {
                log('id is default');

                log('the postId: ');
                log(!!this.postId.length);

                /**if we have already received the id of the new created Post,
                 *saved in this.postId, but the url id is still 'default', then
                 * to relocate the history to this.postId;
                 * */
                /*if ( this.postId.length ) {
                    log(`${this.postId} = id from url: ${id}`);
                    let path = '/posts/' + this.postId;
                    log('path');
                    log(path);
                    log('replacing history to :' + path);
                    this.postId = '';
                    this.history.push( path );
                    //this.props.getDefault();
                } else {
                    console.error('no postId.length');
                }*/
                /**adding default properties to the Post
                 * */
                innPost = PostPage.preparePost(userService.addDefaultPars());
            }
        } else {
            //TO DO ALERT
            //this.history.push('/');
            console.error('waiting for the statePosts data ...');
        }

        return Object.keys(innPost).length
            ? funcs.deepClone(innPost)
            : innPost;
    }

    render() {
        if ( this.props.posts.data.length ) {
            this.statePosts = this.props.posts; //reducer posts
            this.postData = this.props.postData; //reducer postData

            /**looking for the post element by the id, which is taken
             * from the url path with 'matchPath' (react-router-dom)
             * */
            this.innPost = this.initPost();
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
                                active={ this.postData.isUpdate }
                        >
                            Save Post
                        </Button>
                    </div>
                    <div className={styles.flexBoxCenter}>
                        <Button dataValue='undo'
                                handle={ this.handleClick }
                                active={ this.postData.isUpdate }
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
                            (Object.keys( this.innPost ).length)
                                ? <PostDetail data={ this.innPost } />
                                : <LoadingAlert />
                        }
                    </div>
                </div>
            </div>
        );

        return <PageTemplate>{ body }</PageTemplate>
    }
}

PostPage.getId = function( pathName ) {
    if( matchPath ) {
        let matchedPars = matchPath(pathName, {
            path: '/posts/:id',
        });
        return String(matchedPars.params.id);
    } else {
        throw new Error('no matchPath module found...');
    }
};

PostPage.getPostById = function( id, postArr ) {
    const innData = postArr.filter(el => {
        if (el.id == id) {  //to equalize Num and String
            log('the id is found...');
            return el;
        }
        //return el.id == id;
    });
    /**returning the copy of the Post
     * */
    return ( innData.length ) ? { ...innData[0] } : {};
};

/**@description adding additional properties to the fetched Post
 * */
PostPage.preparePost = function( post, isComment ) {
    let innPost = {...post};
    /**@description giving additional property to the post or comment
     * */
    if (!innPost.createDate) {
        innPost.createDate = new Date().toDateString();
    }

    if (innPost.id === 'default' && isComment) {
        /**@description giving unique id to new comment
         * */
        if ( v4 ) {
            innPost.id = v4();
        } else {
            throw new Error('no uuid v4 module found');
        }
    }

    return innPost;
};

export default connect(mapStateToProps, mapActionsToProps)(PostPage);

/////dev
function log(it) {
    console.log(it);
}