import React, { useEffect, useRef, useState } from "react";
import { InputGroup, InputGroupText, Input, Button } from "reactstrap";
import { mdiFileDocumentEdit, mdiTrophy, mdiPrinter } from "@mdi/js";
import Icon from "@mdi/react";
import { useNavigate } from "react-router-dom";
import { editOptions, getOptions } from "../../utilities";
import { useAlert } from "../../contexts";

export const Main = () => {
  const navigate = useNavigate();
  const options = useRef<any>({});
  const alert = useAlert();
  useEffect(() => {
    async function getData() {
      const data = await getOptions();
      options.current = data.data;
      if (!!options.current.title) {
        setTitle(options.current.title);
      }
      if (!!options.current.description) {
        setDescription(options.current.description);
      }
    }
    getData();
  }, []);
  const [title, setTitle] = useState(() => {
    if (!!options.current.title) {
      return options.current.title;
    }
    return "";
  });
  const [description, setDescription] = useState(() => {
    if (!!options.current.description) {
      return options.current.description;
    }
    return "";
  });
  return (
    <>
      <h3 className="">Contest title</h3>
      <hr className="vertical-line" />
      <InputGroup className="my-2">
        <InputGroupText>
          <Icon path={mdiTrophy} title="Username" size={1} color="black" />
        </InputGroupText>
        <Input
          className="input-orange"
          placeholder={title.length > 0 ? title : "Contest title"}
          onChange={(e) => setTitle(e.currentTarget.value)}
        />
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
          placeholder={description.length > 0 ? description : "Description..."}
          onChange={(e) => setDescription(e.currentTarget.value)}
        />
      </InputGroup>
      <div className="d-flex justify-content-between">
        <Button
          color="primary"
          outline
          className="px-5 col-12 col-md-3"
          onClick={async () => {
            const response = await editOptions({ title, description });
            alert.alertAndDismiss(response.status);
          }}
        >
          Apply changes
        </Button>
        <Button
          color="primary"
          outline
          className="px-5 col-12 col-md-3"
          onClick={() => navigate("/leaderboard")}
        >
          Leaderboard
        </Button>
      </div>
      <h3 className="my-3">User management</h3>
      <hr className="vertical-line" />
      <div className="col col-10 d-flex flex-row flex-wrap justify-content-between gap-2">
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
        <Button
          color="primary"
          className="px-5 col-12 col-md-3"
          onClick={() => navigate("/qr/teams")}
        >
          <Icon path={mdiPrinter} title="print" size={1} color="white" />
        </Button>
      </div>
      <h3 className="my-3">Questions management</h3>
      <hr className="vertical-line" />
      <div className="col col-10 d-flex flex-row flex-wrap justify-content-between gap-2">
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
        <Button
          color="primary"
          className="px-5 col-12 col-md-3"
          onClick={() => navigate("/qr/questions")}
        >
          <Icon path={mdiPrinter} title="print" size={1} color="white" />
        </Button>
      </div>
      <h3 className="my-3">Teams management</h3>
      <hr className="vertical-line" />
      <div className="col col-6 d-flex flex-row flex-wrap justify-content-between gap-2">
        <Button
          color="warning"
          outline
          className="px-5 col-12 col-md-5"
          onClick={() => navigate("/teams")}
        >
          Manage
        </Button>
        <Button
          color="success"
          className="px-5 col-12 col-md-5"
          onClick={() => navigate("/add/team")}
        >
          Add team
        </Button>
      </div>
    </>
  );
};
