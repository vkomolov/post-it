import React from "react";
import "./HeaderFilterBar.scss";
import { useSortingData } from "../../hooks";

const HeaderFilterBar = () => {
    //log("HeaderFilterBar renders...");

    const [sortState, dispatchSorting] = useSortingData();
    const { sortSecondary } = sortState;
    const specClassObj = sortSecondary === "title" ? {
        userName: "button",
        title: "button button_active"
    } : {
        userName: "button button_active",
        title: "button"
    };

    return (
        <div className="header__filter-bar">
            <span className="header__filter-bar__heading">Sort By: </span>
            <button
                className={ specClassObj.userName }
                data-name="userName"
                onClick={ dispatchSorting }
            >
                User
            </button>
            <button
                className={ specClassObj.title }
                data-name="title"
                onClick={ dispatchSorting }
            >
                Title
            </button>
            <i
                className="material-icons icon icon_login"
                title="Login"
                data-name="login"
            >
                login
            </i>
        </div>
    );
};

export default HeaderFilterBar;


///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}