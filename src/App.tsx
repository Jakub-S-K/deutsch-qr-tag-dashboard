import React from "react";
import "./App.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Alert } from "./components/Alert/Alert";
import { AlertContext, useValue } from "./contexts";
import { routes } from "./routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Alert />
        <Outlet />
      </>
    ),
    children: routes,
  },
]);

function App() {
  return (
    <AlertContext.Provider value={useValue()}>
      <div className="content container">
        <RouterProvider router={router} />
      </div>
    </AlertContext.Provider>
  );
}

export default App;
