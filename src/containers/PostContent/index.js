import React from "react";
import "./PostContent.scss";
import PropTypes from "prop-types";
import PostContentItem from "../../components/PostContentItem";
import { nanoid } from "@reduxjs/toolkit";
import { useOpacityTransition } from "../../hooks";
import PostContentComment from "../../components/PostContentComment";

const PostContent = ({ postData }) => {
    const { postActive, comments } = postData;

    //for animation of the elements with the transition opacity...
    const postsRef = useOpacityTransition(700);
    const commentsRef = useOpacityTransition(700);

    const commentsList = !comments.length
        ? null
        : comments.map(comment => <PostContentComment  comment={ comment } key={ nanoid() } />);

  return (
    <div className={"post-content"}>
        <div className="content-layer layer-body" ref={ postsRef }>
            <PostContentItem {...{ postActive }} />
        </div>
        <div className="content-layer layer-comment" ref={ commentsRef }>
            { commentsList }
        </div>
    </div>
  );
};

export default PostContent;

PostContent.propTypes = {
    postData: PropTypes.shape({
        postActive: PropTypes.shape({
            id: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number
            ]),
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
        comments: PropTypes.array,
    })
};

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
  console.log(comments, it);
}