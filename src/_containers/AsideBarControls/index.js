import React, { useMemo } from "react";
import "./AsideBarControls.scss";
import { Link, useNavigate } from "react-router-dom";
import { usePostControls } from "../../hooks";

const AsideBarControls = () => {
  const navigate = useNavigate();
  const {
    isUserPost, userIdLogged, sortSecondary, postActiveId,
    dispatchSorting, filterBy, userIdImgSrc, dispatchCreatePost, dispatchDeletePost
  } = usePostControls();

  const deleteButtonClass = isUserPost
      ? "material-icons icon icon_delete"
      : "material-icons icon icon_delete disabled";

  const addButtonClass = userIdLogged
      ? "material-icons icon icon_add"
      : "material-icons icon icon_add disabled";

  const specClassObj = sortSecondary === "title" ? {
    latest: "button",
    title: "button button_active"
  } : {
    latest: "button button_active",
    title: "button"
  };

  const handleKeyEvent = e => {
    if (e.key === "Enter") {
      dispatchSorting(e);
    }
  };

  const handleDelete = () => {
    //if userId of the active post equals the logged user`s id
    if (isUserPost) {
      dispatchDeletePost(postActiveId);
      //on deleting the active post to navigate to the root path
      navigate("/", { replace: true });
    }
  };
  const handleKeyDelete = e => {
    if (e.key === "Enter") {
      handleDelete();
    }
  };

  const avatarDataName = filterBy ? "filterReset" : userIdLogged;
  const avatarClassNameSpec = filterBy ? "avatar-wrapper active" : "avatar-wrapper";

  const avatarButton = userIdLogged
      ? (
          <div
              className={ avatarClassNameSpec }
              role="button"
              aria-label="to filter posts by userId"
              title="to filter posts by userId"
              tabIndex={ 0 }
              data-name={ avatarDataName }
              onClick={ dispatchSorting }
              onKeyPress={ handleKeyEvent }
          >
            <img src={ userIdImgSrc } alt="logged user avatar"/>
          </div>
      )
      : null;


  return (
      <div className="aside-bar__controls">
        <div className="aside-bar__controls__buttons">
          <button
              className={ specClassObj.latest }
              data-name="id"
              tabIndex={ 0 }
              title="Click to sort by latest"
              aria-label="Click to sort by latest"
              onClick={ dispatchSorting }
          >
            Latest
          </button>
          <button
              className={ specClassObj.title }
              data-name="title"
              tabIndex={ 0 }
              title="Click to sort by title"
              aria-label="Click to sort by title"
              onClick={ dispatchSorting }
          >
            Title
          </button>
        </div>
        <div className="aside-bar__controls__handles">
          { avatarButton }
          <Link
              to="/add"
              title="Add Post, need login"
              aria-label="click to add Post, need login"
              tabIndex={ 0 }
          >
            <i className={ addButtonClass }>add</i>
          </Link>
          <i
              className={ deleteButtonClass }
              role="button"
              aria-label="click to delete Post, need login"
              tabIndex={ 0 }
              title="Delete Post, need login"
              onClick={ handleDelete }
              onKeyPress={ handleKeyDelete }
          >
            delete
          </i>
        </div>
      </div>
  );
};

export default AsideBarControls;

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments = "value: ") {
  console.log(comments, it);
}