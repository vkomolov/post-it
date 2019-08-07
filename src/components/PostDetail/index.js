///node_modules
import React, { Component } from 'react';
import { connect } from 'react-redux';

import userActions from '../../store/actions/user.actions';
import userService from '../../utils/userService';
import funcs from '../../utils/funcsCollection';

import { mapStateToProps, mapActionsToProps } from './PostDetail.redux';

///styles
import styles from './PostDetail.module.scss';

class PostDetail extends Component {
    constructor(props) {
        super(props);
        this.propsData = props.data;
        this.activeData = {};
    }

    componentDidMount() {
        log('PostDetail did mount..');
    }

    handleText({ target }) {
        let str = target.value;
        let dataset = target.dataset.value;
        log('using textarea: ' + dataset);

        let updatedData = {};

        if (dataset in this.activeData) {
            if (str !== this.activeData[dataset]) {
                updatedData = {
                    ...this.activeData,
                    [dataset]: str,
                };
                //log('updatedData');
                //log(updatedData);
                //log('defaultData');
                //log(this.propsData);
                /**@description dispatching the updated Data, setting
                 * isUpdate: true
                 * */
                this.props.putData( updatedData );
            }

        } else {
            throw new Error(`no dataset ${dataset} in the Data`);
        }
    }

    handleBlur({ target }) {
        let str = target.value.trim();
        let dataset = target.dataset.value;
        if (dataset in this.propsData) {
            console.log('blur by :' + target.dataset.value);

            target.value = (str.length) ? str : this.propsData[dataset];
        } else {
            throw new Error(`no dataset ${dataset} in the Data`);
        }
    }

    handleKey(e) {
        if(e.key === 'Enter') {
            e.preventDefault();
            e.target.blur();
        }
    }

    render() {
        log('rendering PostDetail');

        const postState = this.props.postData;
        const activeState = postState.isUpdate
            ? postState.data
            : this.propsData;
        this.activeData = {...activeState};

        //log('active State');
        //log(activeState);

        let commentsArr = [];
        if (activeState.comments && activeState.comments.length) {
            commentsArr = activeState.comments.map(el => (
                <div key={el.id}>
                    <hr className={styles.hr}/>
                    <textarea name={el.id}
                              value={el.body}
                              className={ styles.textAreaBody }
                              data-value="comments"
                              onChange={(e) => this.handleText(e)}
                              onBlur={(e) => this.handleBlur(e)}
                              onKeyPress={(e) => this.handleKey(e)}
                    />
                </div>
            ));
        }

        let innId = activeState.id; //to get the length of id;
        let showId = (innId.length > 8)
            ? innId.slice(0, 8).concat('...')
            : innId;

        return (
            <div className={styles.postWrapper}>
                <h3 className={styles.headingId}>Post ID: { showId }</h3>
                <h3 className={styles.headingTitle}>Post Title</h3>
                <h4 className={styles.subHeading}>Creation Date:
                    <span className={styles.dateIndicate}>
                        { activeState.createDate }
                    </span>
                </h4>
                <hr className={styles.hr}/>
                <textarea name="postHeader"
                          className={ styles.textAreaHeader }
                          value={ activeState.title }
                          data-value="title"
                          onChange={(e) => this.handleText(e)}
                          onBlur={(e) => this.handleBlur(e)}
                          onKeyPress={(e) => this.handleKey(e)}
                />
                <h3 className={styles.headingTitle}>Post Content</h3>
                <hr className={styles.hr}/>
                <textarea name="postBody"
                          className={ styles.textAreaBody }
                          value={ activeState.body }
                          data-value="body"
                          onChange={(e) => this.handleText(e)}
                          onBlur={(e) => this.handleBlur(e)}
                          onKeyPress={(e) => this.handleKey(e)}
                />
                <h3 className={styles.headingTitle}>Post Comments</h3>
                <hr className={styles.hr}/>

                { commentsArr }
            </div>
        );
    }
}
export default connect(mapStateToProps, mapActionsToProps)(PostDetail);

/////dev
function log(it) {
    console.log(it);
}