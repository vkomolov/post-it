import React from "react";
import "./HeaderFilterBar.scss";
import { useSortingData } from "../../hooks";

const HeaderFilterBar = () => {
    //log("HeaderFilterBar renders...");

    const { stateSort, dispatchSorting } = useSortingData();
    const { sortPrimary } = stateSort;

    //log(sortSecondary, "sortSecondary in HeadFilterBar: ");

    const specClassObj = sortPrimary === "reactions" ? {
        userId: "button",
        reactions: "button button_active"
    } : {
        userId: "button button_active",
        reactions: "button"
    };

    return (
        <div className="header__filter-bar">
            <span className="header__filter-bar__heading">Sort By: </span>
            <button
                className={ specClassObj.userId }
                data-name="userId"
                onClick={ dispatchSorting }
            >
                User
            </button>
            <button
                className={ specClassObj.reactions }
                data-name="reactions"
                onClick={ dispatchSorting }
            >
                Raiting
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