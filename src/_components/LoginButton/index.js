import React, { useState } from "react";
import "./LoginButton.scss";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../../hooks";

const LoginButton = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { loggedUser, clearAuthState } = useAuth();
  const [isMenuShown, setMenuShown] = useState(false);

  const handleClick = ({ currentTarget }) => {
    const targetName = currentTarget?.dataset?.name || null;

    if (targetName) {
      if (targetName === "login") {
        navigate("/login", {
          replace: true,
          state: {
            from: location
          }
        });
      } else {
        if (targetName === "logout") {
          clearAuthState();
          //navigating from protected pages and special pages like LoginForm, AddPost, UserProfile
          navigate("/", { replace: true });
        }
        setMenuShown(state => !state);
      }
    }
  };

  const handleKeyEvent = e => {
    if (e.key === "Enter") {
      handleClick(e);
    }
  };

  if (!loggedUser) {
    return (
        <i
            className="material-icons icon icon_login"
            role="button"
            tabIndex={0}
            aria-label="click to log in"
            title="Log in"
            data-name="login"
            onClick={handleClick}
            onKeyPress={handleKeyEvent}
        >
          login
        </i>
    )
  } else {
    const image = loggedUser?.image || null;

    return (
        <div className="profile-menu-wrapper">
          <div className="profile-icon-wrapper"
               role="button"
               tabIndex={0}
               data-name="profile"
               title="Click to open profile menu"
               aria-label="to open profile menu"
               onClick={handleClick}
               onKeyPress={handleKeyEvent}
          >
            {
              image
                  ? <img src={image} alt="user icon"/>
                  : <i
                      className="material-icons icon icon_account_circle"
                  >
                    account_circle
                  </i>
            }
          </div>
          {
            isMenuShown
            && <ul className="profile-menu" role="menu">
              <li
                  role="menuitem"
                  aria-label="Click to User Profile details"
                  tabIndex={0}
                  data-name="profileLink"
                  title="Click to User Profile details"
                  onClick={handleClick}
                  onKeyPress={handleKeyEvent}
              >
                <Link
                    to="/profile"
                    className="profile-menu__link"
                >
                  User Profile Details
                </Link>
                <hr/>
              </li>
              <li
                  role="menuitem"
                  aria-label="to log out"
                  tabIndex={0}
                  data-name="logout"
                  title="Click to log out"
                  onClick={handleClick}
                  onKeyPress={handleKeyEvent}
              >
                <span className="profile-menu__logout" >
                  Log out
                  <i className="material-icons" >
                    logout
                  </i>
                </span>
                <hr/>
              </li>
            </ul>
          }
        </div>
    )
  }

};

export default LoginButton;

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments = "value: ") {
  console.log(comments, it);
}