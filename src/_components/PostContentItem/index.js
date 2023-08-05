import React from "react";
import "./PostContentItem.scss";
import PropTypes from "prop-types";
import { useOpacityTransition } from "../../hooks";

//re-rendering PostContentItem on changing only postActive props with React.memo
const PostContentItem = ({ postActive }) => {
    //for animation of the elements with the transition opacity...
    const postsRef = useOpacityTransition(700);

    //TODO: userId for checking login userId...
    const { userId, title, body, firstName, lastName, image } = postActive;

    return (
        <div className="post-content-item-wrapper" ref={ postsRef }>
            <div className="user-details-wrapper">
                <div className="image-wrapper">
                    <img src={ image } alt="user icon" />
                </div>
                <p className="user-name">
                    { firstName } {lastName}
                </p>
            </div>
            <h1 className="post-title">{ title }</h1>
            <p className="post-body">{ body }</p>
        </div>
    );
};

//avoiding re-rendering on changing comments at PostContent
export default React.memo(PostContentItem);

PostContentItem.propTypes = {
    postActive: PropTypes.shape({
        title: PropTypes.string,
        body: PropTypes.string,
        userId: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        image: PropTypes.string,
    }),
};

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}