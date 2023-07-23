import React from "react";
import "./AsideBarControls.scss";
import { useSortingData } from "../../hooks";

const AsideBarControls = () => {
    const [sortState, dispatchSorting] = useSortingData();
  //false - sorting by latest, true - sorting by raiting
    const { sortPrimary } = sortState;

  const specClassObj = sortPrimary === "reactions" ? {
    latest: "button",
    rating: "button button_active"
  } : {
    latest: "button button_active",
    rating: "button"
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
                  className={ specClassObj.rating }
                  data-name="reactions"
                  onClick={ dispatchSorting }
              >
                  Raiting
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