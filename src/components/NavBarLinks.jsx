import React from "react";

import { NavLink } from "react-router-dom";

import { useCurrentUser } from "../contexts/CurrentUserContext";
import { useHandleLogout } from "../hooks/useHandleLogout";
import styles from "../styles/NavBar.module.css";
import Avatar from "./Avatar";

/**
 * Logged out desktop navigation links - Anonymous Users
 */
export const loggedOutDesktopNavLinks = (
  /* 
    - Login
    - Sign Up
   */
  <>
    <NavLink
      className={`${styles.NavLink} ${styles.NavIcon} d-flex flex-row align-items-center p-1`}
      activeClassName={styles.Active}
      to="/login"
    >
      <i className="fas fa-sign-in-alt pe-1"></i>
      <p className="m-0">Login</p>
    </NavLink>
    <NavLink
      className={`${styles.NavLink} ${styles.NavIcon} d-flex flex-row align-items-center p-1`}
      activeClassName={styles.Active}
      to="/register"
    >
      <i className="fas fa-user-plus pe-1"></i>
      <p className="m-0">Sign up</p>
    </NavLink>
  </>
);

/**
 * Component - Navigation links for all authenticated users
 * @returns
 */
export function LoggedInDesktopNavLinksAllUsers() {
  /*
    Contains links for the following:
    - Bookmarks
    - Feed
    - Profile
    - Logout
   */
  const currentUser = useCurrentUser();
  const handleLogout = useHandleLogout();

  return (
    <>
      {/* Bookmarks */}
      <NavLink
        className={`${styles.NavLink} ${styles.NavIcon} d-flex flex-row align-items-center px-2`}
        activeClassName={styles.Active}
        to="/bookmarks"
      >
        <i className="far fa-bookmark pe-1"></i>
        <p className="m-0">Saved</p>
      </NavLink>
      {/* Feed */}
      <NavLink
        className={`${styles.NavLink} ${styles.NavIcon} d-flex flex-row align-items-center px-2`}
        activeClassName={styles.Active}
        to="/feed"
      >
        <i className="fas fa-stream pe-1"></i>
        <p className="m-0">Feed</p>
      </NavLink>
      {/* Profile */}
      <NavLink
        className={`${styles.NavLink} ${styles.NavIcon} p-1`}
        to={`/profiles/${currentUser?.profile_id}`}
      >
        <Avatar
          src={currentUser?.profile_image}
          text={currentUser?.username.slice(0, 10).trimEnd().concat("...")}
        ></Avatar>
      </NavLink>
      {/* Logout */}
      <NavLink
        className={`${styles.NavLink} ${styles.NavIcon} d-flex flex-row align-items-center px-2`}
        to="/"
        onClick={handleLogout}
        aria-label="Logout"
      >
        <i className="fas fa-sign-out-alt pe-1"></i>
        <p className="m-0 d-none">Logout</p>
      </NavLink>
    </>
  );
}

/**
 * Navigation links for authenticated users with the role of seller
 */
export const loggedInDesktopNavLinksSellers = (
  /*
    Contains links for the following:
    - Add Property
   */
  <>
    <NavLink
      className={`${styles.NavLink} ${styles.NavIcon} d-flex flex-row align-items-center p-1`}
      activeClassName={styles.Active}
      to="/property/create"
    >
      <i className="fas fa-plus pe-1"></i>
      <p className="m-0">Create</p>
    </NavLink>
  </>
);

/**
 * Mobile navigation links for Anonymous Users
 */
export const loggedOutMobileNavLinks = (
  /* 
    Contains links for the following:
    - Login (display on the right)
   */
  <>
    <NavLink
      className={`${styles.NavMobileIcon} ${styles.NavLink} pt-1 px-0`}
      activeClassName={styles.Active}
      to="/login"
    >
      <div className="d-flex flex-column align-items-center">
        <i className="far fa-user fa-2x"></i>
        <p className="m-0">Login</p>
      </div>
    </NavLink>
  </>
);

/**
 * Mobile navigation links for Authenticated Users
 */
