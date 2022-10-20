import React from "react";

import { Col, Container, Row, Button, Form } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import styles from "../../styles/AuthForms.module.css";
import btnStyles from "../../styles/Buttons.module.css";

export default function RegistrationForm() {
  return (
    <Row className={styles.Row}>
      <Col className="my-auto mx-auto py-2 p-md-2" md={8} lg={6}>
        <Container
          className={`${styles.FormContainer} p-4 d-flex flex-column align-items-center rounded`}
        >
          <h1>Sign Up</h1>
          <p className="mt-2 mb-4">
            Already have an account?
            <NavLink className="ps-1" to="/signin">
              Sign in here.
            </NavLink>
          </p>
          <Form className="align-self-start w-100">
            <Form.Group className="mb-3" controlId="username">
              <Form.Label className="d-none">Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a username"
                name="username"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password1">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter a password"
                name="password1"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password2">
              <Form.Label className="d-none">Confirm password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                name="password2"
              />
            </Form.Group>
            <Form.Group className="my-3" controlId="checkbox">
              <Form.Check type="checkbox" label="Are you selling property?" />
            </Form.Group>
          </Form>
          <Button
            className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Primary}`}
            type="submit"
          >
            Sign Up
          </Button>
        </Container>
      </Col>
    </Row>
  );
}