import React from "react";
import { Outlet } from "react-router-dom";
import AlertBlock from "../../components/AlertBlock";
import Header from "../../containers/Header";
import AsideBar from "../../containers/AsideBar";

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
