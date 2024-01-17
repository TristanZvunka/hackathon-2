import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";

import App from "./App";

import "react-toastify/dist/ReactToastify.css";

import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Questions from "./pages/Questions";
import Admin from "./pages/Admin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/beauty-ia",
        element: <Questions />,
      },
      {
        path: "/admin",
        element: <Admin />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <ToastContainer />
  </React.StrictMode>
);
