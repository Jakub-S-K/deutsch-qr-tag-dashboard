import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { InputGroup, InputGroupText, Input, Button } from "reactstrap";
import { mdiAccount, mdiLock } from "@mdi/js";
import Icon from "@mdi/react";

export const Login = ({ onLogin }: { onLogin: Function }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
          onChange={(e) => setPassword(e.target.value)}
        />
      </InputGroup>
      <Button
        color="primary"
        className="px-5 mt-5"
        onClick={() => onLogin({ username, password })}
      >
        Log in
      </Button>
    </div>
  );
};
