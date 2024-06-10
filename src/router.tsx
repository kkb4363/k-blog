import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import MainPage from "pages/MainPage";
import Tag from "pages/Tag";
import Category from "pages/Category";
import Project from "pages/Project";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "",
        element: <MainPage />,
      },
      {
        path: "tags",
        element: <Tag />,
      },
      {
        path: "category",
        element: <Category />,
      },
      {
        path: "project",
        element: <Project />,
      },
    ],
  },
]);
