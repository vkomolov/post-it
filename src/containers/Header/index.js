import React from "react";
import "./Header.scss"

const MyComponent = () => {
  return (
    <header id="header">
      <div className="header__logo-bar">
        <h1 className="header__logo-bar__heading">POST IT</h1>
      </div>
      <div className="header__filter-bar">
        <span className="header__filter-bar__heading">Sort By: </span>
        <button className="button" >User</button>
        <button className="button button_active" >Post</button>
        <button className="button button_sign-in">Sign In</button>
      </div>
    </header>
  );
};

export default MyComponent;
