///node_modules
import React from 'react';

///styles
import styles from './Button.module.scss';

export default function Button ({ dataValue, handle, active=false, children }) {
    let classCss = '';
    const funcObj = {
        createPost: () => ['createButton'],
        sortByTitle: () => ['sortButton'],
        sortByDate: () => ['sortButton'],
        backToList: () => ['backButton'],
        createComment: () => ['createButton'],
        savePost: () => {
            return (active) ? ['createButton', 'activeButton'] : ['createButton'];
        },
        undo: () => {
            return (active) ? ['undoButton', 'activeButton'] : ['undoButton'];
        },
        deletePost: () => ['deleteButton'],
    };

    if (dataValue && dataValue in funcObj) {
        classCss = funcObj[dataValue]().map(css => {
           return styles[css];
        }).join(' ');
    } else {
        throw new Error('no dataValue attribute found or incorrect');
    }

    return (
        <div className={ classCss }
             data-value={ dataValue }
             onClick={(e) => handle(e)}
        >
            { children }
        </div>
    );
}