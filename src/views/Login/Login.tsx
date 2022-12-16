/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { InputGroup, InputGroupText, Input, Button } from "reactstrap";
import { mdiAccount, mdiLock } from "@mdi/js";
import Icon from "@mdi/react";
import { useAlert } from "../../contexts";
import { isResponse, responseStatus } from "../../backendTypes";
import { getToken } from "../../utilities";

export const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const loaderData = useLoaderData();
  const alert = useAlert();
  useEffect(() => {
    if (
      isResponse(loaderData) &&
      loaderData.status === responseStatus.SUCCESS
    ) {
      alert.alertAndDismiss(responseStatus.SUCCESS, {
        message: "Zalogowano pomyślnie!",
      });
      navigate("/");
    } else {
      alert.alertAndDismiss(responseStatus.ERR_UNAUTHORIZED, {
        message: "Zaloguj się, aby kontynuować!",
      });
    }
  }, []);
  return (
    <form
      className="container d-flex flex-column justify-content-center align-items-center border rounded p-5"
      style={{ minWidth: "20vw", minHeight: "50vh" }}
      onSubmit={async (e) => {
        e.preventDefault();
        const response = await getToken({ username, password });
        if (response === responseStatus.SUCCESS) {
          alert.alertAndDismiss(responseStatus.SUCCESS, {
            message: "Zalogowano pomyślnie!",
          });
          navigate("/");
        } else {
          alert.alertAndDismiss(response);
        }
      }}
    >
      <h3 className="mb-5">Log in to continue</h3>
      <InputGroup className="my-2">
        <InputGroupText>
          <Icon path={mdiAccount} title="Username" size={1} color="black" />
        </InputGroupText>
        <Input
          placeholder="username"
          invalid={alert.alert === responseStatus.ERR_NOT_FOUND}
          onChange={(e) => setUsername(e.target.value)}
        />
      </InputGroup>
      <InputGroup className="my-2">
        <InputGroupText>
          <Icon path={mdiLock} title="Password" size={1} color="black" />
        </InputGroupText>
        <Input
          type="password"
          placeholder="password"
          invalid={
            alert.alert === responseStatus.ERR_BAD_REQUEST ||
            alert.alert === responseStatus.ERR_NOT_FOUND
          }
          onChange={(e) => setPassword(e.target.value)}
        />
      </InputGroup>
      <Button
        type="submit"
        color="primary"
        className="px-5 mt-5"
        disabled={username.length === 0 || password.length === 0}
      >
        Log in
      </Button>
    </form>
  );
};
