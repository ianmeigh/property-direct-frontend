import React, { useState } from "react";

import axios from "axios";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Link, useHistory } from "react-router-dom";

import appStyles from "../../App.module.css";
import { useRedirect } from "../../hooks/useRedirect";
import styles from "../../styles/AuthForms.module.css";
import btnStyles from "../../styles/Buttons.module.css";

/**
 * Component to display user account registration form and submit data to the
 * API.
 * @returns
 */
export default function RegistrationForm() {
  useRedirect("isAuthenticated");

  const [registrationData, setRegistrationData] = useState({
    username: "",
    password1: "",
    password2: "",
    is_seller: false,
  });
  const { username, password1, password2, is_seller } = registrationData;
  const [errors, setErrors] = useState({});
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
    try {
      await axios.post("/dj-rest-auth/registration/", registrationData);
      history.push("/login");
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <Row className={styles.Row}>
      <Col className="my-auto mx-auto py-2 p-md-2" md={8} lg={6}>
        <Container
          className={`${appStyles.ContentContainer} p-4 text-center rounded`}
        >
          <h1>Sign Up</h1>
          <p className="mt-2 mb-4">
            Already have an account?
            <Link className="ps-1" to="/login">
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
            {errors.username?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
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
            {errors.password1?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
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
            {errors.password2?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
            <Form.Group className="my-3 text-start" controlId="checkbox">
              <Form.Check
                label="Are you selling property?"
                name="is_seller"
                value={is_seller}
                onChange={handleChecked}
              />
            </Form.Group>
            <Button
              className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Primary}`}
              type="submit"
            >
              Sign Up
            </Button>
            {errors.non_field_errors?.map((message, idx) => (
              <Alert variant="warning" key={idx} className="mt-3 mb-0">
                {message}
              </Alert>
            ))}
          </Form>
        </Container>
      </Col>
    </Row>
  );
}
