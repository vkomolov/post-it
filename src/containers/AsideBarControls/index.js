import React from "react";
import "./AsideBarControls.scss";

const AsideBarControls = () => {
  return (
    <div className="aside-bar__controls">
      <div className="aside-bar__controls__buttons">
        <button className="button" >Latest</button>
        <button className="button button_active" >Raiting</button>
      </div>
      <div className="aside-bar__controls__handles">
        <i className="material-icons icon icon_add" title="Add Post">add</i>
        <i className="material-icons icon icon_delete" title="Delete Post">delete</i>
      </div>
    </div>
  );
};

export default AsideBarControls;
