import React from "react";
import { Button } from "reactstrap";
import { mdiArrowLeft } from "@mdi/js";
import Icon from "@mdi/react";
import { useNavigate } from "react-router-dom";

export const Retreat = () => {
  const navigate = useNavigate();
  return (
    <Button onClick={() => navigate(-1)} color="danger" outline>
      <Icon path={mdiArrowLeft} title="Powrót" size={1} color="black" />
    </Button>
  );
};
