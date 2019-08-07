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
        let str;
        let dataset = target.dataset.value;
        log(dataset);

        let updatedData = {};

        if (dataset in this.activeData) {
            if (target.value.trim().length) {
                str = target.value.trim();
                if (str !== this.activeData[dataset]) {
                    updatedData = {
                        ...this.activeData,
                        [dataset]: str,
                    };
                    log(updatedData);
                    /**@description dispatching the updated Data, setting
                     * isUpdate: true
                     * */
                    this.props.putData( updatedData );
                }

            } else {
                target.value = this.activeData[dataset];
            }

        } else {
            throw new Error(`no dataset ${dataset} in the Data`);
        }
    }

    render() {
        log('rendering PostDetail');

        const postState = this.props.postData;
        const activeState = postState.isUpdate
            ? postState.data
            : this.propsData;
        this.activeData = {...activeState};

        //log(this.activeData);

        let commentsArr = [];
        if (activeState.comments && activeState.comments.length) {
            commentsArr = activeState.comments.map(el => (
                <div key={el.id}>
                    <hr className={styles.hr}/>
                    <textarea name={el.id}
                              defaultValue={el.body}
                              className={ styles.textAreaBody }
                              data-value="comments"
                              onBlur={(e) => this.handleText(e)}
                    />
                </div>
            ));
        }

        return (
            <div className={styles.postWrapper}>
                <h3 className={styles.headingTitle}>Post Title</h3>
                <h4 className={styles.subHeading}>Creation Date:
                    <span className={styles.dateIndicate}>
                        {/*{ funcs.dateFormat(activeState.createDate, '/') }*/}
                        { activeState.createDate }
                    </span>
                </h4>
                <hr className={styles.hr}/>
                <textarea name="postHeader"
                          className={ styles.textAreaHeader }
                          defaultValue={ activeState.title }
                          data-value="title"
                          onBlur={(e) => this.handleText(e)}
                />
                <h3 className={styles.headingTitle}>Post Content</h3>
                <hr className={styles.hr}/>
                <textarea name="postBody"
                          className={ styles.textAreaBody }
                          defaultValue={ activeState.body }
                          data-value="body"
                          onBlur={(e) => this.handleText(e)}
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