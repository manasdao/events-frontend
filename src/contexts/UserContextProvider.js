import { USER_CONTEXT_BACKUP } from "@/constants";
import React, { createContext, useEffect, useState } from "react";
export const UserContext = createContext({});
function UserContextProvider({ children }) {
  const [state, setState] = useState({
    userId: "",
    telegramDetails: null,
    walletDetails: null,
  });
  useEffect(() => {
    let storedUserContext = window.localStorage.getItem(USER_CONTEXT_BACKUP);
    if (storedUserContext) {
      setState(JSON.parse(storedUserContext));
    } else {
      window.localStorage.setItem(USER_CONTEXT_BACKUP, JSON.stringify(state));
    }
  }, []);

  const setUserContext = (stateToUpdate) => {
    let newState = { ...state, ...stateToUpdate };
    setState({ ...state, ...stateToUpdate });
    window.localStorage.setItem(USER_CONTEXT_BACKUP, JSON.stringify(newState));
  };
  return (
    <UserContext.Provider value={{ ...state, setUserContext }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
