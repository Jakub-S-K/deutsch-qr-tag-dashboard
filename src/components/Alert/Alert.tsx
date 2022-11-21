import React, { useContext } from "react";
import { Toast, CloseButton } from "reactstrap";
import cx from "classnames";
import { AlertContext } from "../../contexts";
import { responseStatus } from "../../backendTypes";
export const Alert = ({
  children,
}: {
  isOpen?: boolean;
  children?: string;
}) => {
  const value = useContext(AlertContext);

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
  return (
    <Toast
      role={"alert"}
      className={cx(
        "text-white",
        "position-fixed",
        "p-3",
        "d-flex justify-content-between",
        {
          "bg-success": value.alert === responseStatus.SUCCESS,
          "bg-danger": value.alert >= 400,
        }
      )}
      style={{ top: "15px", right: "15px" }}
      isOpen={value.alert !== responseStatus.NO_ALERT}
    >
      <>
        {typeof children !== "undefined" ? children : getMessage(value.alert)}
        <CloseButton
          variant="white"
          onClick={() => value.setAlert(responseStatus.NO_ALERT)}
        />
      </>
    </Toast>
  );
};
