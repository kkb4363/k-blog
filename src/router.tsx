import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Main from "./components/home/Main";
import Blog from "./components/home/Blog";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
        children: [
          {
            path: "",
            element: <Main />,
          },
          {
            path: "blogs",
            element: <Blog />,
          },
        ],
      },
    ],
  },
]);
