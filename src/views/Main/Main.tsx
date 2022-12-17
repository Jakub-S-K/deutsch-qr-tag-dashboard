import React from "react";
import { InputGroup, InputGroupText, Input, Button } from "reactstrap";
import { mdiFileDocumentEdit, mdiTrophy } from "@mdi/js";
import Icon from "@mdi/react";
import { useNavigate } from "react-router-dom";

export const Main = () => {
  const navigate = useNavigate();
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
      <Button color="primary" outline className="px-5 col-12 col-md-3">
        Apply changes
      </Button>
      <h3 className="my-3">User management</h3>
      <hr className="vertical-line" />
      <div className="d-flex flex-row flex-wrap justify-content-between gap-2">
        <Button color="primary" outline className="px-5 col-12 col-md-3">
          Leaderboard
        </Button>
        <Button
          color="warning"
          outline
          className="px-5 col-12 col-md-3"
          onClick={() => navigate("/users")}
        >
          Manage
        </Button>
        <Button
          color="success"
          className="px-5 col-12 col-md-3"
          onClick={() => navigate("/add/user")}
        >
          Add user
        </Button>
      </div>
      <h3 className="my-3">Questions management</h3>
      <hr className="vertical-line" />
      <div className="d-flex flex-row flex-wrap justify-content-between gap-2">
        <Button
          color="warning"
          outline
          className="px-5 col-12 col-md-3"
          onClick={() => navigate("/questions")}
        >
          Manage
        </Button>
        <Button
          color="success"
          className="px-5 col-12 col-md-3"
          onClick={() => navigate("/add/question")}
        >
          Add question
        </Button>
      </div>
    </>
  );
};
