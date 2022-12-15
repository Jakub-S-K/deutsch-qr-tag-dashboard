/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useAlert } from "../../contexts";
import { responseStatus } from "../../backendTypes";
import { validate } from "../../utilities";

export const Protected = () => {
  const alert = useAlert();
  const [redirect, setRedirect] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const authStatus = validate();
    if (authStatus === responseStatus.SUCCESS) {
      setRedirect(false);
    } else if (authStatus === responseStatus.ERR_INTERNAL) {
      setRedirect(true);
      alert.alertAndDismiss(responseStatus.ERR_UNAUTHORIZED, {
        message: "Sesja wygasła. Zaloguj się ponownie.",
      });
      navigate("/login");
    } else {
      setRedirect(true);
      alert.alertAndDismiss(responseStatus.ERR_UNAUTHORIZED, {
        message: "Zaloguj się, aby kontynuować!",
      });
      navigate("/login");
    }
  }, []);

  return redirect ? null : <Outlet />;
};
