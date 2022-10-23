import React from "react";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useHistory } from "react-router-dom";

import Asset from "../../components/Asset";
import btnStyles from "../../styles/Buttons.module.css";
import styles from "../../styles/PropertyCreateEditForm.module.css";

export default function PropertyCreateForm() {
  const history = useHistory();

  const formFields = (
    <div className="text-center">
      <Form.Group controlId="title">
        <Form.Label>Placeholder</Form.Label>
        <Form.Control type="text" />
      </Form.Group>
    </div>
  );

  const buttons = (
    <>
      <Button
        className={`${btnStyles.Button} ${btnStyles.Primary} me-3`}
        type="submit"
      >
        Create
      </Button>
      <Button
        className={`${btnStyles.Button} ${btnStyles.Primary}`}
        onClick={() => {
          history.goBack();
        }}
      >
        Cancel
      </Button>
    </>
  );

  return (
    <Container
      className={`${styles.FormContainer} mt-3 p-0 text-center rounded`}
    >
      <Form>
        <Row className="d-flex flex-column flex-md-row mx-3 my-3 gap-3">
          {/* Images */}
          <Col className="px-0">
            {/* Property Hero Image */}
            <Container
              className={`${styles.AssetContainer} d-flex flex-column justify-content-center border border-2 rounded p-0`}
            >
              <Form.Label
                className="d-flex flex-column justify-content-center"
                htmlFor="image-upload"
              >
                <Asset upload message="Property Image" />
              </Form.Label>
            </Container>
            {/* Floorplan Image */}
            <Container
              className={`${styles.AssetContainer} d-flex flex-column justify-content-center border border-2 rounded p-0 my-3`}
            >
              <Form.Label
                className="d-flex flex-column justify-content-center"
                htmlFor="image-upload"
              >
                <Asset upload message="Foorplan" />
              </Form.Label>
            </Container>
            {/* EPC Image */}
            <Container
              className={`${styles.AssetContainer} d-flex flex-column justify-content-center border border-2 rounded p-0`}
            >
              <Form.Label
                className="d-flex flex-column justify-content-center"
                htmlFor="image-upload"
              >
                <Asset upload message="EPC Cert" />
              </Form.Label>
            </Container>
          </Col>
          {/* Form Fields */}
          <Col className="p-0">
            <Container className="border border-2 p-2">{formFields}</Container>
          </Col>
        </Row>
        {/* Buttons */}
        <Container className="my-4">{buttons}</Container>
      </Form>
    </Container>
  );
}
