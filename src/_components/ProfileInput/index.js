import React, { useMemo } from "react";
import * as PropTypes from "prop-types";
import { nanoid } from "@reduxjs/toolkit";
import "./ProfileInput.scss";
import { PROFILE_PARAMS } from "../../_constants";

function iterateProfileData(profileData, profileParams, handleChange, handleUndo, parent = null) {
  log(profileData, "profileData at iterateProfileData: ");

  if (profileData && Object.keys(profileData).length) {
    return Object.keys(profileData).reduce((acc, dataKey) => {
      if (typeof profileData[dataKey] === "string" || typeof profileData[dataKey] === "number") {
        if (dataKey in profileParams) {
          const prop = profileParams[dataKey];
          //if it is the lowest nesting with the params of the input, which has "editable" property
          if ("editable" in prop) {
            const InputBlock = () => (
                <>
                  <label
                      className="input-label"
                      htmlFor={ dataKey }
                  >
                    { prop["label"] }:
                  </label>
                  <input
                      id={ dataKey }
                      type={ prop["type"] }
                      name={ !parent ? dataKey : parent + "_" + dataKey }
                      tabIndex={ 0 }
                      aria-label={ prop["title"] }
                      title={ prop["title"] }
                      /*TODO: to use useState*/
                      value={ profileData[dataKey] || "" }
                      /*if disabled, onChange will not work*/
                      onChange={ handleChange }
                      disabled={ !prop["editable"] }
                      required
                  />
                  {
                    prop["editable"] && <i
                        className="material-icons icon icon_undo"
                        data-name={ !parent ? dataKey : parent + "_" + dataKey }
                        role="button"
                        tabIndex={ 0 }
                        aria-label="to undo changes"
                        title="to undo changes"
                        onClick={ handleUndo }
                    >
                      undo
                    </i>
                  }
                </>
            );

            return acc.concat(<InputBlock key={ nanoid() }/>);
          }
          //TODO: gender is radio with two properties which are values in profileData[dataKey] (one of them)
          return acc;
        }
        //if no property dataKey in  profileParams
        return acc;
      }
      //TODO: if profileData[dataKey] is object with the properties then to recursive the function
      else {
        return acc.concat(
            iterateProfileData(profileData[dataKey], profileParams[dataKey], handleChange, handleUndo)
        );
      }
    }, []);
  }

  return null;
}

const ProfileInput = ({ profileData }) => {

  const handleChange = ({ target }) => {
    log("changing input");
  };

  const handleUndo = ({ target }) => {
    log("clicked undo");
  };


  return useMemo(() => {
    const inputs = iterateProfileData(profileData, PROFILE_PARAMS, handleChange, handleUndo);
    if (inputs.length) {
      return (
          <div className="grid-wrapper">
            { inputs }
          </div>
      );
    }

    return null;
  }, [profileData]);

};

export default ProfileInput;

ProfileInput.propTypes = {
  profileData: PropTypes.object,
};

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments = "value: ") {
  console.log(comments, it);
}
