import React from "react";
import "./PostContentItem.scss";
import PropTypes from "prop-types";

/*const temp = {
  "id": 8,
  "title": "One can cook on and with an open fire.",
  "body": "One can cook on and with an open fire. These are some of the ways to cook with fire outside. Cooking meat using a spit is a great way to evenly cook meat. In order to keep meat from burning, it's best to slowly rotate it.",
  "userId": 31,
  "firstName": "Luciano",
  "lastName": "Sauer",
  "image": "https://robohash.org/rerumfugiatamet.png"
};*/

//re-rendering PostContentItem on changing only postActive props
const PostContentItem = ({ postActive }) => {
    log("PostContentItem renders...");

    //TODO: userId for checking login userId...
    const { userId, title, body, firstName, lastName, image } = postActive;

    return (
        <div className="post-content-item-wrapper">
            <div className="user-details-wrapper">
                <div className="image-wrapper">
                    <img src={ image } alt="user icon" />
                </div>
                <p className="user-name">
                    { firstName } {lastName}
                </p>
            </div>
            <h1 className="post-title">{ title }</h1>
            <p className="post-body">{ body }</p>
        </div>
    );
};

//avoiding re-rendering on changing comments at PostContent
export default React.memo(PostContentItem);

PostContentItem.propTypes = {
    postActive: PropTypes.shape({
        title: PropTypes.string,
        body: PropTypes.string,
        userId: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        image: PropTypes.string,
    }),
};

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}