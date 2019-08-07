///node_modules
import React from 'react';

///styles
import styles from './TextArea.module.scss';

export default function TextArea(props) {
    const { dataValue, cbArr, text='' } = props;
    let classCss = '';
    const cssObj = {
        'comments' : styles.textAreaComment,
        'title' : styles.textAreaHeader,
        'body' : styles.textAreaBody
    };
    if (dataValue in cssObj) {
        classCss = cssObj[dataValue];
    }
        return (
        <textarea name={ dataValue }
                  value={ text }
                  className={ classCss }
                  data-value={ dataValue }
                  onChange={(e) => cbArr.handleText(e)}
                  onBlur={(e) => cbArr.handleBlur(e)}
                  onKeyPress={(e) => cbArr.handleKey(e)}
        />
    );
}