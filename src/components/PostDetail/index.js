///node_modules
import React, { Component } from 'react';
import { connect } from 'react-redux';

///components
import TextArea from '../../components/TextArea';

import userActions from '../../store/actions/user.actions';
import userService from '../../utils/userService';
import funcs from '../../utils/funcsCollection';

import { mapStateToProps, mapActionsToProps } from './PostDetail.redux';

///styles
import styles from './PostDetail.module.scss';

class PostDetail extends Component {
    constructor(props) {
        super(props);
        this.handleText = this.handleText.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleKey = this.handleKey.bind(this);

        this.propsData = props.data;
        this.activeData = {};
    }

    componentDidMount() {
        log('PostDetail did mount..');
    }

    handleText({ target }) {
        let str = target.value;
        let dataset = target.dataset.value;
        let updatedData = {};

        if (dataset in this.activeData) {
            if (str !== this.activeData[dataset]) {
                updatedData = {
                    ...this.activeData,
                    [dataset]: str,
                };

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
        const cbArr = {
            handleText: this.handleText,
            handleBlur: this.handleBlur,
            handleKey: this.handleKey
        };

        const postState = this.props.postData;
        const activeState = postState.isUpdate
            ? postState.data
            : this.propsData;
        this.activeData = {...activeState};

        let commentsArr = [];

        if (activeState.comments && activeState.comments.length) {
            commentsArr = activeState.comments.map( el => (
                <div key={ el.id }>
                    <hr className={styles.hr}/>

                    <TextArea dataValue="comments"
                              cbArr={ cbArr }
                              text={ el.body }
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

                <TextArea dataValue="title"
                          cbArr={ cbArr }
                          text={ activeState.title }
                />
                <h3 className={styles.headingTitle}>Post Content</h3>
                <hr className={styles.hr}/>

                <TextArea dataValue="body"
                          cbArr={ cbArr }
                          text={ activeState.body }
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