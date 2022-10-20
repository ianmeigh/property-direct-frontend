import React from "react";

import { Col, Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import logo from "../assets/logo.png";
import styles from "../styles/NavBar.module.css";

export default function NavBar() {
  return (
    <Navbar
      className={`${styles.NavBar} mb-3 border-bottom flex-nowrap`}
      expand="md"
      fixed="top"
    >
      {/* 
        Container:
        - Center content and horizontally pad
        - Fluid below "md" breakpoint so content is at 100% width
      */}
      <Container fluid="md">
        {/* 
          Left column:
          - Branding for larger viewport (hidden below "md" breakpoint)
          - Responsive Offcanvas Navbar (visible below "md" breakpoint)
          - TODO: Contains Mobile Navigation Links
        */}
        <Col className="d-flex flex-row justify-content-start">
          <Navbar.Toggle
            className={`${styles.NavLink} border-dark border-2`}
            aria-controls={`offcanvasNavbar`}
          />
          <Navbar.Offcanvas
            className="d-md-none"
            id={`offcanvasNavbar`}
            placement="start"
          >
            <Offcanvas.Header className="pt-4" aria-label="Close" closeButton />
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <NavLink
                  exact
                  className={styles.NavLink}
                  activeClassName={styles.Active}
                  to="/"
                >
                  <p>Home</p>
                </NavLink>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
          <NavLink
            exact
            className={styles.NavLink}
            activeClassName={styles.Active}
            aria-label="Home"
            to="/"
          >
            <Navbar.Brand className="d-none d-md-flex flex-row align-items-center">
              <img
                alt="Property Direct Logo"
                src={logo}
                width="45"
                height="45"
              />
              <p
                className={`${styles.BrandText} ps-2 m-0 text-decoration-none`}
              >
                Property Direct
              </p>
            </Navbar.Brand>
          </NavLink>
        </Col>
        {/* 
          Central column:
          - Branding for mobile viewport (visible below md breakpoint)
          - Variable column sizing to maintain logo centering
        */}
        <Col xs={3} md={2}>
          <NavLink
            exact
            className={`${styles.NavLink} d-flex flex-row align-items-center justify-content-center d-md-none`}
            activeClassName={styles.Active}
            aria-label="Home"
            to="/"
          >
            <Navbar.Brand className="m-0 p-0">
              <img
                src={logo}
                alt="Property Direct Logo"
                width="60"
                height="60"
              />
            </Navbar.Brand>
          </NavLink>
        </Col>
        {/* 
          Right column:
          - Priority User Navigation Links fo smaller viewport
            - Smaller viewport (icons + text vertical stacked)
            - Larger viewport (icons + text horizontal)
          - All navigation links for larger viewport
          - Hidden below "md" breakpoint
        */}
        <Col className="d-flex flex-row justify-content-end">
          <Navbar className="py-0 py-md-2" aria-label="User Navigation Links">
            <Nav className="d-md-none">
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
            </Nav>
            <Nav className="d-none d-md-flex">
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
            </Nav>
          </Navbar>
        </Col>
      </Container>
    </Navbar>
  );
}
