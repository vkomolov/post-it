import React, { useMemo } from "react";
import { nanoid } from "@reduxjs/toolkit";
import PropTypes from "prop-types";
import "./PostItem.scss";

const PostItem = ({ postData }) => {
  const { id, userName, title, reactions, tags, postActive  } = postData;
  const starQnty = 5;
  const specClass = id === postActive ? "post-wrapper active" : "post-wrapper";

  const stars = useMemo(() => {
    return new Array(starQnty).fill("").map((e, index) => {
      const specClass = (index + 1) <= +reactions ? "material-icons icon icon_raiting icon_foxy" : "material-icons icon icon_raiting";
      return (
          <i className={ specClass } key={ nanoid() }>star_rate</i>
      );
    });
  }, [reactions]);

  const titleString = useMemo(() => {
    return title.slice(0, 50) + "...";
  }, [title]);

  const tagsString = useMemo(() => {
    return tags.join(", ");
  }, [tags]);

  return (
      <div className={ specClass }>
        <div className="ratings-wrapper">
          { stars }
        </div>
        <div className="post-details-wrapper">
          <span className="post-details-wrapper__userName">Author: { userName } </span>
          <p className="post-details-wrapper__title"><span className="elem-info">Title: </span>{ titleString }</p>
          <p className="post-details-wrapper__tags"><span className="elem-info">Tags: </span>{ tagsString }</p>
        </div>
      </div>
  );
};

export default PostItem;

PostItem.propTypes = {
  postData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    reactions: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    postActive: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ])
  }),
}

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
  console.log(comments, it);
}