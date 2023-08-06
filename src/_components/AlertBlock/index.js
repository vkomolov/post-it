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
        const classNameSpec = alertType === "error" ? "alert-error" : "alert-loading";
        //looking for the alert text content...
        const contentArr = alertContent.length
            ? alertContent.map(text => (
                <span className="alert-text" key={nanoid()} >
                    { text }
                </span>
            ))
            : [];

        return (
            <div id="alert-wrapper">
                <div
                    className={ `alert-block ${ classNameSpec }` }
                    role="alert"
                >
                    { classNameSpec === "alert-loading"
                    && <span className="loader" /> }
                    <div className="alert-content-block">
                        { contentArr }
                    </div>
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

