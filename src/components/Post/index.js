///node_modules
import React from 'react';
import { withRouter } from 'react-router';

///styles
import styles from './Post.module.scss';

function Post({data, history}) {
    const { title, id } = data;
    const maxLength = 200;
    const { push } = history;

    const body = (data.body.length > maxLength)
        ? data.body.slice(maxLength) + '...'
        : data.body;

    const getTo = ( id ) => {
        if ( push ) {
            push(`/posts/${ id }`);
        } else {
            throw new Error('no Router in context');
        }
    };

    return (
        <div className={styles.postWrapper}
             onClick={() => getTo( id )}
        >
            <h3 className={styles.heading}>{ title }</h3>
            <p className={styles.postBody}>{ body }</p>
        </div>
    );
}

export default withRouter(Post);

/////dev
function log(it) {
    console.log(it);
}