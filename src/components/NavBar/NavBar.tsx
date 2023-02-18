/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { logout } from "../../utilities";
import { Retreat } from "../Retreat/Retreat";
import { Button } from "reactstrap";

export const NavBar = () => {
  return (
    <>
      <div className="row flex-row-reverse px-4 py-2 justify-content-between">
        <Button
          className="col-12 col-md-3 col-xl-1"
          color="danger"
          outline
          onClick={() => logout()}
        >
          Wyloguj
        </Button>
        <Retreat className="col-5 col-lg-1" />
      </div>
    </>
  );
};
