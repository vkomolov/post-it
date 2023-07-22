import React from "react";
import "./HeaderFilterBar.scss";

const HeaderFilterBar = () => {
  //false - sorting by title, true - sorting by user
  const userOrTitle = true; //TODO: to Reducer

  return (
    <div className="header__filter-bar">
      <span className="header__filter-bar__heading">Sort By: </span>
      <button className={ userOrTitle ? "button button_active" : "button" } >
        User
      </button>
      <button className={ userOrTitle ? "button" : "button button_active" } >
        Title
      </button>
      <i className="material-icons icon icon_login" title="Login" >login</i>
    </div>
  );
};

export default HeaderFilterBar;
