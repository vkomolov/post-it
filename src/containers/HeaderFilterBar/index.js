import React from "react";
import "./HeaderFilterBar.scss";

const HeaderFilterBar = () => {
  return (
    <div className="header__filter-bar">
      <span className="header__filter-bar__heading">Sort By: </span>
      <button className="button" >User</button>
      <button className="button button_active" >Post</button>
      <i className="material-icons icon icon_login" title="Login" >login</i>
    </div>
  );
};

export default HeaderFilterBar;
