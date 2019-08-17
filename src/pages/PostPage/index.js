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
        this.stateProps = {};
        this.postData = {};
        this.innPost = {};
        this.postId = '';
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        /**Fetching all Posts from API, if the Page was reached without
         * the Main Page (by inputting the url path)
         * */
        if ( !this.props.posts.loaded && !this.props.posts.error ) {
            log('getAllPosts... from componentDidMount');
            userService.fetchAll(
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
                    this.props.getDefault();
                    this.history.push('/');
                },
                createComment: () => {
                    log('createComment');
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
                            this.postId = data.id;

                            return userService.updateComments(
                                urlSource,
                                this.postId,
                                postCommentsArr,
                                prevCommentsArr
                            );
                        }).then( () => {
                            let path = '/posts/' + this.postId;

                            userService.fetchAll(
                                urlSource,
                                this.props.gotSuccess,
                                this.props.gotFailure
                            ).then(()=> {

                                log(`pushing history... ${path}`);
                                this.history.push( path );

                                log('sitching off update...');
                                this.props.getDefault();
                            });

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
        let id = PostPage.getId(pathName);
        //log('pathname:');
        //log(pathName);
        let innPost = {};

        if ( id.length ) {
            if ( this.stateProps.data.length ) {
                if (id !== 'default' || this.postId.length) {
                    let innId = (id !== 'default') ? id : this.postId;
                    innPost = PostPage.getPostById(innId, this.stateProps.data);
                    if (!Object.keys(innPost).length) {
                        //TO DO ALERT no id found in posts state
                        console.error('given id is not found...');
                        //this.history.push('/');
                    } else {
                        log('InnPost is ready...');
                        log(innPost);
                    }
                    /**deep cloning
                     * */
                    return funcs.deepClone(innPost);
                }
                return PostPage.preparePost(userService.addDefaultPars(innPost));
            } else {
                return innPost; //returning empty object;
            }
        } else {
            //TO DO ALERT
            //this.history.push('/');
            console.error('no id in path');
        }
    }

    render() {
        log('rendering PostPage...');

        /**@description deepClone gives the copies of comments, before they
         * are changed: will be used for defaults with 'undo' and searching
         * the differences in comments for PUT or POST options
         */
        //this.stateProps = funcs.deepClone( this.props.posts ); //can will be re-rendered
        this.stateProps = this.props.posts;
        this.postData = this.props.postData; //reducer
        this.innPost = this.initPost();

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
        return matchedPars.params.id;
    } else {
        throw new Error('no matchPath module found...');
    }
};

PostPage.getPostById = function( id, postArr ) {
    const innData = postArr.filter(el => {
        if (el.id == id) {
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