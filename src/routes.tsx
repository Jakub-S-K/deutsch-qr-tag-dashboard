import React from "react";
import { Login } from "./views/Login/Login";
import { Main } from "./views/Main/Main";
import { QuestionForm } from "./views/Questions/QuestionForm";
import { Questions } from "./views/Questions/Questions";
import { NotFound } from "./views/NotFound";
import { Protected } from "./components/Protected/Protected";
import { RouteObject } from "react-router-dom";
import {
  getQuestion,
  getQuestions,
  getUser,
  getUsers,
  validate,
} from "./utilities";
import { Users as UsersPage } from "./views/Users/Users";
import { UserForm } from "./views/Users/UserForm";
import { TeamForm } from "./views/Teams";

export const routes: RouteObject[] = [
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/login",
    loader: () => validate({}),
    element: <Login />,
  },
  {
    path: "/",
    element: <Protected />,
    children: [
      {
        path: "/",
        index: true,
        element: <Main />,
      },
      {
        path: "users",
        loader: () => getUsers(),
        element: <UsersPage />,
      },
      {
        path: "users/:id",
        loader: ({ params }) => getUser(params.id),
        element: <UserForm />,
      },
      {
        path: "add/user",
        element: <UserForm />,
      },
      {
        path: "questions",
        loader: () => getQuestions(),
        element: <Questions />,
      },
      {
        path: "questions/:id",
        loader: ({ params }) => getQuestion(params.id),
        element: <QuestionForm />,
      },
      {
        path: "/add/question",
        element: <QuestionForm />,
      },
      {
        path: "add/team",
        element: <TeamForm />,
      },
    ],
  },
];
