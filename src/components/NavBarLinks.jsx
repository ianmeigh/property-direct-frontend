import { NavLink } from "react-router-dom";

import styles from "../styles/NavBar.module.css";

export const loggedOutDesktopNavLinks = (
  <>
    <NavLink
      className={`${styles.NavLink} ${styles.NavIcon} d-flex flex-row align-items-center p-1`}
      activeClassName={styles.Active}
      to="/signin"
    >
      <i className="fas fa-sign-in-alt pe-1"></i>
      <p className="m-0">Sign in</p>
    </NavLink>
    <NavLink
      className={`${styles.NavLink} ${styles.NavIcon} d-flex flex-row align-items-center p-1`}
      activeClassName={styles.Active}
      to="/signup"
    >
      <i className="fas fa-user-plus pe-1"></i>
      <p className="m-0">Sign up</p>
    </NavLink>
  </>
);

export const loggedInDesktopNavLinks = <></>;

export const loggedOutMobileNavLinks = (
  <>
    <NavLink
      className={`${styles.NavMobileIcon} ${styles.NavLink} pt-1 px-0`}
      activeClassName={styles.Active}
      to="/signin"
    >
      <div className="d-flex flex-column align-items-center">
        <i className="far fa-user fa-2x"></i>
        <p className="m-0">Sign in</p>
      </div>
    </NavLink>
  </>
);

export const loggedInMobileNavLinks = <></>;

export const loggedOutOffcanvasLinks = (
  <>
    <NavLink
      exact
      className={styles.NavLink}
      activeClassName={styles.Active}
      to="/"
    >
      <p>Home</p>
    </NavLink>
  </>
);

export const loggedInOffcanvasLinks = <></>;
