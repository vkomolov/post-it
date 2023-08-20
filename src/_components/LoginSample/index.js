import React from "react";
import CopyButton from "../CopyButton";

const LoginSample = () => {
  const loginRandom = {
    usernameSample: "kmeus4",
    passwordSample: "aUTdmmmbH"
  };

  return (
      <div className="login-sample-wrapper">
        <div className="login-sample-item">
          <span>username sample:</span>
          <CopyButton targetText={ loginRandom.usernameSample }>
            <i className="material-icons icon-copy small">content_copy</i>
          </CopyButton>
        </div>
        <div className="login-sample-item">
          <span>password sample:</span>
          <CopyButton targetText={ loginRandom.passwordSample }>
            <i className="material-icons icon-copy small">content_copy</i>
          </CopyButton>
        </div>
      </div>
  );
};

export default LoginSample;
