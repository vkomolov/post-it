import React from "react";
import "./Header.scss"
import HeaderFilterBar from "../HeaderFilterBar";

const Header = () => {

  return (
    <header id="header">
      <div className="header__logo-bar">
        <h1 className="header__logo-bar__heading">POST IT</h1>
      </div>
      <HeaderFilterBar />
    </header>
  );
};

export default Header;

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments = "value: ") {
  console.log(comments, it);
}