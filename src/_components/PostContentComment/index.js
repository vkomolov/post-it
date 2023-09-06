import React from "react";
import * as PropTypes from "prop-types";
import "./PostContentComment.scss";
import { useOpacityTransition, useUsers } from "../../hooks";

//re-rendering PostContentComment on changing only comment props with React.memo
export default React.memo(PostContentComment);

/**
 * @return {null|*}
 */
function PostContentComment({ comment }) {
    const { users } = useUsers();
    const commentsRef = useOpacityTransition(700);
    const { user, body } = comment;

    if (users.length) {
        const { firstName, lastName } = users.find(el => el.id === user["id"]);

        return (
            <div className="post-comment-wrapper" ref={ commentsRef }>
                <h3>Author: { firstName } { lastName }</h3>
                <p>{ body }</p>
            </div>
        );
    }

    return null;
}



PostContentComment.propTypes = {
    comment: PropTypes.shape({
        body: PropTypes.string,
        user: PropTypes.shape({
            id: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number
            ]),
            username: PropTypes.string,
        })
    })
};


///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}