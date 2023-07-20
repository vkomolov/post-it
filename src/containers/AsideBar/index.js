import React from "react";
import "./AsideBar.scss";
import AsideBarControls from "../AsideBarControls";
import PostsWrapper from "../PostsWrapper";

const AsideBar = () => {
  return (
    <div className="aside-bar">
      <AsideBarControls />
      <PostsWrapper />
    </div>
  );
};

export default AsideBar;
