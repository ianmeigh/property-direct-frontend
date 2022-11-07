import jwtDecode from "jwt-decode";

import { axiosReq } from "../api/axiosDefaults";

// CREDIT: Code Institute Moments Tutorial Project
// URL:    https://github.com/Code-Institute-Solutions/moments

/**
 * Fetches paginated data.
 * @param {object} resource - API response object containing a next key (URL).
 * @param {*} setResource - useState setter function to update the resource.
 */
export const fetchMoreData = async (resource, setResource) => {
  try {
    const { data } = await axiosReq.get(resource.next);
    setResource((prevResource) => ({
      ...prevResource,
      next: data.next,
      results: data.results.reduce((acc, cur) => {
        return acc.some((accResult) => accResult.id === cur.id)
          ? acc
          : [...acc, cur];
      }, prevResource.results),
    }));
  } catch (err) {
    console.log(err);
  }
};

/**
 * Conditional logic to determine if the profile passed as a parameter has been
 * followed, and update the profileData necessary to reflect this action to the
 * authenticated user.
 * @param {object} profile - User profile.
 * @param {object} clickedProfile - Profile of the user that is being followed.
 * @param {number} following_id - ID of the follower record from the API.
 * @returns {object} - User profile object that has been updated if it was
 * followed.
 */
export const followHelper = (profile, clickedProfile, following_id) => {
  return profile.id === clickedProfile.id
    ? {
        ...profile,
        followers_count: profile.followers_count + 1,
        following_id,
      }
    : profile.is_owner
    ? {
        ...profile,
        following_count: profile.following_count + 1,
      }
    : profile;
};

/**
 * Conditional logic to determine if the profile passed as a parameter has been
 * unfollowed, and update the profileData necessary to reflect this action to
 * the authenticated user.
 * @param {object} profile - User profile.
 * @param {object} clickedProfile - Profile of the user that is being
 * unfollowed.
 * @returns {object} - User profile object that has been updated if it was
 * unfollowed.
 */
export const unfollowHelper = (profile, clickedProfile) => {
  return profile.id === clickedProfile.id
    ? {
        ...profile,
        followers_count: profile.followers_count - 1,
        following_id: null,
      }
    : profile.is_owner
    ? {
        ...profile,
        following_count: profile.following_count - 1,
      }
    : profile;
};

/**
 * Store authenticated users refresh token expiry timestamp in localStorage
 * @param {object} data - Response from API when logging in using the
 * '/dj-rest-auth/login/' endpoint.
 */
export const setTokenTimestamp = (data) => {
  const refreshTokenTimestamp = jwtDecode(data?.refresh_token).exp;
  localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp);
};

/**
 * Checks if the refreshTokenTimestamp exists in localStorage
 * @returns {boolean}
 */
export const shouldRefreshToken = () => {
  return !!localStorage.getItem("refreshTokenTimestamp");
};

/** Removes the refreshTokenTimestamp from localStorage */
export const removeTokenTimestamp = () => {
  localStorage.removeItem("refreshTokenTimestamp");
};
