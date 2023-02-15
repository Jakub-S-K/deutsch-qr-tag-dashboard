import React from "react";
import { Button } from "reactstrap";
import { mdiArrowLeft } from "@mdi/js";
import Icon from "@mdi/react";
import { useNavigate, useLocation } from "react-router-dom";

export const Retreat = ({ className }: { className?: string }) => {
  const navigate = useNavigate();
  const location = useLocation();
  if (location.pathname === "/") {
    return null;
  }
  return (
    <Button
      className={className}
      onClick={() => navigate(-1)}
      color="danger"
      outline
    >
      <Icon path={mdiArrowLeft} title="Powrót" size={1} color="black" />
    </Button>
  );
};
