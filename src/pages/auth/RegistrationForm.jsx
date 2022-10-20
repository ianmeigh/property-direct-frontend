import React, { useState } from "react";

import axios from "axios";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

import styles from "../../styles/AuthForms.module.css";
import btnStyles from "../../styles/Buttons.module.css";

export default function RegistrationForm() {
  const [registrationData, setRegistrationData] = useState({
    username: "",
    password1: "",
    password2: "",
    isSeller: false,
  });
  const { username, password1, password2, isSeller } = registrationData;
  const history = useHistory();

  const handleChange = (event) => {
    setRegistrationData({
      ...registrationData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChecked = (event) =>
    setRegistrationData({
      ...registrationData,
      [event.target.name]: event.target.checked,
    });

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(registrationData);
    try {
      await axios.post("/dj-rest-auth/registration/", registrationData);
      history.push("/signin");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Row className={styles.Row}>
      <Col className="my-auto mx-auto py-2 p-md-2" md={8} lg={6}>
        <Container
          className={`${styles.FormContainer} p-4 text-center rounded`}
        >
          <h1>Sign Up</h1>
          <p className="mt-2 mb-4">
            Already have an account?
            <Link className="ps-1" to="/signin">
              Sign in here.
            </Link>
          </p>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label className="d-none">Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a username"
                name="username"
                value={username}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password1">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter a password"
                name="password1"
                value={password1}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password2">
              <Form.Label className="d-none">Confirm password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                name="password2"
                value={password2}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="my-3 text-start" controlId="checkbox">
              <Form.Check
                type="checkbox"
                label="Are you selling property?"
                name="isSeller"
                value={isSeller}
                onChange={handleChecked}
              />
            </Form.Group>
            <Button
              className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Primary}`}
              type="submit"
            >
              Sign Up
            </Button>
          </Form>
        </Container>
      </Col>
    </Row>
  );
}
