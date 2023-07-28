import React, { useMemo } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { useAlertData } from "../../hooks";
import "./AlertBlock.scss";

export default function AlertBlock() {
    const { stateAlerts } = useAlertData();
    const { alertType, alertContent } = stateAlerts;

    return useMemo(() => {
        if (!alertType) return null;

        //only two options for now
        const classNameOut = alertType === "error" ? "alert-error" : "alert-loading";
        //looking for the alert text content...
        let contentArr = [];
        if (alertContent.length) {
            contentArr = alertContent.map(text => (
                <span className={ classNameOut } key={nanoid()} >
                    { text }
                </span>
            ));
        }

        return (
            <div id="alert-block">
                <div
                    className="alert-content-block"
                    role="alert"
                >
                    { classNameOut === "alert-loading"
                    && <span className="loader" /> }
                    { contentArr }
                </div>
            </div>
        );
    }, [alertType, alertContent]);
}




/////////////////   dev
//  eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}

