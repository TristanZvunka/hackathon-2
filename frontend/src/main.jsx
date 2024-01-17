import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Questions from "./components/Questions";
import "./App.css";
import App from "./App";
import HomePage from "./pages/HomePage";

import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/Login";

const router = createBrowserRouter([
  {
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
    path: "/Questions",
    element: <Questions />,
  },
    ],
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <ToastContainer />
  </React.StrictMode>
);
