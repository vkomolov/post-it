import React from "react";
import "./App.scss";
import Header from "../containers/Header";
import AsideBar from "../containers/AsideBar";
import ContentBar from "../containers/ContentBar";
import { useAlertData } from "../hooks";
import AlertBlock from "../components/AlertBlock";

export default function App() {
    const { stateAlerts } = useAlertData();


    return (
        <>
            { stateAlerts.alertType && <AlertBlock { ...{ stateAlerts } } /> }
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