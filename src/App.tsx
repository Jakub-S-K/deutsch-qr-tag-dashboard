import React from "react";
import "./App.css";
import { Login } from "./views/Login/Login";
import { Main } from "./views/Main/Main";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Credentials } from "./backendTypes";
import axios from "axios";
import { loader, validate } from "./utilities";
import { Users as UsersPage } from "./views/Users/Users";
import { UserForm } from "./views/Users/UserForm";

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
    window.location.reload();
  }
};

const router = createBrowserRouter([
  {
    path: "/",
    loader: () => loader({ path: "api/users" }),
    element: <Main />,
  },
  {
    path: "/users",
    loader: () => loader({ path: "api/users" }),
    element: <UsersPage />,
  },
  {
    path: "/users/:id",
    loader: ({ params }) => loader({ path: `api/user/${params.id}` }),
    element: <UserForm />,
  },
  {
    path: "/add/user",
    element: <UserForm />,
  },
  {
    path: "/login",
    loader: () => validate({}),
    element: <Login onLogin={getToken} />,
  },
]);

function App() {
  return (
    <div className="content container">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
