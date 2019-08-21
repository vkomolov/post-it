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
        //log('PostDetail did mount..');
    }

    /**@description it takes the value of the textarea, prepares and
     * patches the updated data of the Post to the reducer 'postData';
     * */
    handleText({ target }) {
        let str = target.value;
        let dataset = target.dataset.value;
        let updatedData = {};

        /**- it depends on the data-value attribute of the textarea how
         * to prepare the updated data of the Post;
         * */
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

    /**@description it depends on the data-value attribute of the textarea
     * how to prepare the updated data of the Post;
     * - if on blur the textarea value is empty then to switch to the
     * previous initial value;
     * @param {object} target: event.target
     * */
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

    /**@description it changes the behavior of the key press 'Enter' when
     * typing in the textarea; Changing from 'next line' to the blur effect;
     * */
    handleKey(e) {
        if(e.key === 'Enter') {
            e.preventDefault();
            e.target.blur();
        }
    }

    /**@description it filters the array of the Post comments and
     * patches the updated data of the Post to the reducer 'postData'
     * */
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
        //log('rendering PostDetail');
        const cbArr = {
            handleText: this.handleText,
            handleBlur: this.handleBlur,
            handleKey: this.handleKey
        };
        if (Object.keys(this.props.data).length) {
            this.propsData = this.props.data;
        }

        /**- if the property 'isUpdate' (of the reducer 'postData') is true,
         * then to use the updated data from 'postData';
         * - if 'isUpdate' is false (no changes of the Post), then to use the
         * initial Post data, taken from the props;
         * */
        const postData = this.props.postData;
        this.activeData = postData.isUpdate
            ? postData.data
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