import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import HomePage from "./pages/HomePage";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> },
      /*
      {
        path: "/beauty-ia",
        element: <BeautyIA />,
        },
      },
      {
        path: "/admin-login",
        element: <Login />,
      },
      {
        path: "/admin-panel",
        element: <AdminPanel />,
      },
    */
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
