import React from "react";
import "./HeaderFilterBar.scss";
import { useSortingData } from "../../hooks";
import LoginButton from "../../_components/LoginButton";

const HeaderFilterBar = () => {
  const { stateSort, dispatchSorting } = useSortingData();
  const { sortPrimary } = stateSort;

  const specClassObj = sortPrimary === "reactions" ? {
    firstName: "button",
    reactions: "button button_active"
  } : {
    firstName: "button button_active",
    reactions: "button"
  };

  return (
      <div className="header__filter-bar">
        <span className="header__filter-bar__heading">Sort By: </span>
        <button
            className={ specClassObj.firstName }
            data-name="firstName"
            onClick={ dispatchSorting }
        >
          Author
        </button>
        <button
            className={ specClassObj.reactions }
            data-name="reactions"
            onClick={ dispatchSorting }
        >
          Raiting
        </button>
        <LoginButton />
      </div>
  );
};

export default HeaderFilterBar;


///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments = "value: ") {
  console.log(comments, it);
}