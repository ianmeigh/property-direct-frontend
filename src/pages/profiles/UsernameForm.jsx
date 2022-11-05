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
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../../contexts/CurrentUserContext";
import btnStyles from "../../styles/Buttons.module.css";

// CREDIT: Adapted from Code Institute Moments Tutorial Project
// URL:    https://github.com/Code-Institute-Solutions/moments

export default function UsernameForm() {
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState({});

  const history = useHistory();
  const { id } = useParams();

  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  useEffect(() => {
    // Determines if the currently authenticated user is the profile owner and
    // sets the state variable used as the value of the form field. Redirects
    // user to home page if user not authenticated or not profile owner.
    if (currentUser?.profile_id?.toString() === id) {
      setUsername(currentUser.username);
    } else {
      history.push("/");
    }
  }, [currentUser, history, id]);

  /**
   * Updates the username on the API and in the current user context.
   * @param {Object} event - Event Submit Object
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.put("/dj-rest-auth/user/", {
        username,
      });
      setCurrentUser((prevUser) => ({
        ...prevUser,
        username,
      }));
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
          <Container>
            <Form onSubmit={handleSubmit} className="my-3">
              {/* Username Form Fields */}
              <Form.Group className="mb-3">
                <Form.Label className="mb-4">Change username</Form.Label>
                <Form.Control
                  className="text-center"
                  placeholder="username"
                  type="text"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
              </Form.Group>
              {errors?.username?.map((message, idx) => (
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
