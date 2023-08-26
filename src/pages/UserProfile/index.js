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
          <div className="profile-layer">
            <div className="image-wrapper">
              {
                imgSrc
                    ? <img src={ imgSrc } alt="user avatar" />
                    : defaultAvatar
              }
            </div>
            <div className="heading-content">
              <ProfileInput profileData={ inputGroups.personal } />
            </div>
          </div>
          <h3>Appearance, Gender, Age</h3>
          <div className="profile-layer">
            <ProfileInput profileData={ inputGroups.appearance } />
            <ProfileInput profileData={ inputGroups.genderAndAge } />
          </div>
          <h3>Personal Address, Company Details</h3>
          <div className="profile-layer">
            <ProfileInput profileData={ inputGroups.address } />
            <ProfileInput profileData={ inputGroups.company } />
          </div>
          <h3>Payment Card Details</h3>
          <div className="profile-layer">
            <ProfileInput profileData={ inputGroups.bank } />
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