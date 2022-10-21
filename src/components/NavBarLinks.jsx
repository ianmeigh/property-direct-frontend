import React from "react";

import { NavLink } from "react-router-dom";

import { useCurrentUser } from "../contexts/CurrentUserContext";
import { useHandleLogout } from "../hooks/useHandleLogout";
import styles from "../styles/NavBar.module.css";
import Avatar from "./Avatar";

// Desktop Links

export const loggedOutDesktopNavLinks = (
  /* 
    - Login
    - Sign Up (TODO: Remove Sign Up)
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

export function LoggedInDesktopNavLinksAllUsers() {
  /*
    - Bookmarks
    - Feed
    - Profile
    - Logout (TODO: Move to Profile Page)
   */
  const currentUser = useCurrentUser();
  const handleLogout = useHandleLogout();

  return (
    <>
      {/* Bookmarks */}
      <NavLink
        className={`${styles.NavLink} ${styles.NavIcon} d-flex flex-row align-items-center p-1`}
        activeClassName={styles.Active}
        to="/bookmarks"
      >
        <i className="far fa-bookmark pe-1"></i>
        <p className="m-0">Saved</p>
      </NavLink>
      {/* Feed */}
      <NavLink
        className={`${styles.NavLink} ${styles.NavIcon} d-flex flex-row align-items-center p-1`}
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
          text={currentUser?.username}
        ></Avatar>
      </NavLink>
      {/* Logout */}
      <NavLink
        className={`${styles.NavLink} ${styles.NavIcon} d-flex flex-row align-items-center p-1`}
        to="/"
        onClick={handleLogout}
      >
        <i className="fas fa-sign-out-alt pe-1"></i>
        <p className="m-0 d-none">Logout</p>
      </NavLink>
    </>
  );
}

export const loggedInDesktopNavLinksStandardUsers = (
  /*
    Placeholder for future layout alterations
   */
  <></>
);

export const loggedInDesktopNavLinksSellers = (
  /*
    - Add Property
   */
  <>
    <NavLink
      className={`${styles.NavLink} ${styles.NavIcon} d-flex flex-row align-items-center p-1`}
      activeClassName={styles.Active}
      to="/property/create"
    >
      <i className="fas fa-plus pe-1"></i>
      <p className="m-0">New</p>
    </NavLink>
  </>
);

// Mobile links

export const loggedOutMobileNavLinks = (
  /* 
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

export function LoggedInMobileNavLinksAllUsers() {
  /*
  - Profile (display on the right)
  - Logout (TODO: Move to Profile Page)
   */
  const currentUser = useCurrentUser();
  const handleLogout = useHandleLogout();

  return (
    <>
      <NavLink
        className={`${styles.NavMobileIcon} ${styles.NavLink} pt-1 px-0`}
        to={`/profiles/${currentUser?.profile_id}`}
      >
        <Avatar src={currentUser?.profile_image} height={32} isMobile></Avatar>
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

export const loggedInMobileNavLinksStandardUsers = (
  /*
    - Saved
   */
  <>
    <NavLink
      className={`${styles.NavMobileIcon} ${styles.NavLink} pt-1 pe-1`}
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

export const loggedInMobileNavLinksSellers = (
  /*
    - Add Property
   */
  <>
    <NavLink
      className={`${styles.NavMobileIcon} ${styles.NavLink} pt-1 pe-1`}
      activeClassName={styles.Active}
      to="/property/create"
    >
      <div className="d-flex flex-column align-items-center">
        <i className="fas fa-plus fa-2x"></i>
        <p className="m-0">New</p>
      </div>
    </NavLink>
  </>
);

// Offcanvas Links

export const loggedOutOffcanvasLinks = (
  /*
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

export function LoggedInOffcanvasLinksAllUsers() {
  /*
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
      <NavLink exact className={styles.NavLink} to="/" onClick={handleLogout}>
        <p>Logout</p>
      </NavLink>
    </>
  );
}

export const loggedInOffcanvasLinksSellers = (
  /*
    - Add Property
   */
  <>
    <NavLink
      exact
      className={styles.NavLink}
      activeClassName={styles.Active}
      to="/property/create"
    >
      <p>New Property</p>
    </NavLink>
  </>
);
