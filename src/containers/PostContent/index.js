import React from "react";
import "./PostContent.scss";
import PropTypes from "prop-types";
import PostContentItem from "../../components/PostContentItem";


const PostContent = ({ postActive }) => {

  return (
    <div className={"post-content"}>
      <PostContentItem {...{ postActive }} />
    </div>
  );
};

export default PostContent;

PostContent.propTypes = {
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
    })
};

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
  console.log(comments, it);
}