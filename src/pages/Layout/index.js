import React from "react";
import { Outlet } from "react-router-dom";
import AlertBlock from "../../_components/AlertBlock";
import Header from "../../_containers/Header";
import AsideBar from "../../_containers/AsideBar";

import "./Layout.scss";

const Layout = () => {
  return (
      <>
        <AlertBlock />
        <Header />
        <main className="main-wrapper">
          <AsideBar />
          <div className="content-bar" >
            <Outlet />
          </div>
        </main>
      </>
  );
};

export default Layout;
