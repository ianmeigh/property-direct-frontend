import { createContext, useContext, useEffect, useMemo, useState } from "react";

import axios from "axios";
import { useHistory } from "react-router-dom";

import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { removeTokenTimestamp, shouldRefreshToken } from "../utils/utils";

// CREDIT: Code Institute Moments Tutorial Project
// URL:    https://github.com/Code-Institute-Solutions/moments

// Context used to share data about the currently authenticated user between
// components.
export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const history = useHistory();

  // Retrieve information about the authenticated user on mount and add this
  // information to currentUser state to be shared with child components.
  const handleMount = async () => {
    try {
      const { data } = await axiosRes.get("/dj-rest-auth/user/");
      setCurrentUser(data);
    } catch (err) {
      if (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    handleMount();
  }, []);

  // Axios interceptors
  useMemo(() => {
    /* 
      Request interceptor:
      - Try to refresh the access_token (using the refresh_token) before sending
        the request.
      - If refresh_token has expired or doesn't exist, redirect to login page
        and set currentUser to null.
    */
    axiosReq.interceptors.request.use(
      async (config) => {
        if (shouldRefreshToken()) {
          try {
            await axios.post("/dj-rest-auth/token/refresh/");
          } catch (err) {
            setCurrentUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                history.push("/login");
              }
              return null;
            });
            removeTokenTimestamp();
            return config;
          }
        }
        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    /* 
      Response interceptor:
      - If API response is 401, try to refresh the access_token (using the
        refresh_token).
      - If refresh_token has expired or doesn't exist, redirect to login page
        and set currentUser to null. 
    */
    axiosRes.interceptors.response.use(
      (response) => response,
      async (err) => {
        if (err.response?.status === 401) {
          try {
            await axios.post("/dj-rest-auth/token/refresh/");
          } catch (err) {
            setCurrentUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                history.push("/login");
              }
              return null;
            });
            removeTokenTimestamp();
          }
          return axios(err.config);
        }
        return Promise.reject(err);
      }
    );
  }, [history]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};
