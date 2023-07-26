import React, { useMemo } from "react";
import { nanoid } from "@reduxjs/toolkit";
import PropTypes from "prop-types";
import "./PostItem.scss";
import { usePostActive } from "../../hooks";

const PostItem = ({ data, starQnty }) => {
    const { postActive, viewed, setPostActive } = usePostActive();
    const { id, userId, title, reactions, tags, body } = data;
    const postData = {
        id,
        userId,
        title,
        body
    };
    const specClass = +id === +postActive.id ? "post-wrapper active" : "post-wrapper";
    const stars = useMemo(() => {
    return new Array(starQnty).fill("").map((e, index) => {
      const specClass = (index + 1) <= +reactions ? "material-icons icon icon_raiting icon_foxy" : "material-icons icon icon_raiting";
      return (
          <i className={ specClass } key={ nanoid() }>star_rate</i>
      );
    });
  }, [reactions]);

    const titleString = useMemo(() => {
    return title.slice(0, 70) + "...";
  }, [title]);

    const tagsString = useMemo(() => {
    return tags.join(", ");
  }, [tags]);

    return (
        <div
            className={ specClass }
            onClick={ () => setPostActive(postData) }
            aria-label="click to open the Post content"
        >
            <div className="ratings-wrapper">
                { stars }
            </div>
            <div className="post-details-wrapper">
                <span className="post-details-wrapper__userName">Author: { userId } </span>
                <p className="post-details-wrapper__title"><span className="elem-info">Title: </span>{ titleString }</p>
                <p className="post-details-wrapper__tags"><span className="elem-info">Tags: </span>{ tagsString }</p>
            </div>
        </div>
    );
};

export default PostItem;

PostItem.propTypes = {
    data: PropTypes.shape({
    id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    userId: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    title: PropTypes.string.isRequired,
    reactions: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    body: PropTypes.string.isRequired,
  }),
    starQnty: PropTypes.number.isRequired
};

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
  console.log(comments, it);
}