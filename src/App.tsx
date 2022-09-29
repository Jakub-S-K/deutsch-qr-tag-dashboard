import React from "react";
import "./App.css";
import { Login } from "./views/Login/Login";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import { Credentials } from "./backendTypes";
import axios from "axios";

const getToken = async ({ username, password }: Credentials) => {
  const response = await axios.post(
    `${process.env.REACT_APP_URL}/api/login`,
    { username: username, password: password },
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );
  if (response.status === 200) {
    localStorage.setItem("token", response.data.token);
  }
};
const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login onLogin={getToken} />,
  },
]);

function App() {
  console.log(localStorage.getItem("token"));
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
