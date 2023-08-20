
export const actionTypes = {
  SET_POST_ACTIVE: "SET_POST_ACTIVE",
  SET_SORTING: "SET_SORTING",
  SUBMIT_LOGIN: "SUBMIT_LOGIN",
  SUBMIT_LOGOUT: "SUBMIT_LOGOUT",
  LOGIN_RESET: "LOGIN_RESET",
  GET_USER_PROFILE: "GET_USER_PROFILE",
  USER_PROFILE_RESET: "USER_PROFILE_RESET"
};

export const storageNames = {
  POSTS: "POSTS",
  USERS: "USERS",
  POSTSVIEWED: "POSTSVIEWED",
  COMMENTS_SET_ID: postId => `comments_${ postId }`,
  LOGGED_USER: "LOGGED_USER",
  LOGGED_USER_DATA: "LOGGED_USER_DATA"
};

export const BASE_URL = "https://dummyjson.com";
export const PATTERN_DATA_USERS = ["image", "firstName", "lastName"];
export const PATTERN_DATA_USER_LOGGED = [
    "image", "firstName", "lastName", "maidenName", "age", "gender", "email", "phone", "birthDate", "height",
    "weight", "eyeColor", "hair", "ip", "address", "bank", "company"
];