import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "../pages/Layout";
import PostContent from "../_containers/PostContent";
import DefaultContent from "../pages/DefaultContent";
import LoginForm from "../pages/LoginForm";
import PostEdit from "../pages/PostEdit";


export default function App() {
  return (
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<DefaultContent/>}/>
          <Route path="login" element={<LoginForm/>}/>
          <Route path=":postId" element={<PostContent/>}/>
          <Route path=":postId/edit" element={<PostEdit/>}/>
          <Route path=":postId/edit/*" element={ <Navigate to="/" replace={ true } /> } />
        </Route>
      </Routes>
  );
}


///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments = "value: ") {
  console.log(comments, it);
}