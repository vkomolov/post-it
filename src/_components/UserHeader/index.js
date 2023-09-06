import React from "react";
import * as PropTypes from "prop-types";
import "./UserHeader.scss";

const UserHeader = ({ firstName, lastName, imgSrc }) => {

  return (
      <div className="user-details-wrapper">
        <div className="image-wrapper">
          {
            imgSrc
                ? <img src={imgSrc} alt="user icon"/>
                : <i
                    className="material-icons icon icon_account_circle"
                >
                  account_circle
                </i>
          }
        </div>
        <p className="user-name">
          { firstName } {lastName}
        </p>
      </div>
  );
};

export default React.memo(UserHeader);

UserHeader.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  imgSrc: PropTypes.string,
};
