import React, { useCallback, useMemo } from "react";
import "./PostsWrapper.scss";
import PostItem from "../../components/PostItem";
import { nanoid } from "@reduxjs/toolkit";
import { useOpacityTransition } from "../../hooks";

//TODO: array of posts:
const postsArr = [
  {
    id: "1",
    userId: 5,
    userName: "John Polak",
    title: "Aliquam justo elit, bibendum ac commodo quis odio.",
    reactions: "4",
    tags: ["history", "American", "crime"]
  },
  {
    id: "2",
    userId: 2,
    userName: "Rogger Vander",
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer biam.",
    reactions: "5",
    tags: ["history", "crime"]
  },
  {
    id: "3",
    userId: 4,
    userName: "Jimmy Franch",
    title: "Nam non ante ut mi dignissim dignissim ut ac ante. Integer dapibus ex.",
    reactions: "2",
    tags: ["history", "Frendh", "love"]
  },
  {
    id: "4",
    userId: 6,
    userName: "Zend Free",
    title: "Cras ut sapien vel quam faucibus convallis ac vitae ante. Ut at morbi.",
    reactions: "3",
    tags: ["love", "American", "crime"]
  },
  {
    id: "5",
    userId: 7,
    userName: "Margy Polak",
    title: "Fusce sed lectus facilisis, volutpat quam at, congue risus vestibulum.",
    reactions: "4",
    tags: ["history", "American", "crime"]
  },
  {
    id: "6",
    userId: 5,
    userName: "John Polak",
    title: "Mauris massa lorem, bibendum sit amet nisl eu, sodales elementum eros.",
    reactions: "5",
    tags: ["history", "American", "love"]
  },
  {
    id: "7",
    userId: 8,
    userName: "Andery Berry",
    title: "Fusce quis bibendum erat. Fusce a dui vitae turpis tristique accumsan.",
    reactions: "2",
    tags: ["love", "crime"]
  },
  {
    id: "8",
    userId: 9,
    userName: "Zendy Bor",
    title: "Aliquam mattis sem a libero mollis iaculis quis quis orci. Aenean dui.",
    reactions: "4",
    tags: ["history"]
  },
  {
    id: "9",
    userId: 10,
    userName: "Anton Borr",
    title: "Pellentesque sed pretium nisi. Orci varius natoque penatibus et morbi.",
    reactions: "5",
    tags: ["crime"]
  },
  {
    id: "10",
    userId: 11,
    userName: "Rogeer Polak",
    title: "In nisi nulla, ultricies vel elementum vel, interdum a diam cras amet.",
    reactions: "3",
    tags: ["French", "American", "love"]
  },
  {
    id: "11",
    userId: 5,
    userName: "John Polak",
    title: "Quisque nisi augue, facilisis in libero et, cursus vestibulum egestas.",
    reactions: "4",
    tags: ["history"]
  },
];
const postActive = "5"

const PostsWrapper = () => {
  //false - sorting by latest, true - sorting by raiting
  const byRaiting = true; //TODO: to Reducer
  //false - sorting by title, true - sorting by user
  const byUser = false; //TODO: to Reducer

  const transitionedRef = useOpacityTransition(700);


  /**It returns the function for sorting two objects by the certain property
   * @param {string} prop: the property of the obj to sort by...
   * @type {function(*): function(*, *): number}
   */
  const sortObjbyPropString = useCallback((prop) => {
    log(prop, "given prop: ");

    return (obj1, obj2) => {
      const text1 = obj1[prop].split(" ")[0].toLowerCase();
      const text2 = obj2[prop].split(" ")[0].toLowerCase();
      return (text1 > text2) ? 1 : (text1 < text2) ? -1 : 0;
    }
  }, []);

  const sortedPosts = useMemo(() => {
    const byPost = byUser ? "username" : "title";
    const byFilter = byRaiting ? "reactions" : "id";

    const postsSorted = postsArr.sort(sortObjbyPropString(byPost));

    log(postsSorted, "postsSorted: ");

    const sortedArr = postsSorted.sort((obj1, obj2) => +obj2[byFilter] - +obj1[byFilter]);

    log(sortedArr, "sortedArr: ");

    return sortedArr.map(data => (
      <PostItem
        postData={ Object.assign(data, { postActive }) }
        key={ nanoid() }
      />
    ));
  }, [byRaiting, byUser]);

  return (
    <div className="posts-wrapper" ref={ transitionedRef }>
      { sortedPosts }
    </div>
  );
};

export default PostsWrapper;

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
  console.log(comments, it);
}