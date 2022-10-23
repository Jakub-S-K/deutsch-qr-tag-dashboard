import React, { useState } from "react";
import { InputGroup, InputGroupText, Input, Button } from "reactstrap";
import { mdiFileDocumentEdit, mdiTrophy } from "@mdi/js";
import Icon from "@mdi/react";

export const Main = () => {
  return (
    <>
      <h3 className="">Contest title</h3>
      <hr className="vertical-line" />
      <InputGroup className="my-2">
        <InputGroupText>
          <Icon path={mdiTrophy} title="Username" size={1} color="black" />
        </InputGroupText>
        <Input className="input-orange" placeholder="Contest title" />
      </InputGroup>
      <InputGroup className="my-2">
        <InputGroupText>
          <Icon
            path={mdiFileDocumentEdit}
            title="Password"
            size={1}
            color="black"
          />
        </InputGroupText>
        <Input
          className="input-orange"
          type="textarea"
          placeholder="Description..."
        />
      </InputGroup>
      <Button color="primary" outline className="px-5 my-3">
        Apply changes
      </Button>
      <h3>User management</h3>
      <hr className="vertical-line" />
      <div className="d-flex flex-row justify-content-evenly">
        <Button color="primary" outline className="px-5 mx-3">
          Leaderboard
        </Button>
        <Button color="warning" outline className="px-5 mx-3">
          Manage
        </Button>
        <Button color="success" className="px-5 mx-3">
          Add user
        </Button>
      </div>
      <h3>Questions management</h3>
      <hr className="vertical-line" />
      <div className="d-flex flex-row justify-content-between">
        <Button color="warning" outline className="px-5 mx-3">
          Manage
        </Button>
        <Button color="success" className="px-5 mx-3">
          Add question
        </Button>
      </div>
    </>
  );
};