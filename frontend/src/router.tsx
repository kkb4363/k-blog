import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import MainPage from "pages/MainPage";
import Tag from "pages/Tag";
import Category from "pages/Category";
import Project from "pages/Project";
import Blog from "pages/Blog";
import BlogDetail from "pages/BlogDetail";
import Search from "pages/Search";
import ErrorPage from "pages/ErrorPage";
import WritePost from "pages/WritePost";
import Write from "pages/Write";

export const router = createBrowserRouter([
  {
    path: "write",
    element: <Write />,
  },
  {
    path: "",
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "blog",
        element: <Blog />,
        children: [
          {
            path: ":id",
            element: <BlogDetail />,
          },
        ],
      },

      {
        path: "tags",
        element: <Tag />,
        children: [
          {
            path: ":id",
            element: <Search />,
          },
        ],
      },
      {
        path: "category",
        element: <Category />,
        children: [
          {
            path: ":id",
            element: <Search />,
          },
        ],
      },
      {
        path: "project",
        element: <Project />,
      },
      // for developer
      // {
      //   path: "writePost",
      //   element: <WritePost />,
      // },
    ],
  },
]);
