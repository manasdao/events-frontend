import { POLLING_INTERVAL, USER_CONTEXT_BACKUP } from "@/constants";
import customAxios from "@/utils/axios";
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
  const fetchUserProfile = () => {
    if (state?.userDetails?.id)
      customAxios
        .get(`/users/fetchprofile?userId=${state.userDetails.id}`, {
          headers: { workspace: "2" },
        })
        .then((res) => {
          console.log("fetchprofile res", res.data);
          setUserContext({ userProfile: res.data });
        })
        .catch((err) => {
          console.log("fetchprofile err", err);
        });
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
    fetchUserProfile();
  }, [state.userDetails]);

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
    <UserContext.Provider
      value={{ ...state, setUserContext, fetchUserProfile }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
