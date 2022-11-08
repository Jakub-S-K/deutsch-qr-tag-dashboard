import { createContext, useState } from "react";

export const useValue = () => {
  const [alert, setAlert] = useState(0);

  return {
    alert,
    setAlert,
  };
};
export const AlertContext = createContext({} as ReturnType<typeof useValue>);
