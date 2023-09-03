import React from "react";
import "./AddPost.scss";
import { Link, useLocation } from "react-router-dom";



function AddPost () {
  const location = useLocation();
  const fromLocation = location?.state?.from || "/";

  const handleSubmit = (e) => {
    e.preventDefault();


  };

  return (
      <div className="add-post-wrapper">
        <form onSubmit={ handleSubmit }>

        </form>
        <Link to={ fromLocation } replace={ true } >
          Cancel adding Your Post
        </Link>
        Adding Post
      </div>
  );
}

export default AddPost;


