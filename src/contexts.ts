import { createContext, useState } from "react";
import { responseStatus } from "./backendTypes";

export const useValue = () => {
  const [alert, setAlert] = useState<responseStatus>(responseStatus.NO_ALERT);

  const alertAndDismiss = (status: responseStatus, time: number = 2000) => {
    setAlert(status);
    setTimeout(() => {
      setAlert(responseStatus.NO_ALERT);
    }, time);
  };

  return {
    alert,
    setAlert,
    alertAndDismiss,
  };
};
export const AlertContext = createContext({} as ReturnType<typeof useValue>);
