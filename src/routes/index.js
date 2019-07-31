import MainPage from "../pages/MainPage/";
import SecondPage from "../pages/SecondPage";
import NotFound from "../pages/NotFound";

export default [
    {
      path: "/",
      exact: true,
      component: MainPage,
      name: 'MainPage'
    },
    {
      path: "/secondPage",
      exact: false,
      component: SecondPage,
      name: 'SecondPage'
    },
    {
      component: NotFound ,
      name: 'NotFound'
    }
]