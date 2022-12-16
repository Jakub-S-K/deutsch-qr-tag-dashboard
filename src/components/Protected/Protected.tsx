/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useAlert } from "../../contexts";
import { responseStatus } from "../../backendTypes";
import { renewToken, validate } from "../../utilities";

export const Protected = () => {
  const alert = useAlert();
  const [redirect, setRedirect] = useState(true);
  const timeoutID = useRef<any>(null);
  const expires = useRef<number | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const { status: authStatus, expiresIn } = validate();
    if (authStatus === responseStatus.SUCCESS) {
      setRedirect(false);
      if (!timeoutID.current && !!expiresIn) {
        expires.current = expiresIn;
      }
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
  }, [expires]);
  useEffect(() => {
    if (!!expires.current && !timeoutID.current) {
      console.log(
        `Próba odnowienia sesji za: ${expires.current - 15000} czyli ~${
          (expires.current - 15000) / 1000 / 60
        } minut`
      );
      timeoutID.current = setTimeout(async () => {
        console.log("Odnawianie sesji...");
        const response = await renewToken();
        if (response !== responseStatus.SUCCESS) {
          alert.alertAndDismiss(response, {
            message: "Wystąpił błąd w odnowieniu sesji.",
          });
          setRedirect(true);
          navigate("/login");
        }
        timeoutID.current = null;
        expires.current = 5000;
      }, expires.current - 15000);
    }
  }, [expires, timeoutID.current]);

  return redirect ? null : <Outlet />;
};
