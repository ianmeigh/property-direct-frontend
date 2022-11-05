import React, { useEffect, useRef, useState } from "react";

import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import { useHistory, useParams } from "react-router-dom";

import { axiosReq } from "../../api/axiosDefaults";
import appStyles from "../../App.module.css";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../../contexts/CurrentUserContext";
import btnStyles from "../../styles/Buttons.module.css";
import styles from "../../styles/ProfileEditForm.module.css";

// CREDIT: Adapted from Code Institute Moments Tutorial Project
// URL:    https://github.com/Code-Institute-Solutions/moments

export default function ProfileEditForm() {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const { id } = useParams();
  const history = useHistory();
  const imageFile = useRef();

  const [profileData, setProfileData] = useState({
    name: "",
    description: "",
    image: "",
  });
  const { name, description, image } = profileData;

  const [errors, setErrors] = useState({});

  useEffect(() => {
    /**
     * Determines if the currently authenticated user is the profile owner and
     * fetches profile content. Redirects user to home page if user not
     * authenticated or not profile owner.
     */
    const handleMount = async () => {
      if (currentUser?.profile_id?.toString() === id) {
        try {
          const { data } = await axiosReq.get(`/profiles/${id}/`);
          const { name, description, image } = data;
          setProfileData({ name, description, image });
        } catch (err) {
          console.log(err);
          history.push("/");
        }
      } else {
        history.push("/");
      }
    };

    handleMount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history, id]);

  /**
   * Updates profileData state object element change (form field).
   * @param {Object} event - Event Change Object
   */
  const handleChange = (event) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value,
    });
  };

  /**
   * Adds form field values to FormData object, updates the API and the current
   * user context.
   * @param {Object} event - Event Submit Object
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);

    if (imageFile?.current?.files[0]) {
      formData.append("image", imageFile?.current?.files[0]);
    }

    try {
      const { data } = await axiosReq.put(`/profiles/${id}/`, formData);
      setCurrentUser((currentUser) => ({
        ...currentUser,
        profile_image: data.image,
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
      <Form onSubmit={handleSubmit}>
        <Row className="d-flex flex-column flex-md-row mx-3 my-3 gap-3">
          {/* Profile Image */}
          <Col className="px-0">
            <Form.Group
              className={`${styles.AssetContainer} d-flex flex-column justify-content-center border border-2 rounded m-0 p-0`}
            >
              {image && (
                <figure>
                  <Image className={appStyles.Image} src={image} fluid />
                </figure>
              )}
              {errors?.image?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}
              <div>
                <Form.Label
                  className={`${btnStyles.Button} ${btnStyles.Primary} btn my-auto`}
                  htmlFor="image-upload"
                >
                  Change the image
                </Form.Label>
              </div>
              <Form.Control
                className="d-none"
                type="file"
                id="image-upload"
                accept="image/*"
                ref={imageFile}
                onChange={(e) => {
                  if (e.target.files.length) {
                    setProfileData({
                      ...profileData,
                      image: URL.createObjectURL(e.target.files[0]),
                    });
                  }
                }}
              />
            </Form.Group>
          </Col>
          {/* Form Fields */}
          <Col className="p-0">
            <Container className="p-4 h-100">
              <Form.Group>
                <Form.Label>Bio</Form.Label>
                <Form.Control
                  as="textarea"
                  value={description}
                  onChange={handleChange}
                  name="description"
                  rows={7}
                />
              </Form.Group>
              {errors?.description?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
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
            </Container>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
