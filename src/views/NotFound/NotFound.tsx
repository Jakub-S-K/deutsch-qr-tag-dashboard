import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import { mdiSkullCrossbonesOutline } from "@mdi/js";
import Icon from "@mdi/react";

export const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="d-flex flex-column justify-content-center align-items-center mt-3">
      <h3>Ups! Wygląda na to, że zabłądziliśmy!...</h3>
      <Icon path={mdiSkullCrossbonesOutline} size={12} />
      <div className="w-100 mb-3">
        <h5 className="text-end">...lepiej nie rozbijajmy tu obozowiska.</h5>
      </div>
      <Button
        color="primary"
        onClick={() => {
          navigate("/");
        }}
        className="w-100"
      >
        Powrót na stronę główną
      </Button>
    </div>
  );
};
