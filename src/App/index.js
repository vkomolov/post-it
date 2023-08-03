import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../pages/Layout";
import PostContent from "../containers/PostContent";
import DefaultContent from "../pages/DefaultContent";
import LoginContent from "../pages/LoginContent";
import PostEdit from "../pages/PostEdit";



export default function App() {
    return (
        <Routes>
          <Route path="/" element={ <Layout /> } >
            <Route index element={ <DefaultContent/> }/>
            <Route path="login" element={ <LoginContent /> } />
            <Route path=":postId" element={ <PostContent/> } />
            <Route path=":postId/edit" element={ <PostEdit/> } />
          </Route>
        </Routes>
    );
}


///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}