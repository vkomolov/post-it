import React, { useMemo } from "react";
import CopyButton from "../CopyButton";
import { randomizeInt } from "../../_helpers";
import { useUsers } from "../../hooks";

const LoginSample = () => {
  const { users } = useUsers();
  const loginRandom = useMemo(() => {
    const randomIndex =  users.length ? randomizeInt(0, users.length-1) : -1;
    return randomIndex >= 0 ? {
      usernameSample: users[randomIndex].username,
      passwordSample: users[randomIndex].password
    } : null;
  }, [users]);

  return loginRandom && (
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
