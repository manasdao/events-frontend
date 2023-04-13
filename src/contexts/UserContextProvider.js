import { POLLING_INTERVAL, USER_CONTEXT_BACKUP } from "@/constants";
import React, { createContext, useEffect, useState } from "react";
import { useAccount } from "wagmi";
export const UserContext = createContext({});
function UserContextProvider({ children }) {
  // ! hooks
  const { isDisconnected, isConnected, address } = useAccount();
  // ! States
  const [state, setState] = useState({
    userId: "",
    isSigned: false,
    telegramDetails: null,
    walletDetails: null,
    userDetails: null,
    pollAnnouncements: Math.random(),
    isAllowed: true,
  });
  // ! Local helpers
  const setUserContext = (stateToUpdate) => {
    let newState = { ...state, ...stateToUpdate };
    setState({ ...state, ...stateToUpdate });
    window.localStorage.setItem(USER_CONTEXT_BACKUP, JSON.stringify(newState));
  };
  // ! Effects
  useEffect(() => {
    let storedUserContext = window.localStorage.getItem(USER_CONTEXT_BACKUP);
    if (storedUserContext) {
      setState(JSON.parse(storedUserContext));
    } else {
      window.localStorage.setItem(USER_CONTEXT_BACKUP, JSON.stringify(state));
    }
    let pollingInterval = setInterval(() => {
      let storedUserContext = window.localStorage.getItem(USER_CONTEXT_BACKUP);
      if (storedUserContext) {
        setState({
          ...JSON.parse(storedUserContext),
          pollAnnouncements: Math.random(),
        });
      }
    }, POLLING_INTERVAL);
    return () => {
      clearInterval(pollingInterval);
    };
  }, []);
  useEffect(() => {
    if (isDisconnected) {
      setUserContext({
        userDetails: null,
        telegramDetails: null,
        isSigned: false,
        walletDetails: null,
      });
    }
  }, [isDisconnected]);

  return (
    <UserContext.Provider value={{ ...state, setUserContext }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
