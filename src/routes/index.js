import MainPage from "../pages/MainPage/";
import PostPage from "../pages/PostPage";
import NotFound from "../pages/NotFound";

export default [
    {
      path: "/",
      exact: true,
      component: MainPage,
      name: 'MainPage'
    },
    {
      path: "/posts",
      component: PostPage,
      name: 'PostsPage'
    },
    {
      component: NotFound ,
      name: 'NotFound'
    }
]