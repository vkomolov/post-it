import React from "react";
import PropTypes from "prop-types";
import "./PostContentComment.scss";

/*const commentsSample = [
    {
        "id": 4,
        "body": "Wow! You have improved so much!",
        "postId": 8,
        "user": {
            "id": 19,
            "username": "bleveragei"
        }
    },
];*/

const PostContentComment = ({ comment }) => {
    log("PostContentComment renders...");
    //log(comment, "comment in PostContentComment: ");
    const { user, body } = comment;


    return (
        <div className="post-comment-wrapper">
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