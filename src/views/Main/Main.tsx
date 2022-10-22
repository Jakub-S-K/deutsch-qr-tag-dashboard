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
      <Button color="primary" outline className="px-5 mt-5">
        Apply changes
      </Button>
    </>
  );
};
