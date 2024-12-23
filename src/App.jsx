import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ViewCourse from "./pages/ViewCourse";
import CourseDetail from "./pages/CourseDetail";
import AddCourse from "./pages/AddCourse";

export const route = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/viewCourses",
        element: <ViewCourse />,
      },
      {
        path: "/course/:courseId",
        element: <CourseDetail />,
      },
      {
        path: "/addCourse",
        element: <AddCourse />,
      },
    ],
  },
];
export const router = createBrowserRouter(route);
