import { createContext, useContext, useState } from "react";
import { responseStatus } from "./backendTypes";

export const useValue = () => {
  const [alert, setAlert] = useState<responseStatus>(responseStatus.NO_ALERT);
  const [message, setMessage] = useState<string | null>(null);

  const alertAndDismiss = (
    status: responseStatus,
    options?: { time?: number; message?: string }
  ) => {
    options = {
      time: 2000,
      ...options,
    };
    setAlert(status);
    if (options.message) {
      setMessage(options.message);
    }
    setTimeout(() => {
      setAlert(responseStatus.NO_ALERT);
      setMessage(null);
    }, options.time);
  };

  return {
    alert,
    message,
    setAlert,
    alertAndDismiss,
  };
};
export const AlertContext = createContext({} as ReturnType<typeof useValue>);
export const useAlert = () => {
  return useContext(AlertContext);
};
