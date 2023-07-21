import React from "react";
import "./ContentBar.scss";
import PostContent from "../../components/PostContent";

const postData = {
  //postID
  id: 1,
  userId: 5,
  body: "His mother had always taught him not to ever think of himself as better than others\n" +
    "He'd tried to live by this motto. He never looked down on those who were less fortunate or who had less money than him.\n" +
    "But the stupidity of the group of people he was talking to made him change his mind.",
  comments: [
    {
      //commentsID
      "id": 131,
      "body": "You are my safest place.",
      "postId": 1,
      "user": {
        "id": 7,
        "username": "dpettegre6"
      }
    }
  ],
}

const ContentBar = () => {
  return (
    <div className="content-bar">
      <PostContent />
    </div>
  );
};

export default ContentBar;
