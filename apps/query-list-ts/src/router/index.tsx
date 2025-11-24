import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayouts";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import ManageLayout from "../layouts/ManageLayout";
import Star from "../pages/manage/Star";
import Trans from "../pages/manage/Trans";
import QuestionLayout from "../layouts/QuestionLayout";
import List2 from "../pages/manage/List";
import ProtectedRoute from "./ProtectedRoute";

const Edit = lazy(() => import("../pages/question/Edit/Edit"));
const Stat = lazy(() => import("../pages/question/Stat/Stat"));

const routerConfigure = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/manage",
        element: (
          <ProtectedRoute>
            <ManageLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "list",
            element: <List2 />,
          },
          {
            path: "Star",
            element: <Star />,
          },
          {
            path: "trans",
            element: <Trans />,
          },
        ],
      },
      {
        path: "/question",
        element: (
          <ProtectedRoute>
            <QuestionLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "edit/:id",
            element: <Edit />,
          },
          {
            path: "stat/:id",
            element: <Stat />,
          },
        ],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default routerConfigure;

export const LOGIN_PATHNAME = "/login";
export const REGISTER_PATHNAME = "/register";
export const HOME_PATHNAME = "/";
export const LIST_PATHNAME = "/manage/list";
