import React, { useEffect, useState } from "react";

import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useHistory, useParams } from "react-router-dom";

import { axiosRes } from "../../api/axiosDefaults";
import appStyles from "../../App.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import btnStyles from "../../styles/Buttons.module.css";

/**
 * Component to display the password edit form and submit data to the API.
 * @returns
 */
export default function UserPasswordForm() {
  const history = useHistory();
  const { id } = useParams();
  const currentUser = useCurrentUser();

  const [userData, setUserData] = useState({
    new_password1: "",
    new_password2: "",
  });
  const { new_password1, new_password2 } = userData;

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    // Determines if the currently authenticated user is the profile owner and
    // sets the state variable used as the value of the form field. Redirects
    // user to home page if user not authenticated or not profile owner.
    if (currentUser?.profile_id?.toString() !== id) {
      history.push("/");
    }
  }, [currentUser, history, id]);

  /**
   * Updates the password on the API and in the current user context.
   * @param {object} event - Event Submit Object
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.post("/dj-rest-auth/password/change/", userData);
      history.goBack();
    } catch (err) {
      console.log(err);
      setErrors(err.response?.data);
    }
  };

  return (
    <Container
      className={`${appStyles.ContentContainer} mt-3 p-0 text-center rounded`}
    >
      <Row>
        <Col className="py-2 mx-auto text-center" md={6}>
          <Container className={appStyles.Content}>
            <Form onSubmit={handleSubmit} className="my-3">
              {/* Password Form Fields */}
              <Form.Group className="mb-3">
                <Form.Label className="mb-2">New password</Form.Label>
                <Form.Control
                  className="text-center"
                  placeholder="Enter new password"
                  type="password"
                  value={new_password1}
                  onChange={handleChange}
                  name="new_password1"
                />
              </Form.Group>
              {errors?.new_password1?.map((message, idx) => (
                <Alert key={idx} variant="warning">
                  {message}
                </Alert>
              ))}
              <Form.Group className="mb-3">
                <Form.Label className="mb-2">Confirm password</Form.Label>
                <Form.Control
                  className="text-center"
                  placeholder="Confirm new password"
                  type="password"
                  value={new_password2}
                  onChange={handleChange}
                  name="new_password2"
                />
              </Form.Group>
              {errors?.new_password2?.map((message, idx) => (
                <Alert key={idx} variant="warning">
                  {message}
                </Alert>
              ))}
              {/* Buttons */}
              <Container className="mt-4">
                <Button
                  className={`${btnStyles.Button} ${btnStyles.Primary} me-3`}
                  type="submit"
                >
                  Save
                </Button>
                <Button
                  className={`${btnStyles.Button} ${btnStyles.Primary}`}
                  onClick={() => history.goBack()}
                >
                  Cancel
                </Button>
              </Container>
            </Form>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}
