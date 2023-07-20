import React from "react";
import "./PostsWrapper.scss";
import PostItem from "../../components/PostItem";
import { nanoid } from "@reduxjs/toolkit";

const PostsWrapper = () => {

  //TODO: array of posts:
  const postsArr = [
    {
      id: "1",
      userName: "John Polak",
      title: "Some text about something which can be taken as the following title of the post",
      reactions: "4",
      tags: ["history", "American", "crime"]
    },
    {
      id: "2",
      userName: "Rogger Vander",
      title: "Some text about something which can be taken as the following title of the post",
      reactions: "5",
      tags: ["history", "crime"]
    },
    {
      id: "3",
      userName: "Jimmy Franch",
      title: "Some text about something which can be taken as the following title of the post",
      reactions: "2",
      tags: ["history", "Frendh", "love"]
    },
    {
      id: "4",
      userName: "Zend Free",
      title: "Some text about something which can be taken as the following title of the post",
      reactions: "3",
      tags: ["love", "American", "crime"]
    },
    {
      id: "5",
      userName: "Margy Polak",
      title: "Some text about something which can be taken as the following title of the post",
      reactions: "4",
      tags: ["history", "American", "crime"]
    },
    {
      id: "6",
      userName: "John Polak",
      title: "Some text about something which can be taken as the following title of the post",
      reactions: "5",
      tags: ["history", "American", "love"]
    },
    {
      id: "7",
      userName: "Andery Berry",
      title: "Some text about something which can be taken as the following title of the post",
      reactions: "2",
      tags: ["love", "crime"]
    },
    {
      id: "8",
      userName: "Zendy Bor",
      title: "Some text about something which can be taken as the following title of the post",
      reactions: "4",
      tags: ["history"]
    },
    {
      id: "9",
      userName: "Anton Borr",
      title: "Some text about something which can be taken as the following title of the post",
      reactions: "5",
      tags: ["crime"]
    },
    {
      id: "10",
      userName: "Rogeer Polak",
      title: "Some text about something which can be taken as the following title of the post",
      reactions: "3",
      tags: ["French", "American", "love"]
    },
    {
      id: "11",
      userName: "Bordy Zend",
      title: "Some text about something which can be taken as the following title of the post",
      reactions: "4",
      tags: ["history"]
    },
  ];
  const postActive = "5"

  const postList = postsArr.map(data => (
    <PostItem
      postData={ Object.assign(data, { postActive }) }
      key={ nanoid() }
    />
  ));

  return (
    <div className="posts-wrapper">
      { postList }
    </div>
  );
};

export default PostsWrapper;

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
  console.log(comments, it);
}