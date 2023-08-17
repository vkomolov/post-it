
export const actionTypes = {
  SET_POST_ACTIVE: "SET_POST_ACTIVE",
  SET_SORTING: "SET_SORTING",
  SUBMIT_LOGIN: "SUBMIT_LOGIN",
  SUBMIT_LOGOUT: "SUBMIT_LOGOUT",
  CHECK_TOKEN: "CHECK_TOKEN"
};

export const storageNames = {
  POSTS: "posts",
  USERS: "users",
  POSTSVIEWED: "postsViewed",
  COMMENTS_SET_ID: postId => `comments_${ postId }`,
  LOGGED_USER: "loggedUser"
};

export const BASE_URL = "https://dummyjson.com";

export const PATTERN_DATA_USERS = ["image", "firstName", "lastName", "username", "password"];