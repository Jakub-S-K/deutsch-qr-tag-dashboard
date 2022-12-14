/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useAlert } from "../../contexts";
import { responseStatus, Token } from "../../backendTypes";

export const Protected = () => {
  const alert = useAlert();
  const [redirect, setRedirect] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const authCheck = async () => {
      if (!localStorage.getItem("token")) {
        setRedirect(true);
        alert.alertAndDismiss(responseStatus.ERR_UNAUTHORIZED, {
          message: "Zaloguj się, aby kontynuować!",
        });
        navigate("/login");
      } else {
        try {
          const { exp } = jwtDecode<Token>(localStorage.getItem("token")!);
          if (Date.now() < exp * 1000) {
            setRedirect(false);
          } else {
            setRedirect(true);
            alert.alertAndDismiss(responseStatus.ERR_UNAUTHORIZED, {
              message: "Sesja wygasła. Zaloguj się ponownie.",
            });
            localStorage.removeItem("token");
            navigate("/login");
          }
        } catch (err) {
          localStorage.removeItem("token");
        }
      }
    };
    authCheck();
  }, []);

  return redirect ? null : <Outlet />;
};
