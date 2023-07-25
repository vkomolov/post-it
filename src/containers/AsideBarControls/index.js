import React from "react";
import "./AsideBarControls.scss";
import { useSortingData } from "../../hooks";

const AsideBarControls = () => {
    const [stateSort, dispatchSorting] = useSortingData();
  //false - sorting by latest, true - sorting by raiting
    const { sortSecondary } = stateSort;

  const specClassObj = sortSecondary === "title" ? {
    latest: "button",
    title: "button button_active"
  } : {
    latest: "button button_active",
      title: "button"
  };

  return (
      <div className="aside-bar__controls">
          <div className="aside-bar__controls__buttons">
              <button
                  className={ specClassObj.latest }
                  data-name="id"
                  onClick={ dispatchSorting }
              >
                  Latest
              </button>
              <button
                  className={ specClassObj.title }
                  data-name="title"
                  onClick={ dispatchSorting }
              >
                  Title
              </button>
          </div>
          <div className="aside-bar__controls__handles">
              <i className="material-icons icon icon_add" title="Add Post">add</i>
              <i className="material-icons icon icon_delete" title="Delete Post">delete</i>
          </div>
      </div>
  );
};

export default AsideBarControls;

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}