import React from "react";
import "./Header.scss"
import HeaderFilterBar from "../HeaderFilterBar";

const MyComponent = () => {
  return (
    <header id="header">
      <div className="header__logo-bar">
        <h1 className="header__logo-bar__heading">POST IT</h1>
      </div>
      <HeaderFilterBar />
    </header>
  );
};

export default MyComponent;
