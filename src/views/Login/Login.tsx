import React, { useState, useEffect, useContext } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { InputGroup, InputGroupText, Input, Button } from "reactstrap";
import { mdiAccount, mdiLock } from "@mdi/js";
import Icon from "@mdi/react";
import { AlertContext } from "../../contexts";
import { responseStatus } from "../../backendTypes";
import { getToken } from "../../utilities";

export const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const loaderData = useLoaderData();
  const alert = useContext(AlertContext);
  useEffect(() => {
    if (loaderData === responseStatus.SUCCESS) {
      alert.alertAndDismiss(responseStatus.SUCCESS);
      navigate("/");
    }
  }, []);
  return (
    <div
      className="container d-flex flex-column justify-content-center align-items-center border rounded p-5"
      style={{ minWidth: "20vw", minHeight: "50vh" }}
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
        color="primary"
        className="px-5 mt-5"
        disabled={username.length === 0 || password.length === 0}
        onClick={async () => {
          const status = await getToken({ username, password });
          if (status === responseStatus.SUCCESS) {
            alert.alertAndDismiss(responseStatus.SUCCESS);
            navigate("/");
          } else {
            if (status === responseStatus.ERR_BAD_REQUEST) {
              alert.alertAndDismiss(responseStatus.ERR_BAD_REQUEST);
            }
            if (status === responseStatus.ERR_NOT_FOUND) {
              alert.alertAndDismiss(responseStatus.ERR_NOT_FOUND);
            }
          }
        }}
      >
        Log in
      </Button>
    </div>
  );
};