export function LoggedInMobileNavLinksAllUsers() {
  /*
    Contains links for the following:
    - Profile (display on the right)
    - Logout
   */
  const currentUser = useCurrentUser();
  const handleLogout = useHandleLogout();

  return (
    <>
      <NavLink
        className={`${styles.NavMobileIcon} ${styles.NavLink} pt-1 pe-2`}
        to={`/profiles/${currentUser?.profile_id}`}
      >
        <Avatar src={currentUser?.profile_image} height={32} mobile></Avatar>
        <p className="m-0">Profile</p>
      </NavLink>
      <NavLink
        className={`${styles.NavMobileIcon} ${styles.NavLink} pt-1 px-0`}
        to="/"
        onClick={handleLogout}
      >
        <div className="d-flex flex-column align-items-center">
          <i className="fas fa-sign-out-alt fa-2x"></i>
          <p className="m-0">Logout</p>
        </div>
      </NavLink>
    </>
  );
}

/**
 * Mobile navigation links for authenticated users without the seller role
 */
export const loggedInMobileNavLinksStandardUsers = (
  /*
    Contains links for the following:
    - Saved
   */
  <>
    <NavLink
      className={`${styles.NavMobileIcon} ${styles.NavLink} pt-1 pe-2`}
      activeClassName={styles.Active}
      to="/bookmarks"
    >
      <div className="d-flex flex-column align-items-center">
        <i className="far fa-bookmark fa-2x"></i>
        <p className="m-0">Saved</p>
      </div>
    </NavLink>
  </>
);

/**
 * Mobile navigation links for authenticated users with the seller role
 */
export const loggedInMobileNavLinksSellers = (
  /*
    Contains links for the following:
    - Add Property
   */
  <>
    <NavLink
      className={`${styles.NavMobileIcon} ${styles.NavLink} pt-1 pe-2`}
      activeClassName={styles.Active}
      to="/property/create"
    >
      <div className="d-flex flex-column align-items-center">
        <i className="fas fa-plus fa-2x"></i>
        <p className="m-0">Create</p>
      </div>
    </NavLink>
  </>
);

/**
 * Responsive Offcanvas navigation links for anonymous users
 */
export const loggedOutOffcanvasLinks = (
  /*
    Contains links for the following:
    - Home
    - Login
    - Register
   */
  <>
    <NavLink
      exact
      className={styles.NavLink}
      activeClassName={styles.Active}
      to="/"
    >
      <p>Home</p>
    </NavLink>
    <NavLink
      exact
      className={styles.NavLink}
      activeClassName={styles.Active}
      to="/login"
    >
      <p>Login</p>
    </NavLink>
    <NavLink
      exact
      className={styles.NavLink}
      activeClassName={styles.Active}
      to="/register"
    >
      <p>Register</p>
    </NavLink>
  </>
);

/**
 * Responsive Offcanvas navigation links for all authenticated users
 */
export function LoggedInOffcanvasLinksAllUsers() {
  /*
    Contains links for the following:
    - Home
    - Saved
    - Feed
    - Logout
   */
  const currentUser = useCurrentUser();
  const handleLogout = useHandleLogout();

  return (
    <>
      {/* Home */}
      <NavLink
        exact
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/"
      >
        <p>Home</p>
      </NavLink>
      {/* Bookmarks */}
      <NavLink
        exact
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/bookmarks"
      >
        <p>Saved</p>
      </NavLink>
      {/* Feed */}
      <NavLink
        exact
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/feed"
      >
        <p>Feed</p>
      </NavLink>
      {/* Profile */}
      <NavLink
        exact
        className={styles.NavLink}
        to={`/profiles/${currentUser?.profile_id}`}
      >
        <p>Profile</p>
      </NavLink>
      {/* Bookmarks */}
      {/* Logout */}
      <NavLink
        exact
        className={styles.NavLink}
        to="/"
        onClick={handleLogout}
        aria-label="Logout"
      >
        <p>Logout</p>
      </NavLink>
    </>
  );
}

/**
 * Responsive Offcanvas navigation links for all authenticated users with a
 * seller role.
 */
export const loggedInOffcanvasLinksSellers = (
  /*
    Contains links for the following:
    - Add Property
   */
  <>
    <NavLink
      exact
      className={styles.NavLink}
      activeClassName={styles.Active}
      to="/property/create"
    >
      <p>Create Property</p>
    </NavLink>
  </>
);
