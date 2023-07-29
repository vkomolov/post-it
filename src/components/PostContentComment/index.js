import React from "react";
import PropTypes from "prop-types";
import "./PostContentComment.scss";
import { useOpacityTransition } from "../../hooks";

//re-rendering PostContentComment on changing only comment props with React.memo
const PostContentComment = ({ comment }) => {
    const { user, body } = comment;
    const commentsRef = useOpacityTransition(700);

    return (
        <div className="post-comment-wrapper" ref={ commentsRef }>
            <h3>Author: { user.username }</h3>
            <p>{ body }</p>
        </div>
    );
};

export default React.memo(PostContentComment);

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