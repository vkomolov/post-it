///node_modules
import React, { Component } from 'react';
import { connect } from 'react-redux';

///components
import Post from '../../components/Post';
import Aside from '../../components/Aside';
import Content from '../../components/Content';

///pages
import PageTemplate from '../../containers/PageTemplate';
import { mapStateToProps, mapActionsToProps } from './MainPage.redux';
import funcs from '../../utils/funcsCollection';

///styles
import styles from './MainPage.module.scss';

class MainPage extends Component {
/*    constructor(props) {
        super(props);
    }*/

    componentDidMount() {
        if(!this.loaded && !this.error) {
            this.getAllPosts();
        }
    }

    getAllPosts() {
        const getAllUrl = 'https://bloggy-api.herokuapp.com/posts';
        const params = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        if (this.props.gotSuccess && this.props.gotFailure) {
            funcs.initFetch(getAllUrl, params)
                .then(data => {
                    setTimeout(() => this.props.gotSuccess( data ), 1000);
                })
                .catch(error => {
                    console.error(error);
                    this.props.gotFailure(error)
                })
        } else {
            throw new Error('no actions connected');
        }
    }

    render() {
        const state = this.props.posts;
        let innData = [];
        if (state.data && state.data.length){
            log(true);
            innData = [...state.data].map(el => {
                return (
                    <Post key={el.id} data={el}/>
                );
            });
        }
        const body = (
            <div className={styles.contentWrapper}>
                <Aside>
                    <div className={styles.asideButton}>Sort by Title</div>
                </Aside>
                <Content>
                    <h2 className={styles.postsHeading}>POST LIST</h2>
                    <div className={styles.postList}>{ innData }</div>
                </Content>
{/*                <div className={styles.content}>
                    <h2 className={styles.postsHeading}>POST LIST</h2>
                    <div className={styles.postList}>{ innData }</div>
                </div>*/}
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