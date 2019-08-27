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
import AlertBlock from "../../components/AlertBlock";

import userService from '../../utils/userService';
import { defaultComment } from '../../utils/userService/initialData';
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
        this.alertData = {};
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        /**if in the 'posts' reducer the list of Posts is not fetched, then
         * to fetch all Posts and update the 'posts' reducer with the list
         * in case the Page is reached from the url path, without the Main Page;
         * to alert notification on update with Array 'callBacks'
         * */
        if(!this.props.posts.loaded && !Object.keys(this.props.posts.error).length) {
            const cbSuccess = [
                () => this.props.showAlert( 'Load is successful...',
                    true, 1500 ),
            ];

            userService.fetchAllPosts(
                ( data ) => this.props.gotSuccess( data, cbSuccess ),
                ( error ) => this.props.gotFailure( error )
            );
        }
    }
/**@description one handleClick for all clickables which have the data-value
 * attribute;
 * @param {object} target: event.target;
 * */
    handleClick({ target }) {
        const dataSet = target.dataset.value;
        if( dataSet ) {
            const datasetObj = {
                /**@description returning to the Main Page by pushing this.history
                 * to the Post list location;
                 * .getDefault() switches off the state 'isUpdate' of the reducer
                 * 'postData'
                 * */
                backToList: () => {
                    this.history.push('/');
                    this.props.getDefault();
                },
                createComment: () => {
                    log('creating default Comment...');

                    /**creating a new Comment with the default properties
                     * and unique temporal id (from uuid);
                     * */
                    const comment = PostPage.preparePost(
                        userService.addDefaultPars({}, defaultComment),
                        true
                    );

                    /** - if the Post has already the changes at reducer 'postData'
                     * (if 'title' or 'body' of the Post have changed),
                     * then: to take the updated Post data from the reducer 'postData';
                     * - if the Post has no changes at the reducer 'postData',
                     * then: to take the Post data from this.innPost (original Post, taken
                     * from the fetched array of the Posts, or new default Post);                     *
                     * */

                    let fromData = ( this.postData.isUpdate )
                        ? this.postData.data : this.innPost;

                    let updated = {
                        ...fromData,
                        comments: [
                            ...fromData.comments,
                            comment
                        ]
                    };

                    /**sending the updated Post to the reducer 'postData'
                     * */
                    this.props.putData( updated );
                    this.props.showAlert('new Comment created...',
                        true, 1000 );
                },
                savePost: () => {
                    /**if the Post has already changes and the reducer 'postData'
                     * property 'isActive' is true
                     * */
                    if ( this.postData.isUpdate ) {
                        const prevCommentsArr = this.innPost.comments;
                        const postCommentsArr = this.postData.data.comments;

                    /**to fetch API with POST or PUT methods for updating or creating
                     * the Post in the API by .updatePost(the state of reducer 'postData')
                     * then: to take the postId of the newly created or updated Post
                     * from the API response when OK;
                     * */
                        userService.updatePost(
                            this.postData.data,
                        ).then(({ data }) => {
                            this.postId = String(data.id);

                     /**then: to POST or PUT the comments with the postId by checking the
                      * differences in the original and updated comments and fetching the proper
                      * method for newly created or already existing comments of the Post;
                      * '.updateComments' returns the array of responses from Promise.all results;                      *
                      * * */
                            return userService.updateComments(
                                this.postId,
                                postCommentsArr,
                                prevCommentsArr
                            );
                        }).then(() => {
                      /**then: to make the path with 'postId' for the newly created Post,
                       * then: to fetch all Posts (with the updated or newly created posts)
                       * from API and to push 'this.history' with the proper Post path;
                       * !!!When a new Post is created, it initially has the id='default'...
                       * When this new Post is POSTed to API, then in response it receives
                       * the id ('postId') of this new Post, created by API;
                       * !!!In order to show the new Post by its id, we push history to
                       * new url location (from '/posts/default' to '/posts/${postId}')
                       * */
                            let path = '/posts/' + this.postId;
                            const callBacks = [
                                () => this.history.push( path ),
                                () => this.props.getDefault()
                            ];

                       /** when the Posts are updated at API, then to refetch all Posts
                        * and to push this.history to the proper path with 'postId'
                        * */
                            return userService.fetchAllPosts(
                                ( data ) => this.props.gotSuccess( data, callBacks ),
                                this.props.gotFailure
                            );
                        } );
                    }
                },
                /**it switches off the state 'isUpdate' of the reducer 'postData'
                 * then the Post data is taken from the original Post before update;
                 * */
                undo: () => {
                    this.props.getDefault();
                    log('undoUpdate');
                },

                /**fetching the DELETE method with the Post id,
                 * then fetching all updated Posts from API,
                 * pushing this.history to the Main Page with the list of Posts;
                 * then switching off 'isUpdate' of the reducer 'postData';
                 * */
                deletePost: () => {
                    if (this.urlId !== 'default') {
                        log('deleting...');
                        return userService.deletePost( this.urlId )
                            .then(() => {
                                this.props.getAllPosts();
                                this.history.push('/');
                                this.props.getDefault();
                            });
                    }
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

    /**@description it starts on each render, takes the id from the url path,
     * then it looks for the Post from the fetched list of the Posts;
     * if no Post by the id is found (the Page is loaded from the url path),
     * then to redirect to the Main Page with the list of the Posts;
     * if the Post id === 'default', then to create a default Post with the
     * initial props.
     * */
    initPost() {
        let pathName = this.history.location.pathname;
        this.urlId = PostPage.getId(pathName);
        let innPost = {};

        if ( this.urlId.length && this.statePosts.data.length ) {
            if ( this.urlId !== 'default' ) {
                let foundById = PostPage.getPostById(this.urlId, this.statePosts.data);
                if (Object.keys(foundById).length) {
                    /**if the Post is found, then to add initial properties to the Post
                     * */
                    innPost = PostPage.preparePost(userService.addDefaultPars( foundById ));
                } else {
                    /**if the Post is not found, then to show the Main Page with the
                     * list of the Posts; to switch off the 'isUpdate' of 'dataPost'
                     * */
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
                /**adding default properties to the new empty Post
                 * */
                innPost = PostPage.preparePost(userService.addDefaultPars());
            }
        } else {
            //TO DO ALERT
            console.error('waiting for the statePosts data ...');
        }

        /**deepcloning of the Post data for the future checking of changes
         * */
        return Object.keys(innPost).length
            ? funcs.deepClone(innPost)
            : innPost;
    }

    render() {
        log('rendering the PostPage...');
        this.statePosts = this.props.posts; //reducer posts
        this.postData = this.props.postData; //reducer postData
        this.alertData = this.props.alertData; //reducer alertData

        /**looking for the post element by the id, which is taken
         * from the url path with 'matchPath' (react-router-dom)
         * */
        if ( this.statePosts.data && this.statePosts.data.length ) {
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

        const isAlert = this.alertData.isAlert || this.alertData.isConfirm;

        return <PageTemplate>
            { isAlert && <AlertBlock data={ this.alertData } /> }
            { body }
            </PageTemplate>
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
        return String(el.id) === id;
    });

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

export default connect( mapStateToProps, mapActionsToProps )(PostPage);

/////dev
function log(it) {
    console.log(it);
}