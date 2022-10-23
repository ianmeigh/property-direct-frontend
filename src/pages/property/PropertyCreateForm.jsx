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
    <div className="d-flex flex-column gap-3">
      <Form.Group controlId="property_name">
        <Form.Label>Property Name</Form.Label>
        <Form.Control
          className="text-center"
          type="text"
          name="property_name"
        />
      </Form.Group>
      <Form.Group controlId="property_number">
        <Form.Label>Property Number</Form.Label>
        <Form.Control
          className="text-center"
          type="number"
          name="property_number"
        />
      </Form.Group>
      <Form.Group controlId="street_name">
        <Form.Label>Street Name*</Form.Label>
        <Form.Control className="text-center" type="text" name="street_name" />
      </Form.Group>
      <Form.Group controlId="locality">
        <Form.Label>Locality*</Form.Label>
        <Form.Control className="text-center" type="text" name="locality" />
      </Form.Group>
      <Form.Group controlId="city">
        <Form.Label>City*</Form.Label>
        <Form.Control className="text-center" type="text" name="city" />
      </Form.Group>
      <Form.Group controlId="postcode">
        <Form.Label>Postcode*</Form.Label>
        <Form.Control className="text-center" type="text" name="postcode" />
      </Form.Group>
      <Form.Group controlId="description">
        <Form.Label>Description*</Form.Label>
        <Form.Control
          className="text-center"
          as="textarea"
          rows={6}
          name="description"
        />
      </Form.Group>
      <Form.Group controlId="price">
        <Form.Label>Price*</Form.Label>
        <Form.Control
          className="text-center"
          type="number"
          min="0"
          step="1.00"
          name="price"
        />
      </Form.Group>
      <Form.Group controlId="property_type">
        <Form.Label>property_type</Form.Label>
        <Form.Select name="property_type">
          <option value="apartment">Apartment</option>
          <option value="detached">Detached</option>
          <option value="semi-detached">Semi-detached</option>
          <option value="terraced">Terraced</option>
          <option value="end terrace">End Terrace</option>
          <option value="cottage">Cottage</option>
          <option value="bungalows">Bungalows</option>
        </Form.Select>
      </Form.Group>
      <Form.Group controlId="tenure">
        <Form.Label>tenure</Form.Label>
        <Form.Select name="tenure">
          <option value="">I don&apos;t know</option>
          <option value="freehold">Freehold</option>
          <option value="shared freehold">Shared freehold</option>
          <option value="leasehold">Leasehold</option>
          <option value="commonhold">Commonhold</option>
          <option value="shared ownership">Shared ownership</option>
        </Form.Select>
      </Form.Group>
      <Form.Group controlId="council_tax_band">
        <Form.Label>council_tax_band</Form.Label>
        <Form.Select name="council_tax_band">
          <option value="">I don&apos;t know</option>
          <option value="a">A</option>
          <option value="b">B</option>
          <option value="c">C</option>
          <option value="d">D</option>
          <option value="e">E</option>
          <option value="f">F</option>
          <option value="g">G</option>
          <option value="h">H</option>
        </Form.Select>
      </Form.Group>
      <Form.Group controlId="num_bedrooms">
        <Form.Label>num_bedrooms*</Form.Label>
        <Form.Control
          className="text-center"
          type="number"
          min="0"
          name="num_bedrooms"
        />
      </Form.Group>
      <Form.Group controlId="num_bathrooms">
        <Form.Label>num_bathrooms*</Form.Label>
        <Form.Control
          className="text-center"
          type="number"
          min="0"
          name="num_bathrooms"
        />
      </Form.Group>

      <Form.Group
        className="align-self-center text-start"
        controlId="has_garden"
      >
        <Form.Check
          className="pb-3 pt-2"
          label="Does it have a Garden?"
          name="has_garden"
        />
      </Form.Group>
      <Form.Group
        className="align-self-center text-start"
        controlId="has_parking"
      >
        <Form.Check
          className="pb-3"
          label="Is there dedicated parking?"
          name="has_parking"
        />
      </Form.Group>
      <Form.Group
        className="align-self-center text-start"
        controlId="is_sold_stc"
      >
        <Form.Check
          className="pb-3"
          label="Is the property Sold STC?"
          name="is_sold_stc"
        />
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
                <Asset upload message="Upload a Property Image" />
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
                <Asset upload message="Upload a Floorplan" />
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
                <Asset upload message="Upload an EPC Cert" />
              </Form.Label>
            </Container>
          </Col>
          {/* Form Fields */}
          <Col className="p-0">
            <Container className="border border-2 p-4">{formFields}</Container>
          </Col>
        </Row>
        {/* Buttons */}
        <Container className="my-4">{buttons}</Container>
      </Form>
    </Container>
  );
}
