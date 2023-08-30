import React, { useCallback, useEffect, useRef, useState } from "react";
import "./UserProfile.scss";
import { useUserProfile } from "../../hooks";
import { deepCopy, getLastNestedObjectAndProp } from "../../_helpers";
import { PROFILE_PARAMS } from "../../_constants";
import InputRegular from "../../_components/InputRegular";
import InputRadio from "../../_components/InputRadio";

const UserProfile = () => {
  const { profile } = useUserProfile();

  //the state for the inputs, dynamically created from the nested object of values
  const [profileData, setProfileData] = useState(null);

  const [dataChanged, setDataChanged] = useState({});

  log(dataChanged, "dataChanged: ");

  const isDataChanged = useRef(!!Object.keys(dataChanged).length);

  //setting the state with the fetched profile data
  useEffect(() => {
    if (profile !== null) {
      //log(profile, "setting state with profile: ");
      setProfileData({ ...profile });
    }
  }, [profile]);

  useEffect(() => {
    log("dataChanged useEffect: ");

    isDataChanged.current = !!Object.keys(dataChanged).length;

    log(isDataChanged.current, "isDataChanged Ref: ");
  }, [dataChanged]);

  const imgSrc = profile?.image || null;

  const handleChange = useCallback((name, value) => {
    setProfileData(prevProfileData => {
      const keys = name.split("_");

      if (keys.length === 1) {
        //adding a new property to dataChanged state
        setDataChanged(prevData => ({
          ...prevData,
          [name]: value
        }));

        //returning an updated data:
        return {
          ...prevProfileData,
          [name]: value
        };
      } else {
        //if the data has a deep nesting of properties
        const rootProperty = keys[0];

        //making a deep cloning of the root state property avoiding the copy of the total state object
        const updatedRoot = deepCopy(prevProfileData[rootProperty]);

        //getting inner nested object with the final inner property for getting or setting the value
        //keys are sliced, as the rootProperty has taken keys[0]
        const [nestedObj, nestedProp] = getLastNestedObjectAndProp(updatedRoot, keys.slice(1));
        nestedObj[nestedProp] = value;

        //adding a new property to dataChanged state
        setDataChanged(prevData => ({
          ...prevData,
          [rootProperty]: updatedRoot
        }));

        //returning an updated data:
        return {
          ...prevProfileData,
          [rootProperty]: updatedRoot
        };
      }
    });
  }, []);

  const handleUndo = useCallback(({ target }) => {
    const { name } = target.dataset;

    setProfileData(prevProfileData => {
      const keys = name.split("_");

      //if root properties received with no nesting properties:
      if (keys.length === 1) {
        //removing the property from prevData state
        setDataChanged(prevData => {
          //taking out the property from the object of changed properties
          //const { name, ...newData } = prevData;
          const auxData = { ...prevData };
          delete auxData[name];

          return auxData;
        });

        //changing the value of the root property to the object with default values
        return {
          ...prevProfileData,
          [name]: profile[name],
        };
      } else {
        const rootProperty = keys[0];
        //making deep cloning of the root state property avoiding the copy of the total state object
        const updatedRoot = deepCopy(prevProfileData[rootProperty]);

        //getting inner nested object with the final inner property for getting or setting the value
        //keys are sliced, as the rootProperty has taken keys[0]
        const [nestedObj, nestedProp] = getLastNestedObjectAndProp(updatedRoot, keys.slice(1));

        //getting the reference to the original profile data
        const [nestedObjOrigin, nestedPropOrigin] = getLastNestedObjectAndProp(profile, keys);
        nestedObj[nestedProp] = nestedObjOrigin[nestedPropOrigin];

        setDataChanged(prevData => {
          const rootToUndo = deepCopy(prevData[rootProperty]);
          const [nestedObj, nestedProp] = getLastNestedObjectAndProp(rootToUndo, keys.slice(1));
          delete nestedObj[nestedProp];
          //Reflect.deleteProperty(nestedObj, nestedProp);

          return {
            ...prevData,
            [rootProperty]: rootToUndo
          }
        });


        return {
          ...prevProfileData,
          [rootProperty]: updatedRoot
        };
      }
    });

  }, [profile]);

  const handleSubmit = e => {
    e.preventDefault();
  };

  const defaultAvatar = (
      <i
          className="material-icons default-avatar"
      >
        account_circle
      </i>
  );

  return profileData && (
      <div className="profile-content">
        <form
            name="profile-form"
            id="profile-form"
            action="#"
            onSubmit={ handleSubmit }
        >
          <div className="profile-layer">
            <div className="image-section">
              <div className="image-wrapper">
                {
                  imgSrc
                      ? <img src={ imgSrc } alt="user avatar"/>
                      : defaultAvatar
                }
              </div>
              <div className="radio-wrapper">
                <InputRadio
                    paramObj={ PROFILE_PARAMS.gender }
                    profileValue={ profileData.gender }
                    handleChange={ handleChange }
                    handleUndo={ handleUndo }
                />
              </div>
            </div>
            <div className="heading-content">
              <div className="grid-wrapper">
                <InputRegular
                    paramObj={ PROFILE_PARAMS.firstName }
                    profileValue={ profileData.firstName }
                    handleChange={ handleChange }
                    handleUndo={ handleUndo }
                />
                <InputRegular
                    paramObj={ PROFILE_PARAMS.lastName }
                    profileValue={ profileData.lastName }
                    handleChange={ handleChange }
                    handleUndo={ handleUndo }
                />
                <InputRegular
                    paramObj={ PROFILE_PARAMS.maidenName }
                    profileValue={ profileData.maidenName }
                    handleChange={ handleChange }
                    handleUndo={ handleUndo }
                />
                <InputRegular
                    paramObj={ PROFILE_PARAMS.email }
                    profileValue={ profileData.email }
                    handleChange={ handleChange }
                    handleUndo={ handleUndo }
                />
                <InputRegular
                    paramObj={ PROFILE_PARAMS.ip }
                    profileValue={ profileData.ip }
                    handleChange={ handleChange }
                    handleUndo={ handleUndo }
                />
              </div>
            </div>
          </div>
          <div className="profile-layer">
            <h2 className="input-heading">Appearance</h2>
            <div className="grid-wrapper">
              <InputRegular
                  paramObj={ PROFILE_PARAMS.height }
                  profileValue={ profileData.height }
                  handleChange={ handleChange }
                  handleUndo={ handleUndo }
              />
              <InputRegular
                  paramObj={ PROFILE_PARAMS.weight }
                  profileValue={ profileData.weight }
                  handleChange={ handleChange }
                  handleUndo={ handleUndo }
              />
              <InputRegular
                paramObj={ PROFILE_PARAMS.eyeColor }
                profileValue={ profileData.eyeColor }
                handleChange={ handleChange }
                handleUndo={ handleUndo }
            />
            </div>
            <div className="grid-wrapper">
              <InputRegular
                  paramObj={ PROFILE_PARAMS.hair.color }
                  profileValue={ profileData.hair.color }
                  handleChange={ handleChange }
                  handleUndo={ handleUndo }
              />
              <InputRegular
                  paramObj={ PROFILE_PARAMS.hair.type }
                  profileValue={ profileData.hair.type }
                  handleChange={ handleChange }
                  handleUndo={ handleUndo }
              />
              <InputRegular
                  paramObj={ PROFILE_PARAMS.birthDate }
                  profileValue={ profileData.birthDate }
                  handleChange={ handleChange }
                  handleUndo={ handleUndo }
              />
            </div>
          </div>
          <div className="profile-layer">
            <h2 className="input-heading">Personal Address</h2>
            <div className="grid-wrapper">
              <InputRegular
                  paramObj={ PROFILE_PARAMS.address.address }
                  profileValue={ profileData.address.address }
                  handleChange={ handleChange }
                  handleUndo={ handleUndo }
              />
              <InputRegular
                  paramObj={ PROFILE_PARAMS.address.city }
                  profileValue={ profileData.address.city }
                  handleChange={ handleChange }
                  handleUndo={ handleUndo }
              />
              <InputRegular
                  paramObj={ PROFILE_PARAMS.address.postalCode }
                  profileValue={ profileData.address.postalCode }
                  handleChange={ handleChange }
                  handleUndo={ handleUndo }
              />
            </div>
          </div>
          <div className="profile-layer">
            <h2 className="input-heading">Company Details</h2>
            <div className="grid-wrapper">
              <InputRegular
                  paramObj={ PROFILE_PARAMS.company.name }
                  profileValue={ profileData.company.name }
                  handleChange={ handleChange }
                  handleUndo={ handleUndo }
              />
              <InputRegular
                  paramObj={ PROFILE_PARAMS.company.title }
                  profileValue={ profileData.company.title }
                  handleChange={ handleChange }
                  handleUndo={ handleUndo }
              />
              <InputRegular
                  paramObj={ PROFILE_PARAMS.company.department }
                  profileValue={ profileData.company.department }
                  handleChange={ handleChange }
                  handleUndo={ handleUndo }
              />
            </div>
            <div className="grid-wrapper">
              <InputRegular
                  paramObj={ PROFILE_PARAMS.company.address.address }
                  profileValue={ profileData.company.address.address }
                  handleChange={ handleChange }
                  handleUndo={ handleUndo }
              />
              <InputRegular
                  paramObj={ PROFILE_PARAMS.company.address.city }
                  profileValue={ profileData.company.address.city }
                  handleChange={ handleChange }
                  handleUndo={ handleUndo }
              />
              <InputRegular
                  paramObj={ PROFILE_PARAMS.company.address.postalCode }
                  profileValue={ profileData.company.address.postalCode }
                  handleChange={ handleChange }
                  handleUndo={ handleUndo }
              />
            </div>
          </div>
          <div className="profile-layer">
            <h3 className="input-heading">Payment Card Details</h3>
            <div className="grid-wrapper">
              <InputRegular
                  paramObj={ PROFILE_PARAMS.bank.cardNumber }
                  profileValue={ profileData.bank.cardNumber }
                  handleChange={ handleChange }
                  handleUndo={ handleUndo }
              />
              <InputRegular
                  paramObj={ PROFILE_PARAMS.bank.cardType }
                  profileValue={ profileData.bank.cardType }
                  handleChange={ handleChange }
                  handleUndo={ handleUndo }
              />
              <InputRegular
                  paramObj={ PROFILE_PARAMS.bank.currency }
                  profileValue={ profileData.bank.currency }
                  handleChange={ handleChange }
                  handleUndo={ handleUndo }
              />
            </div>
            <div className="grid-wrapper">
              <InputRegular
                  paramObj={ PROFILE_PARAMS.bank.cardExpire }
                  profileValue={ profileData.bank.cardExpire }
                  handleChange={ handleChange }
                  handleUndo={ handleUndo }
              />
              <InputRegular
                  paramObj={ PROFILE_PARAMS.bank.iban }
                  profileValue={ profileData.bank.iban }
                  handleChange={ handleChange }
                  handleUndo={ handleUndo }
              />
            </div>
          </div>
          <div className="button-wrapper">
            <button
                className={ isDataChanged.current
                    ? "button button_enabled"
                    : "button button_disabled" }
            >
              Submit
            </button>
          </div>
        </form>
      </div>
  );
};

export default UserProfile;

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments = "value: ") {
  console.log(comments, it);
}