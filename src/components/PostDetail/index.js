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
        //this.initialData = {};
    }

    componentDidMount() {
        log('Postdetail did mount..');
    }

    render() {
        log('rendering PostDetail');

        const postState = this.props.postData;
        //this.initialData = userService.initDefaultPars( this.propsData );
        const activeState = postState.isUpdate
            ? postState.data
            : this.propsData;

        let commentsArr = [];
        if (activeState.comments && activeState.comments.length) {
            commentsArr = activeState.comments.map(el => (
                <div key={el.id}>
                    <hr className={styles.hr}/>
                    <textarea name={el.id}
                              defaultValue={el.body}
                              className={ styles.textAreaBody }
                    />
                </div>
            ));
        }


        return (
            <div className={styles.postWrapper}>
                <h3 className={styles.headingTitle}>Post Title</h3>
                <h4>Creation Date:
                    <span className={styles.dateIndicate}>
                        { funcs.dateFormat(activeState.createDate, '/') }
                    </span>
                </h4>
                <hr className={styles.hr}/>
                <textarea name="postHeader"
                          className={ styles.textAreaHeader }
                          defaultValue={ activeState.title }
                />
                <h3 className={styles.headingTitle}>Post Content</h3>
                <hr className={styles.hr}/>
                <textarea name="postBody"
                          className={ styles.textAreaBody }
                          defaultValue={ activeState.body }
                />
                <h3 className={styles.headingTitle}>Post Comments</h3>
                <hr className={styles.hr}/>

                { commentsArr }
            </div>
        );
    }
}
export default connect(mapStateToProps, mapActionsToProps)(PostDetail);

/*function PostDetail({ data }) {
    let innData = {...data};
    let { id, title, body, comments, createDate } = innData;
    let commentsArr = (comments && comments.length)
        ? comments.map(el => (
            <div key={el.id}>
                <hr className={styles.hr}/>
                <textarea name={el.id}
                          defaultValue={el.body}
                          className={ styles.textAreaBody }
                />
            </div>
            ))
        : [];



    return (
        <div className={styles.postWrapper}>
            <h3 className={styles.headingTitle}>Post Title</h3>
            <span>Creation Date: {}</span>
            <hr className={styles.hr}/>
            <textarea name="postHeader"
                      className={ styles.textAreaHeader }
                      defaultValue={ title }
            />
            <h3 className={styles.headingTitle}>Post Content</h3>
            <hr className={styles.hr}/>
            <textarea name="postBody"
                      className={ styles.textAreaBody }
                      defaultValue={ body }
            />
            <h3 className={styles.headingTitle}>Post Comments</h3>
            <hr className={styles.hr}/>

            { commentsArr }
        </div>
    );
}*/



/////dev
function log(it) {
    console.log(it);
}