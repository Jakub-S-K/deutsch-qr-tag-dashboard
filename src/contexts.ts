import { createContext, useState } from "react";
import { responseStatus } from "./backendTypes";

export const useValue = () => {
  const [alert, setAlert] = useState<responseStatus>(responseStatus.SUCCESS);

  const alertAndDismiss = (status: responseStatus, time: number = 2000) => {
    setAlert(status);
    setInterval(() => {
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
