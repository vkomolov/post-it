
export const actionTypes = {
  SET_POST_ACTIVE: "SET_POST_ACTIVE",
  SET_SORTING: "SET_SORTING",
  SUBMIT_LOGIN: "SUBMIT_LOGIN",
  SUBMIT_LOGOUT: "SUBMIT_LOGOUT",
  LOGIN_RESET: "LOGIN_RESET"
};

export const storageNames = {
  POSTS: "POSTS",
  USERS: "USERS",
  POSTSVIEWED: "POSTSVIEWED",
  COMMENTS_SET_ID: postId => `comments_${ postId }`,
  LOGGED_USER: "LOGGED_USER"
};

export const BASE_URL = "https://dummyjson.com";

export const PATTERN_DATA_USERS = ["image", "firstName", "lastName", "username", "password"];