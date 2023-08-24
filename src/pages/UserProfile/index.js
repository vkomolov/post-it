import React  from "react";
import "./UserProfile.scss";
import { useUserProfile } from "../../hooks"
import ProfileInput from "../../_components/ProfileInput";


const UserProfile = () => {
  log("UserProfile renders...");
  const { isReadyData, imgSrc, inputGroups } = useUserProfile();

  const handleSubmit = e => {
    e.preventDefault();
  };


/*  const handleChange = ({ target }) => {
    const { name, value } = target;
    setInputs(state => ({
      ...state,
      [name]: value,
    }))
  };*/


  const defaultAvatar = (
      <i
          className="material-icons default-avatar"
      >
        account_circle
      </i>
  );

  return isReadyData && (
      <div className="profile-content" >
        <form
            name="profile-form"
            id="profile-form"
            action="#"
            onSubmit={ handleSubmit }
        >
          <div className="heading-layer">
            <div className="image-wrapper">
              {
                imgSrc
                    ? <img src={ imgSrc } alt="user avatar" />
                    : defaultAvatar
              }
            </div>
            <div className="heading-content">
              <ProfileInput profileData={ inputGroups.personal } />
              {/*<div className="grid-wrapper">
                <label className="input-label" htmlFor="firstName" >
                  First Name:
                </label>
                <input
                    id="firstName"
                    type="text"
                    name="firstName"
                    tabIndex={0}
                    aria-label="to edit first name"
                    title="edit first name"
                    minLength="3"
                    maxLength="20"
                    required
                    value={ inputs?.firstName || "" }
                    onChange={ handleChange }
                />
                <i
                    className="material-icons icon icon_undo"
                >
                  undo
                </i>
                <label className="input-label" htmlFor="lastName" >
                  Last Name:
                </label>
                <input
                    id="lastName"
                    type="text"
                    name="lastName"
                    tabIndex={0}
                    aria-label="to edit last name"
                    title="edit last name"
                    minLength="3"
                    maxLength="20"
                    required
                    value={ inputs?.lastName || "" }
                    onChange={ handleChange }
                />
                <i
                    className="material-icons icon icon_undo"
                >
                  undo
                </i>
                <label className="input-label" htmlFor="maidenName">
                  Maiden Name:
                </label>
                <input
                    id="maidenName"
                    type="text"
                    name="maidenName"
                    tabIndex={0}
                    aria-label="to edit maiden name"
                    title="edit maiden name"
                    minLength="3"
                    maxLength="20"
                    required
                    value={ inputs?.maidenName || "" }
                    onChange={ handleChange }
                />
                <i
                    className="material-icons icon icon_undo"
                >
                  undo
                </i>
                <label className="input-label" htmlFor="email">
                  Your email:
                </label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    tabIndex={0}
                    aria-label="to edit email"
                    title="edit email"
                    minLength="3"
                    maxLength="20"
                    required
                    value={ inputs?.email || "" }
                    onChange={ handleChange }
                />
                <i
                    className="material-icons icon icon_undo"
                >
                  undo
                </i>
                <label className="input-label" htmlFor="ip">
                  Your IP:
                </label>
                <input
                    id="ip"
                    type="text"
                    name="ip"
                    title="Your IP"
                    disabled={ true }
                    value={ inputs?.ip || "" }
                />
              </div>*/}
            </div>
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