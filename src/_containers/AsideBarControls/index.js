import React from "react";
import "./AsideBarControls.scss";
import { Link } from "react-router-dom";
import { useSortingData } from "../../hooks";
import { useSelector } from "react-redux";

const AsideBarControls = () => {
  const { stateSort, dispatchSorting } = useSortingData();
  //false - sorting by latest, true - sorting by raiting
  const { sortSecondary, filterBy } = stateSort;
  const { loggedUser } = useSelector(state => state.stateAuth);
  const userIdLogged = loggedUser?.id || null;
  const userIdImgSrc = loggedUser?.image || null;

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

  const avatarDataName = filterBy  ? "filterReset" : userIdLogged;
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
            <i className="material-icons icon icon_add" >add</i>
          </Link>
          <i
              className="material-icons icon icon_delete"
              role="button"
              aria-label="click to delete Post, need login"
              tabIndex={ 0 }
              title="Delete Post, need login"
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