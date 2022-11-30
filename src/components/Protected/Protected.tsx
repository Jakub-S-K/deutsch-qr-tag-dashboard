import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { AlertContext } from "../../contexts";
import { responseStatus } from "../../backendTypes";

interface Token {
  id: string;
  iat: EpochTimeStamp;
  exp: EpochTimeStamp;
}
export const Protected = () => {
  const alert = useContext(AlertContext);
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
