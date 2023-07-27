import React from "react";
import "./PostContent.scss";
import PostContentItem from "../../components/PostContentItem";


const PostContent = ({ postActive }) => {
//TODO: To fetch post comments
  return (
    <div className={"post-content"}>
      <PostContentItem {...{ postActive }} />
    </div>
  );
};

export default PostContent;

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
  console.log(comments, it);
}