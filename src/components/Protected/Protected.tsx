import React, { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import jwtDecode from "jwt-decode";

interface Token {
  id: string;
  iat: EpochTimeStamp;
  exp: EpochTimeStamp;
}
export const Protected = () => {
  const [redirect, setRedirect] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const authCheck = async () => {
      if (!localStorage.getItem("token")) {
        setRedirect(true);
        navigate("/login");
      } else {
        const { exp } = jwtDecode<Token>(localStorage.getItem("token")!);
        if (Date.now() < exp * 1000) {
          setRedirect(false);
        } else {
          setRedirect(true);
          navigate("/login");
        }
      }
    };
    authCheck();
  }, []);

  return redirect ? null : <Outlet />;
};
