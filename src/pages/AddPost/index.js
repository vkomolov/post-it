import React, { useEffect, useState } from "react";
import "./AddPost.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UserHeader from "./../../_components/UserHeader"
import { useAddPost, useScaleUpFromZero } from "../../hooks";


function AddPost () {
  const location = useLocation();
  const fromLocation = location?.state?.from || "/";
  const navigate = useNavigate();

  //it makes animation for the form wrapper
  const refAnimation = useScaleUpFromZero(450);

  const { profile, dispatchCreatePost } = useAddPost();
  const userId = profile?.id || null;
  const userImgSrc = profile?.image || null;
  const firstName = profile?.firstName || null;
  const lastName = profile?.lastName || null;

  const initialState = {
    userId,
  };
  const [postData, setPostData] = useState({});


  useEffect(() => {
    if (profile && profile.id) {
      const userId = profile.id;
      setPostData(prevState => ({
        ...prevState,
        userId
      }));
    }
  }, [profile]);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setPostData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if ("title" in postData
        && postData["title"].length
        && "body" in postData
        && postData["body"].length
    ) {
      dispatchCreatePost(postData);

      navigate(fromLocation, { replace: true });
    }
  };

  const handleButton = ({ target }) => {
    if (target.type === "reset") {
      setPostData(initialState);
    }
  };

  const buttonSpecClass = (postData?.title && postData?.body)
      ? "button button_enabled"
      : "button button_disabled";


  return (
      <div className="add-post-wrapper" ref={ refAnimation } >
        <UserHeader
            firstName={ firstName }
            lastName={ lastName }
            imgSrc={ userImgSrc }
        />
        <h1 className="form-heading">New Post</h1>
        <form onSubmit={ handleSubmit } >
          <h3 className="form-heading subheading">Post Title: </h3>
          <textarea
              name="title"
              className="text-area text-area_title"
              tabIndex={0}
              aria-label="write the title of the post"
              placeholder="Write the title of the post"
              value={ postData?.title || "" }
              onChange={ handleChange }
          />
          <h3 className="form-heading subheading">Post: </h3>
          <textarea
              name="body"
              className="text-area text-area_body"
              tabIndex={0}
              aria-label="write the text of the post"
              placeholder="Write the text of the post"
              value={ postData?.body || "" }
              onChange={ handleChange }
          />
          <div className="buttons-wrapper">
            <button
                type="reset"
                className={ `${ buttonSpecClass } button_reset` }
                onClick={ handleButton }
            >
              Reset
            </button>
            <button
                className={ buttonSpecClass }
            >
              Submit
            </button>
          </div>
          <Link
              to={ fromLocation }
              replace={ true }
              className="link-cancel"
          >
            Cancel Post...
          </Link>
        </form>
      </div>
  );
}

export default AddPost;

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments = "value: ") {
  console.log(comments, it);
}
