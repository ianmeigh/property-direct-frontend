import React from "react";

import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import styles from "../../styles/AuthForms.module.css";
import btnStyles from "../../styles/Buttons.module.css";

export default function SignInForm() {
  return (
    <Row className={styles.Row}>
      <Col className="my-auto mx-auto py-2 p-md-2" md={8} lg={6}>
        <Container
          className={`${styles.FormContainer} p-4 text-center rounded`}
        >
          <h1>Sign In</h1>
          <p className="mt-2 mb-4">
            New to Property Direct?
            <Link className="ps-1" to="/signup">
              Register here.
            </Link>
          </p>
          <Form>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label className="d-none">Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your username"
                name="username"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                name="password"
              />
            </Form.Group>
            <Button
              className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Primary}`}
              type="submit"
            >
              Sign In
            </Button>
          </Form>
        </Container>
      </Col>
    </Row>
  );
}
