///node_modules
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { matchPath } from 'react-router-dom';

///components
import Aside from '../../components/Aside';
import Content from '../../components/Content';
import PostDetail from '../../components/PostDetail';

///components
import PageTemplate from '../../containers/PageTemplate';
import { mapStateToProps, mapActionsToProps } from './PostPage.redux';
import userService from '../../utils/userService';

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
            userService.fetchAll
            (
                'https://bloggy-api.herokuapp.com/posts',
                this.props.gotSuccess,
                this.props.gotFailure
            );
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
                undoUpdate: () => {
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

    render() {
        const stateProps = this.props.posts; //can will be re-rendered
        let pathName = this.history.location.pathname;
        let matchedPars = matchPath(pathName, {
            path: '/posts/:id',
        });
        const id = matchedPars.params.id;
        let innData = [];

        if ( id.length && stateProps.data.length ) {
            innData = [...stateProps.data].filter(el => {
                return el.id === parseInt(id);
            });
        }

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
                        POST DETAIL id: { id }
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
                            <div className={styles.createButton}
                                 data-value="savePost"
                                 onClick={(e) => this.handleClick(e)}
                            >
                                SAVE POST
                            </div>
                        </div>
                        <div className={styles.flexBoxCenter}>
                            <div className={styles.asideButton}
                                 data-value="undoUpdate"
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
                        { innData.length && <PostDetail data={innData[0]}/> }
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