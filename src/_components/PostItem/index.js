import React, { useEffect, useMemo } from "react";
import { nanoid } from "@reduxjs/toolkit";
import PropTypes from "prop-types";
import { useParams, useNavigate } from "react-router-dom";

import "./PostItem.scss";
import { usePostActive } from "../../hooks";
import { limitSentence } from "../../_helpers";

const PostItem = ({ data, starQnty }) => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const { viewed, setPostActive } = usePostActive();

  const { id, firstName, lastName, title, reactions, tags } = data;

  /**
   * Motivation for useEffect:
   * If the post is clicked, then it could be worth to dispatch the data of the clicked post
   * to activePostReducer directly, like onClick={() => setPostActive(data)}, then to navigate to /:postId
   * for PostContent to render and to get the data of the active post from activePostReducer
   * BUT, in case of hard reloading of the page with path/:postId, or
   * loading the App with a specific path/:postId without clicking a particular post from the list of post,
   * in this case sagasPosts does not take the action of setPostActive(data) and PostContent does not get
   * the data of the active post for demonstration.
   * That is why, it is solved with the following:
   * - on click event from the particular post it will navigate path to /:postId of the clicked post;
   * - then, if useParams() gets the property postId, the data of the particular Post, with the same postId,
   * will be dispatched to sagasPosts for updating activePostReducer and loading comments of the post...
   */
  useEffect(() => {
    if (postId && +postId === +data.id) {
      setPostActive(data);
    }
  }, [data, postId, setPostActive]);

  //if the post is already viewed before then to separately style it...
  const specViewedClass = (viewed.includes(id)) ? "post-wrapper viewed" : "post-wrapper";

  //if the post is active then to separately style it, else to style as specViewedClass
  const specClass = +id === +postId ? "post-wrapper active" : specViewedClass;

  //raiting stars of the post
  const stars = useMemo(() => {
    return new Array(starQnty).fill("").map((e, index) => {
      const specClass = (index + 1) <= +reactions
          ? "material-icons icon icon_raiting icon_foxy"
          : "material-icons icon icon_raiting";
      return (
          <i className={specClass} key={nanoid()}>star_rate</i>
      );
    });
      }, [reactions, starQnty]
  );

  const titleString = useMemo(() => {
    return limitSentence(title, 55);
  }, [title]);
  const tagsString = useMemo(() => {
    return tags.join(", ");
  }, [tags]);

  //as the element is not interactive, to use handling of keyboard events...
  const handleKeyEvent = e => {
    if (e.key === "Enter") {
      navigate(`/${ id }`);
    }
  };

  return (
      <div
          className={ specClass }
          onClick={ () => navigate(`/${ id }`) }
          onKeyPress={ handleKeyEvent }
          aria-label="click to open the Post content"
          role="menuitem"
          tabIndex={ 0 }
          title="Open the Post"
      >
        <div className="ratings-wrapper">
          { stars }
        </div>
        <div className="post-details-wrapper">
          <span
              className="post-details-wrapper__userName"
          >
            Author: { `${ firstName } ${ lastName }` }
          </span>
          <p className="post-details-wrapper__title">
            <span className="elem-info">Title: </span>{ titleString }
          </p>
          <p className="post-details-wrapper__tags">
            <span className="elem-info">Tags: </span>{ tagsString }
          </p>
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
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    reactions: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    body: PropTypes.string.isRequired,
  }),
  starQnty: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired
};

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments = "value: ") {
  console.log(comments, it);
}