import React from "react";
import "./App.scss";
import Header from "../containers/Header";
import AsideBar from "../containers/AsideBar";
import ContentBar from "../containers/ContentBar";
import AlertBlock from "../components/AlertBlock";

export default function App() {
    return (
        <>
            <AlertBlock />
            <Header />
            <main className="main-wrapper">
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