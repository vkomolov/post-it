import React, { useMemo } from "react";
import "./PostsWrapper.scss";
import PostItem from "../../_components/PostItem";
import { nanoid } from "@reduxjs/toolkit";
import { useOpacityTransition, usePostsSorted } from "../../hooks";

const PostsWrapper = () => {
  const { postsSorted, maxStarQnty } = usePostsSorted();

  //for animation of the element with the transition opacity...
  const transitionedRef = useOpacityTransition(700);

  const postsList = useMemo(() => {
    if (!postsSorted.length) {
      return null;
    }

    return postsSorted.map(data => (
        <PostItem
            data={ data }
            maxStarQnty={ maxStarQnty }
            key={ nanoid() }
        />
    ));
  }, [postsSorted, maxStarQnty]);

  return (
      <div
          className="posts-wrapper"
          role="menu"
          ref={ transitionedRef }
      >
        { postsList }
      </div>
  );
};

export default PostsWrapper;

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments = "value: ") {
  console.log(comments, it);
}