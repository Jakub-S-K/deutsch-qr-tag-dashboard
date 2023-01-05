import React, { useEffect } from "react";
import { Toast, CloseButton } from "reactstrap";
import cx from "classnames";
import { useAlert } from "../../contexts";
import { responseStatus } from "../../backendTypes";
import { useNavigate } from "react-router-dom";
export const Alert = () => {
  const value = useAlert();
  const navigate = useNavigate();

  const getMessage = (status: responseStatus) => {
    switch (status) {
      case responseStatus.SUCCESS:
        return "Wykonano pomyślnie.";
      case responseStatus.ERR_BAD_REQUEST:
        return "Wystąpił błąd. Sprawdź poprawność danych i spróbuj ponownie.";
      case responseStatus.ERR_UNAUTHORIZED:
        return "Sesja wygasła. Zaloguj się ponownie, aby kontynuować.";
      case responseStatus.ERR_NOT_FOUND:
        return "Wystąpił błąd. Nie znaleziono szukanego zasobu.";
      case responseStatus.ERR_ALREADY_EXISTS:
        return "Wystąpił błąd. Ten zasób już istnieje.";
      case responseStatus.ERR_INTERNAL:
        return "Wystąpił błąd. Prosimy spróbować później.";
    }
  };
  useEffect(() => {
    if (value.alert === responseStatus.ERR_UNAUTHORIZED) {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value.alert]);
  return (
    <Toast
      role={"alert"}
      className={cx(
        "text-white",
        "position-fixed",
        "px-3 py-4",
        "d-flex justify-content-between",
        {
          "bg-success": value.alert === responseStatus.SUCCESS,
          "bg-danger": value.alert >= 400,
        }
      )}
      style={{ top: "15px", right: "15px", zIndex: 15000 }}
      isOpen={value.alert !== responseStatus.NO_ALERT}
    >
      <>
        {value.message ? value.message : getMessage(value.alert)}
        <CloseButton
          variant="white"
          onClick={() => value.setAlert(responseStatus.NO_ALERT)}
        />
      </>
    </Toast>
  );
};
