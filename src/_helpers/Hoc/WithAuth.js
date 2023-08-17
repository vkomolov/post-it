import React from "react";
import * as PropTypes from "prop-types";
import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../../hooks";

export default WithAuth;

function WithAuth({ children }) {
  const location = useLocation();
  const { loggedUser } = useAuth();

  if (!loggedUser) {
    return <Navigate to="/login" state={{ from: location }} />
  }

  return children;
}

WithAuth.propTypes = {
  children: PropTypes.element
};

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments = "value: ") {
  console.log(comments, it);
}

