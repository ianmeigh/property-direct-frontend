import React from "react";

import { Col, Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import logo from "../assets/logo.png";
import { useCurrentUser } from "../hooks/CurrentUserContext";
import styles from "../styles/NavBar.module.css";
import {
  loggedInDesktopNavLinks,
  loggedInMobileNavLinks,
  loggedInOffcanvasLinks,
  loggedOutDesktopNavLinks,
  loggedOutMobileNavLinks,
  loggedOutOffcanvasLinks,
} from "./NavBarLinks";

export default function NavBar() {
  const currentUser = useCurrentUser();

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
                {/* offcanvas nav links */}
                {currentUser ? loggedInOffcanvasLinks : loggedOutOffcanvasLinks}
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
              {/* logged out nav links */}
              {currentUser ? loggedInMobileNavLinks : loggedOutMobileNavLinks}
            </Nav>
            <Nav className="d-none d-md-flex">
              {/* desktop nav links */}
              {currentUser ? loggedInDesktopNavLinks : loggedOutDesktopNavLinks}
            </Nav>
          </Navbar>
          {/* DEBUG */}
          {currentUser?.username}
        </Col>
      </Container>
    </Navbar>
  );
}
