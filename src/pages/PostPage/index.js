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
        this.stateProps = {};
        this.postData = {};
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

    initPost() {
        let pathName = this.history.location.pathname;
        let id = PostPage.getId(pathName);
        let innPost = {};

        if ( id ) {
            if ( this.stateProps.data.length ) {
                if (id !== 'default') {
                    innPost = PostPage.getPostById(id, this.stateProps.data);
                    if (Object.keys(innPost).length) {
                        return PostPage.preparePost(innPost);
                    } else {
                        //TO DO ALERT no id found in posts state
                        this.history.push('/');
                    }
                } else {
                    return PostPage.preparePost(innPost);
                }
            } else {
                return innPost; //returning empty object;
            }
        } else {
            //TO DO ALERT
            this.history.push('/');
        }
    }

    render() {
        log('rendering PostPage...');
        this.stateProps = this.props.posts; //can will be re-rendered
        this.postData = this.props.postData; //reducer

        let innPost = this.initPost();

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
        return el.id === +id;
    });
    /**returning the copy of the Post
     * */
    return ( innData.length ) ? { ...innData[0] } : {};
};

/**@description adding additional properties to the fetched Post
 * */
PostPage.preparePost = function( post={} ) {
    let innPost = userService.addDefaultPars( post );

    if (!innPost.createDate) {
        innPost.createDate = new Date().toDateString();
    }

    if (innPost.id === 'default') {
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