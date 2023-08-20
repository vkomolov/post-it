import React from "react";
import "./UserProfile.scss";
import { useUserProfile } from "../../hooks";

const UserProfile = () => {
  const { profile } = useUserProfile();

  log(profile, "profile:: ");



  return (
      <div className="profile-content">
        UserProfile
      </div>
  );
};

export default UserProfile;

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments = "value: ") {
  console.log(comments, it);
}