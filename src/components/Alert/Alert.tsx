import React, { useContext } from "react";
import { Button, Alert as AlertBootstrap } from "reactstrap";
import { AlertContext } from "../../contexts";
export const Alert = ({
  isOpen = true,
  children,
}: {
  isOpen?: boolean;
  children?: string;
}) => {
  const value = useContext(AlertContext);
  return (
    <AlertBootstrap color="success">
      <>
        {alert}
        {children}{" "}
        <Button onClick={() => value.setAlert(value.alert + 1)}>
          <>dodaj =&gt; {value.alert}</>
        </Button>
      </>
    </AlertBootstrap>
  );
};
