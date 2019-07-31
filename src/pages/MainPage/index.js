///node_modules
import React, { Component } from 'react';
import { connect } from 'react-redux';
///components
///pages
import PageTemplate from '../../containers/PageTemplate';
import { mapStateToProps, mapActionsToProps } from './MainPage.redux';
import funcs from '../../utils/funcsCollection';

///styles
import styles from './MainPage.module.scss';

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.apiSource = 'https://bloggy-api.herokuapp.com/posts'
        //this.state = this.props.posts;
        //this.loaded = this.state.loaded;
        //this.error = this.state.error;
    }

    componentDidMount() {
        if(!this.loaded && !this.error) {
            const params = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            funcs.initFetch(this.apiSource, params)
                .then(data => {
                    setTimeout(() => this.props.gotSuccess( data ), 1000);
                })
                .catch(error => {
                    console.error(error);
                    this.props.gotFailure(error)
                })
        }
    }

    render() {
        const state = this.props.posts;
        let innData = [];
        if (state.data && state.data.length){
            innData = [...state.data].map(el => {
                return (
                    <div key={el.id}>
                        <h3>{el.title}</h3>
                        <p>{el.body}</p>
                    </div>
                );
            });
        }
        const body = (
            <div className={styles.topWrapper}
            >
                <span>MAIN PAGE</span>
                <div>{ innData }</div>
            </div>
        );

        return (
            <PageTemplate>
                {body}
            </PageTemplate>
        );
    }
}

export default connect(mapStateToProps, mapActionsToProps)(MainPage);

/////dev
function log(it) {
    console.log(it);
}