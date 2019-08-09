export const initialPost = {
    isUpdate: false,
    data: {}
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

export const initialPostsState = {
    loaded: false,
    error: false,
    data: {}
};

export const initialAlertState = {
    toAlert: false,
    alertWhat: null,
    toConfirm: false,
    confirmWhat: null,
    message: '',
};