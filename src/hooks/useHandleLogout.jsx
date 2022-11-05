import { axiosReq } from "../api/axiosDefaults";
import { useSetCurrentUser } from "../contexts/CurrentUserContext";
import { removeTokenTimestamp } from "../utils/utils";

/**
 * Custom Hook to manage user logout.
 *
 * Returns a function which can be invoked to log a user out.
 */
export const useHandleLogout = () => {
  const setCurrentUser = useSetCurrentUser();
  const handleLogout = async () => {
    try {
      await axiosReq.post("/dj-rest-auth/logout/");
      setCurrentUser(null);
      removeTokenTimestamp();
    } catch (err) {
      console.log(err);
    }
  };
  return handleLogout;
};
