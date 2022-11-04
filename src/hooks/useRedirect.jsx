import { useEffect } from "react";

import axios from "axios";
import { useHistory } from "react-router-dom";

// CREDIT: Code Institute Moments Tutorial Project
// URL:    https://github.com/Code-Institute-Solutions/moments

/**
 * Checks authentication status and redirects users based on passed parameter.
 * @param {"isAuthenticated" | "isAnonymous"} userAuthStatus - Scenario in we want to redirect users.
 */
export const useRedirect = (userAuthStatus) => {
  const history = useHistory();

  useEffect(() => {
    // Try to refresh the user access token, if successful the user must be
    // authenticated otherwise they are not.
    const handleMount = async () => {
      try {
        console.log("fetch");
        await axios.post("/dj-rest-auth/token/refresh/");
        // Redirect if authenticated
        if (userAuthStatus === "isAuthenticated") {
          history.push("/");
        }
      } catch (err) {
        // Redirect if anonymous
        if (userAuthStatus === "isAnonymous") {
          history.push("/");
        }
      }
    };
    handleMount();
  }, [history, userAuthStatus]);
};
