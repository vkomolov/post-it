import React from "react";
import "./AsideBarControls.scss";

const AsideBarControls = () => {
  //false - sorting by latest, true - sorting by raiting
  const byRaiting = true; //TODO: to Reducer
  const specClassObj = byRaiting ? {
    latest: "button",
    rating: "button button_active"
  } : {
    latest: "button button_active",
    rating: "button"
  };

  return (
    <div className="aside-bar__controls">
      <div className="aside-bar__controls__buttons">
        <button className={ specClassObj.latest } >Latest</button>
        <button className={ specClassObj.rating } >Raiting</button>
      </div>
      <div className="aside-bar__controls__handles">
        <i className="material-icons icon icon_add" title="Add Post">add</i>
        <i className="material-icons icon icon_delete" title="Delete Post">delete</i>
      </div>
    </div>
  );
};

export default AsideBarControls;
