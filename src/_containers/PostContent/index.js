import React, { useMemo } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { usePostActive } from "../../hooks";

import "./PostContent.scss";
import PostContentItem from "../../_components/PostContentItem";
import PostContentComment from "../../_components/PostContentComment";

export default PostContent;

function PostContent() {
  const { postActive, comments } = usePostActive();
  const commentsList = useMemo(() => {
    return !comments.length
        ? null
        : comments.map(comment => <PostContentComment comment={ comment } key={ nanoid() } />);
  }, [comments]);
  const postContent = postActive.id
      ? <PostContentItem {...{ postActive }} />
      : null;

  return (
      <div className="post-content">
        <div className="content-layer layer-body">
          { postContent }
        </div>
        <div className="content-layer layer-comment">
          { commentsList }
        </div>
      </div>
  );
}

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments = "value: ") {
  console.log(comments, it);
}