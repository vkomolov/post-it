///node_modules
import axios from 'axios';

import funcs from "../funcsCollection";
import { commentsParams, defaultPost, getAllParams, postParams }
    from "../../utils/userService/initialData";

const userService  = {
    fetchAll,
    addDefaultPars,
    updatePost,
};
export default userService;

/**@description it packs axios or fetch realization.
 *
 * */
function fetchAll(source, actionSuccess, actionError) {
    const postSource = source + '/posts';

    ////SWITCHING TO AXIOS
    funcs.initAxios(postSource, getAllParams())
        .then(objData => {
            const { data } = objData;
            setTimeout(() => actionSuccess( data ), 1000);
        })
        .catch(error => {
            console.error(error);
            actionError(error)
        });

    ////SWITCHING TO FETCH

    /*funcs.initFetch(source, getAllParams)
        .then(data => {
            setTimeout(() => actionSuccess( data ), 1000);
        })
        .catch(error => {
            console.error(error);
            actionError(error)
        })*/
}

function updatePost( source, post, prevCommentsArr=[] ) {
    const urlSource = ( post.id === 'default' )
        ? source + '/posts'
        : `${source}/posts/${post.id}`;

    funcs.initAxios(urlSource, postParams( post ))
        .then(({ data }) => {
            let restComments = getRestArr( post.comments, prevCommentsArr );
            let postComments = [];

            //TO DO
            if (restComments.newElems.length) {
                postComments = restComments.newElems.map(( comment )=> {
                    return funcs.initAxios(source + '/comments', commentsParams( data.id, comment.body ));
                });
            }
            if (restComments.missingElems.length) {
                //TODO API BLOCKS THE DEL OF COMMENTS
            }

            return axios.all([...postComments]);
        }).then(( resultArr ) => {
                return resultArr;
            })
        .catch(error => {
            console.error(error);
            //actionError(error)
        })
}



/**@description it add additional properties of defaultData to the data
 * */
function addDefaultPars( data={}, defaultData=defaultPost) {
    return {
        ...defaultData,
        ...data,
    }
}

function getRestArr(targetArr, sourceArr) {
    let newElems = targetArr.filter(( el ) => {
        let found = false;

        sourceArr.forEach((elem) => {
            if (String(elem.id) === el.id) {
                found = true;
            }
        });
        if (!found) {
            return el;
        }
    });

    let missingElems = sourceArr.filter(( el ) => {
        let found = false;
        targetArr.forEach((elem) => {
            if (String(elem.id) === el.id) {
                found = true;
            }
        });
        if (!found) {
            return el;
        }
    });
    return {
        newElems,
        missingElems
    }

}

/////dev
function log(it) {
    console.log(it);
}