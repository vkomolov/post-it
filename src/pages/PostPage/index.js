///node_modules
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { matchPath } from 'react-router-dom';
import { v4 } from 'uuid';

///components
import Aside from '../../components/Aside';
import Content from '../../components/Content';
import PostDetail from '../../components/PostDetail';

///components
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
    }

    componentDidMount() {
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
    }

    handleClick({ target }) {
        const dataSet = target.dataset.value;
        if( dataSet ) {
            const datasetObj = {
                backToList: () => {
                    this.history.push('/');
                },
                createComment: () => {
                    log('createComment');
                },
                savePost: () => {
                    log('savePost');
                },
                undo: () => {
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
            post = userService.initDefaultPars();
        }

        return this.preparePost( post );
    }

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

        //carring will put the default className
        let activateClass = funcs.activateClassName(postData.isUpdate, styles.activeButton);

        let innId = `${innPost.id}`; //to get the length of id;
        let showId = (innId.length > 8)
            ? innId.slice(0, 8).concat('...')
            : innId;

        const body = (
            <div className={styles.totalWrapper}>
                <div className={styles.flexBoxCenter}>
                    <div className={styles.backButton}
                         data-value="backToList"
                         onClick={(e) => this.handleClick(e)}
                    >
                        BACK TO LIST
                    </div>
                    <h2 className={styles.postsHeading}>
                        POST DETAIL id: { showId }
                    </h2>
                </div>
                <div className={styles.contentWrapper}>
                    <Aside>
                        <div className={styles.flexBoxCenter}>
                            <div className={styles.createButton}
                                 data-value="createComment"
                                 onClick={(e) => this.handleClick(e)}
                            >
                                NEW COMMENT</div>
                            <div className={ activateClass(styles.createButton) }
                                 data-value="savePost"
                                 onClick={(e) => this.handleClick(e)}
                            >
                                SAVE POST
                            </div>
                        </div>
                        <div className={styles.flexBoxCenter}>
                            <div className={ activateClass(styles.asideButton) }
                                 data-value="undo"
                                 onClick={(e) => this.handleClick(e)}
                            >
                                UNDO
                            </div>
                            <div className={styles.deleteButton}
                                 data-value="deletePost"
                                 onClick={(e) => this.handleClick(e)}
                            >
                                DELETE POST
                            </div>
                        </div>
                    </Aside>
                    <Content>
                        {
                            Object.keys( innPost ).length
                            && <PostDetail data={ innPost }/>
                        }
                    </Content>
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