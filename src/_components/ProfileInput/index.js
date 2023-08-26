import React, { useMemo, useState } from "react";
import * as PropTypes from "prop-types";
import { nanoid } from "@reduxjs/toolkit";
import "./ProfileInput.scss";
import { PROFILE_PARAMS } from "../../_constants";
import InputRegular from "../InputRegular";
import InputRadio from "../InputRadio";

function iterateProfileData(profileData, profileParams, handleChange, handleUndo, parent = null) {
  log(profileData, "profileData at iterateProfileData: ");
  log(parent, "parent: ");

  if (profileData && Object.keys(profileData).length) {

    return Object.keys(profileData).reduce((acc, dataKey) => {
      const profileValue = profileData[dataKey];

      //checking is key of the profile data in profile params
      if (dataKey in profileParams) {
        const paramObj = profileParams[dataKey];

        if (typeof profileValue === "string" || typeof profileValue === "number") {
          log(profileValue, "string or number");
          log(!parent ? dataKey : parent + "_" + dataKey, "name: ");

          //if it is the lowest nesting of profileParams with the params of the input and "editable" property
          if ("editable" in paramObj) {
            //in order to give the iterable key to the component

            return acc.concat(
                <InputRegular
                    key={ nanoid() }
                    inputData={{ dataKey, paramObj, profileValue, parent }}
                    handleChange={ handleChange }
                    handleUndo={ handleUndo }
                />
            );
          }
          else if (dataKey === "gender") {
            return acc.concat(
                <InputRadio
                    key={ nanoid() }
                    inputData={{ dataKey, paramObj, profileValue, parent }}
                    handleChange={ handleChange }
                    handleUndo={ handleUndo }
                />,
            );
          }
          else {
            return acc;
          }
        }
        //if profile data has inner nesting of properties with values
        else if (typeof profileValue === "object" && Object.keys(profileValue).length) {
          log(profileValue, "is object: ");

          return acc.concat(
              iterateProfileData(
                  profileValue,
                  paramObj,
                  handleChange,
                  handleUndo,
                  parent=`${ dataKey }`)
          );
        }
        else {
          return acc;
        }
      }

      return acc;
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

    return inputs && (
        <div className="grid-wrapper">
          { inputs }
        </div>
    );
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
