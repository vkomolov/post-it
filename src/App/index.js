import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "../pages/Layout";
import PostContent from "../_containers/PostContent";
import DefaultContent from "../pages/DefaultContent";
import LoginForm from "../pages/LoginForm";
import AddPost from "../pages/AddPost";
import UserProfile from "../pages/UserProfile";
import WithAuth from "../_helpers/Hoc/WithAuth";


export default function App() {
  return (
      <Routes>
        <Route path="/" element={ <Layout/> } >
          <Route index element={ <DefaultContent/> } />
          <Route path="login" element={ <LoginForm/> } />
          <Route path="/add" element={
            <WithAuth>
              <AddPost/>
            </WithAuth>
          }
          />
          <Route path="/profile" element={
            <WithAuth>
              <UserProfile/>
            </WithAuth>
          }
          />
          <Route path=":postId" element={ <PostContent/> } />
          <Route path=":postId/*" element={ <Navigate to="/" replace={ true } /> } />
        </Route>
      </Routes>
  );
}


///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments = "value: ") {
  console.log(comments, it);
}