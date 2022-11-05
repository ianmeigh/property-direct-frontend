import React from "react";

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { NavLink } from "react-router-dom";

import logo from "../assets/logo.png";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import useOffcanvasToggle from "../hooks/useOffcanvasToggle";
import styles from "../styles/NavBar.module.css";
import {
  LoggedInDesktopNavLinksAllUsers,
  loggedInDesktopNavLinksSellers,
  loggedInDesktopNavLinksStandardUsers,
  LoggedInMobileNavLinksAllUsers,
  loggedInMobileNavLinksSellers,
  loggedInMobileNavLinksStandardUsers,
  LoggedInOffcanvasLinksAllUsers,
  loggedInOffcanvasLinksSellers,
  loggedOutDesktopNavLinks,
  loggedOutMobileNavLinks,
  loggedOutOffcanvasLinks,
} from "./NavBarLinks";

export default function NavBar() {
  const currentUser = useCurrentUser();
  const { expanded, setExpanded, ref } = useOffcanvasToggle();

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
        */}
        <Col className="d-flex flex-row justify-content-start">
          <Navbar.Toggle
            className={`${styles.NavLink} border-dark border-2`}
            aria-controls="offcanvasNavbar"
            onClick={() => setExpanded(!expanded)}
          />
          <Navbar.Offcanvas
            className="d-md-none"
            id="offcanvasNavbar"
            placement="start"
            show={expanded}
            onHide={() => setExpanded(!expanded)}
          >
            <Offcanvas.Header className="pt-4" aria-label="Close" closeButton />
            <Offcanvas.Body>
              <Nav ref={ref} className="justify-content-end flex-grow-1 pe-3">
                {/* offcanvas nav links */}
                {currentUser?.is_seller ? (
                  <>
                    {loggedInOffcanvasLinksSellers}
                    {<LoggedInOffcanvasLinksAllUsers />}
                  </>
                ) : currentUser ? (
                  <LoggedInOffcanvasLinksAllUsers />
                ) : (
                  loggedOutOffcanvasLinks
                )}
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
        <Col xs={3} className="d-md-none">
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
              {/* mobile nav links */}
              {currentUser?.is_seller ? (
                <>
                  {loggedInMobileNavLinksSellers}
                  {<LoggedInMobileNavLinksAllUsers />}
                </>
              ) : currentUser ? (
                <>
                  {loggedInMobileNavLinksStandardUsers}
                  {<LoggedInMobileNavLinksAllUsers />}
                </>
              ) : (
                loggedOutMobileNavLinks
              )}
            </Nav>
            <Nav className="d-none d-md-flex">
              {/* desktop nav links */}
              {currentUser?.is_seller ? (
                <>
                  {loggedInDesktopNavLinksSellers}
                  {<LoggedInDesktopNavLinksAllUsers />}
                </>
              ) : currentUser ? (
                <>
                  {loggedInDesktopNavLinksStandardUsers}
                  {<LoggedInDesktopNavLinksAllUsers />}
                </>
              ) : (
                loggedOutDesktopNavLinks
              )}
            </Nav>
          </Navbar>
        </Col>
      </Container>
    </Navbar>
  );
}
