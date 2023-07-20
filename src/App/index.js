import React from "react";
import "./App.scss";
import Header from "../containers/Header";
import AsideBar from "../containers/AsideBar";
import ContentBar from "../containers/ContentBar";

export default function App() {

    return (
      <>
        <Header />
        <main>
            <AsideBar />
            <ContentBar />
        </main>
      </>
    );
}


///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}