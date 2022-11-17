import React from "react";
import "./App.css";
import { Login } from "./views/Login/Login";
import { Main } from "./views/Main/Main";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { loader, validate } from "./utilities";
import { Users as UsersPage } from "./views/Users/Users";
import { UserForm } from "./views/Users/UserForm";
import { Alert } from "./components/Alert/Alert";
import { AlertContext, useValue } from "./contexts";
import { QuestionForm } from "./views/Questions/QuestionForm";
import { Questions } from "./views/Questions/Questions";

const router = createBrowserRouter([
  {
    path: "/",
    loader: () => validate({}),
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
    path: "/questions",
    loader: () => loader({ path: "api/questions" }),
    element: <Questions />,
  },
  {
    path: "/questions/:id",
    loader: ({ params }) => loader({ path: `api/question/${params.id}` }),
    element: <QuestionForm />,
  },
  {
    path: "/add/question",
    element: <QuestionForm />,
  },
  {
    path: "/login",
    loader: () => validate({}),
    element: <Login />,
  },
]);

function App() {
  return (
    <AlertContext.Provider value={useValue()}>
      <div className="content container">
        <Alert></Alert>
        <RouterProvider router={router} />
      </div>
    </AlertContext.Provider>
  );
}

export default App;
