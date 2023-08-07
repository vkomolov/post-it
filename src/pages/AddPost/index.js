import React from "react";
import "./AddPost.scss";
import { Link, useLocation } from "react-router-dom";

export default AddPost;

function AddPost () {
  const location = useLocation();
  const fromLocation = location?.state?.from || "/";
  return (
      <div className="add-post-wrapper">
        <Link to={ fromLocation } replace={ true } >
          Cancel adding Your Post
        </Link>
        Adding Post
      </div>
  );
}


