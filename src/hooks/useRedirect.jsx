import { useEffect } from "react";

import axios from "axios";
import { useHistory } from "react-router-dom";

// CREDIT: Code Institute Moments Tutorial Project
// URL:    https://github.com/Code-Institute-Solutions/moments

/**
 * Checks authentication status and redirects users based on passed parameter.
 * @param {"isAuthenticated" | "isAnonymous" | "isNotSeller"} userAuthStatus - Scenario in we want to redirect users.
 */
export const useRedirect = (userAuthStatus) => {
  const history = useHistory();

  useEffect(() => {
    // Try to refresh the user access token, if successful the user must be
    // authenticated otherwise they are not.
    const handleMount = async () => {
      try {
        const { data: currentUser } = await axios.get("/dj-rest-auth/user/");
        // Redirect if authenticated
        if (userAuthStatus === "isAuthenticated") {
          history.push("/");
        }
        // Redirect if authenticated user is not seller
        else if (userAuthStatus === "isNotSeller") {
          if (!currentUser.is_seller) {
            history.push("/");
          }
        }
      } catch (err) {
        console.log(err);
        // Redirect if anonymous
        if (userAuthStatus === "isAnonymous") {
          history.push("/");
        }
      }
    };
    handleMount();
  }, [history, userAuthStatus]);
};
