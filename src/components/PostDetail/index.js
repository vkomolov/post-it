///node_modules
import React, { Component } from 'react';
import { connect } from 'react-redux';

///components
import TextArea from '../../components/TextArea';
import { defaultComment } from '../../utils/userService/initialData';
import userService from '../../utils/userService';

import userActions from '../../store/actions/user.actions';
import funcs from '../../utils/funcsCollection';

import { mapStateToProps, mapActionsToProps } from './PostDetail.redux';

///styles
import styles from './PostDetail.module.scss';

class PostDetail extends Component {
    constructor(props) {
        super(props);
        this.propsData = props.data;
        this.activeData = {};

        this.handleText = this.handleText.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleKey = this.handleKey.bind(this);
    }

    componentDidMount() {
        log('PostDetail did mount..');
    }

    handleText({ target }) {
        let str = target.value;
        let dataset = target.dataset.value;
        let updatedData = {};

        if (dataset in this.activeData) {
            if (dataset !== 'comments') {
                updatedData = {
                    ...this.activeData,
                    [dataset]: str,
                };
            } else {
                updatedData = {
                    ...this.activeData,
                    [dataset]: this.activeData[dataset].map(el => {
                        if ( String(el.id) === target.id ) {
                            el.body = str;
                        }
                        return el;
                    })
                };
            }

            /**@description dispatching the updated Data, setting
             * isUpdate: true
             * */
            this.props.putData( updatedData );

        } else {
            throw new Error(`no dataset ${dataset} in the Data`);
        }
    }

    handleBlur({ target }) {
        let str = target.value.trim();
        let dataset = target.dataset.value;
        let updatedData = {};

        if (dataset in this.activeData) {
            if (dataset !== 'comments') {
                if (str !== target.value || !str.length) {
                    target.value = ( str.length )
                        ? str
                        : this.propsData[dataset];

                    updatedData = {
                        ...this.activeData,
                        [dataset]: target.value,
                    };
                }

            } else {
                const index = this.propsData[dataset].findIndex(el => {
                    return el.id === target.id;
                });
                if (str !== target.value || !str.length) {
                    if (str.length) {
                        target.value = str;
                    } else {
                        if( this.propsData[dataset][index]
                            && this.propsData[dataset][index].body ) {
                            target.value = this.propsData[dataset][index].body;
                        } else {
                            target.value = defaultComment.body;
                        }
                    }

                    updatedData = {
                        ...this.activeData,
                        [dataset]: this.activeData[dataset].map(el => {
                            if ( el.id === target.id ) {
                                el.body = target.value;
                            }
                            return el;
                        })
                    };
                }
            }

            /**@description dispatching the updated Data, setting
             * isUpdate: true
             * */
            if (Object.keys(updatedData).length) {
                this.props.putData( updatedData );
            }

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

    handleClose({ target }) {
        let dataset = target.dataset.value;
        let updatedData = {};

        if (dataset === 'comments') {
            updatedData = {
                ...this.activeData,
                [dataset]: this.activeData[dataset].filter(el => {
                    return String(el.id) !== target.id;
                })
            };
        }
        if (Object.keys(updatedData).length) {
            this.props.putData(updatedData);
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
        this.activeData = postState.isUpdate
            ? postState.data
            : this.propsData;

        let commentsArr = [];

        if ( this.activeData.comments.length ) {
            commentsArr = this.activeData.comments.map( el => (
                <div key={ el.id }>
                    <h4 className={styles.subHeading}>Creation Date:
                        <span className={styles.dateIndicate}>
                            { el.createDate }
                        </span>
                    </h4>
                    <div className={styles.textAreaWrapper}>
                        <div className={styles.closeBttn}
                             data-value='comments'
                             id={el.id}
                             onClick={(e) => this.handleClose(e)}>
                            X
                        </div>
                        <TextArea dataValue="comments"
                                  id={ el.id }
                                  cbArr={ cbArr }
                                  text={ el.body }
                        />
                    </div>
                </div>
            ));
        }

        let innId = this.activeData.id; //to get the length of id;
        let showId = (innId.length > 8)
            ? innId.slice(0, 8).concat('...')
            : innId;

        return (
            <div className={styles.postWrapper}>
                <h3 className={styles.headingId}>Post ID: { showId }</h3>
                <h4 className={styles.subHeading}>Creation Date:
                    <span className={styles.dateIndicate}>
                        { this.activeData.createDate }
                    </span>
                </h4>
                <h3 className={styles.headingTitle}>Post Title</h3>
                <hr className={styles.hr}/>

                <TextArea dataValue="title"
                          cbArr={ cbArr }
                          text={ this.activeData.title }
                />
                <h3 className={styles.headingTitle}>Post Content</h3>
                <hr className={styles.hr}/>

                <TextArea dataValue="body"
                          cbArr={ cbArr }
                          text={ this.activeData.body }
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