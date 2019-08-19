export const initialPost = {
    isUpdate: false,
    data: {}
};

export const initialPostsState = {
    loaded: false,
    error: false,
    data: []
};

export const initialAlertState = {
    toAlert: false,
    alertWhat: null,
    toConfirm: false,
    confirmWhat: null,
    message: '',
};

export const defaultPost = {
    id: 'default',
    title: 'Initial Title',
    body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. ' +
    'Dicta ducimus illo omnis quis sequi similique, sint vero! ' +
    'Culpa eaque eius, illum maxime modi mollitia nam, nemo perferendis, ' +
    'tempore velit vitae.',
    comments: [],
    createDate: ''
};

export const defaultComment = {
    id: 'default',
    postId: '',
    body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    createDate: ''
};

export const urlSource = 'https://bloggy-api.herokuapp.com';

export const getAllParams = () => {
    return {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        params: {
            _embed: 'comments'
        }
    };
};

export const postParams = ( { id, title, body, comments, createDate } ) => {
    const data = {title, body, comments, createDate};
    let method = (id === 'default') ? 'POST' : 'PUT';

    return {
        method,
        headers: {
            'Content-Type': 'application/json'
        },
        data
    };
};

export const delParams = () => {
    return {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    }
};

export const commentsParams = ( postId, body, isNew=true ) => {
    const data = { postId: +postId, body };
    //log(data);
    const method = ( isNew ) ? 'POST' : 'PUT';
    return {
        method,
        headers: {
            'Content-Type': 'application/json'
        },
        data
    }
};
    ///TODO API BLOCKS DEL request for comments
    /*else {
        return {
            method,
            headers: {
                'Content-Type': 'application/json'
            }
        }
    }*/
    ////////////////////////


/////dev
function log(it) {
    console.log(it);
}