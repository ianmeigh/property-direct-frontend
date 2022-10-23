import React, { useState } from "react";

import { Image } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useHistory } from "react-router-dom";

import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";
import btnStyles from "../../styles/Buttons.module.css";
import styles from "../../styles/PropertyCreateEditForm.module.css";

export default function PropertyCreateForm() {
  const [propertyData, setPropertyData] = useState({
    image_hero: "",
    floorplan: "",
    epc: "",
    property_name: "",
    property_number: "",
    street_name: "",
    locality: "",
    city: "",
    postcode: "",
    description: "",
    price: "",
    property_type: "",
    tenure: "",
    council_tax_band: "",
    num_bedrooms: "",
    num_bathrooms: "",
    has_garden: false,
    has_parking: false,
    is_sold_stc: false,
  });
  const {
    image_hero,
    floorplan,
    epc,
    property_name,
    property_number,
    street_name,
    locality,
    city,
    postcode,
    description,
    price,
    property_type,
    tenure,
    council_tax_band,
    num_bedrooms,
    num_bathrooms,
    has_garden,
    has_parking,
    is_sold_stc,
  } = propertyData;
  const history = useHistory();

  const handleChange = (event) => {
    setPropertyData({
      ...propertyData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChecked = (event) =>
    setPropertyData({
      ...propertyData,
      [event.target.name]: event.target.checked,
    });

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(event.target.id);
      setPropertyData({
        ...propertyData,
        [event.target.id]: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(propertyData);
  };

  const imageFields = (
    <>
      {/* Property Hero Image */}
      <Form.Group
        className={`${styles.AssetContainer} d-flex flex-column justify-content-center border border-2 rounded m-0 p-0`}
      >
        {image_hero ? (
          <>
            <figure>
              <Image className={appStyles.Image} src={image_hero} rounded />
            </figure>
            <div>
              <Form.Label
                className={`${btnStyles.Button} ${btnStyles.Primary} btn`}
                htmlFor="image_hero"
              >
                Change the image
              </Form.Label>
            </div>
          </>
        ) : (
          <Form.Label
            className="d-flex flex-column justify-content-center"
            htmlFor="image_hero"
          >
            <Asset upload message="Upload a Property Image" />
          </Form.Label>
        )}
        <Form.Control
          className="d-none"
          type="file"
          id="image_hero"
          accept="image/"
          onChange={handleChangeImage}
        />
      </Form.Group>
      {/* Floorplan Image */}
      <Form.Group
        className={`${styles.AssetContainer} d-flex flex-column justify-content-center border border-2 rounded my-3 p-0`}
      >
        {floorplan ? (
          <>
            <figure>
              <Image className={appStyles.Image} src={floorplan} rounded />
            </figure>
            <div>
              <Form.Label
                className={`${btnStyles.Button} ${btnStyles.Primary} btn`}
                htmlFor="floorplan"
              >
                Change the image
              </Form.Label>
            </div>
          </>
        ) : (
          <Form.Label
            className="d-flex flex-column justify-content-center"
            htmlFor="floorplan"
          >
            <Asset upload message="Upload a Floorplan Image" />
          </Form.Label>
        )}
        <Form.Control
          className="d-none"
          type="file"
          id="floorplan"
          accept="image/"
          onChange={handleChangeImage}
        />
      </Form.Group>
      {/* EPC Image */}
      <Form.Group
        className={`${styles.AssetContainer} d-flex flex-column justify-content-center border border-2 rounded m-0 p-0`}
      >
        {epc ? (
          <>
            <figure>
              <Image className={appStyles.Image} src={epc} rounded />
            </figure>
            <div>
              <Form.Label
                className={`${btnStyles.Button} ${btnStyles.Primary} btn`}
                htmlFor="epc"
              >
                Change the image
              </Form.Label>
            </div>
          </>
        ) : (
          <Form.Label
            className="d-flex flex-column justify-content-center"
            htmlFor="epc"
          >
            <Asset upload message="Upload an EPCs Image" />
          </Form.Label>
        )}
        <Form.Control
          className="d-none"
          type="file"
          id="epc"
          accept="image/"
          onChange={handleChangeImage}
        />
      </Form.Group>
    </>
  );

  const formFields = (
    <div className="d-flex flex-column gap-3">
      <Form.Group controlId="property_name">
        <Form.Label>Property Name</Form.Label>
        <Form.Control
          className="text-center"
          type="text"
          name="property_name"
          value={property_name}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="property_number">
        <Form.Label>Property Number</Form.Label>
        <Form.Control
          className="text-center"
          type="number"
          name="property_number"
          value={property_number}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="street_name">
        <Form.Label>Street Name*</Form.Label>
        <Form.Control
          className="text-center"
          type="text"
          name="street_name"
          value={street_name}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="locality">
        <Form.Label>Locality*</Form.Label>
        <Form.Control
          className="text-center"
          type="text"
          name="locality"
          value={locality}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="city">
        <Form.Label>City*</Form.Label>
        <Form.Control
          className="text-center"
          type="text"
          name="city"
          value={city}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="postcode">
        <Form.Label>Postcode*</Form.Label>
        <Form.Control
          className="text-center"
          type="text"
          name="postcode"
          value={postcode}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="description">
        <Form.Label>Description*</Form.Label>
        <Form.Control
          className="text-center"
          as="textarea"
          rows={6}
          name="description"
          value={description}
          onChange={handleChange}
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
          value={price}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="property_type">
        <Form.Label>Property Type</Form.Label>
        <Form.Select
          name="property_type"
          value={property_type}
          onChange={handleChange}
        >
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
        <Form.Label>Tenure</Form.Label>
        <Form.Select name="tenure" value={tenure} onChange={handleChange}>
          <option value="">I don&apos;t know</option>
          <option value="freehold">Freehold</option>
          <option value="shared freehold">Shared freehold</option>
          <option value="leasehold">Leasehold</option>
          <option value="commonhold">Commonhold</option>
          <option value="shared ownership">Shared ownership</option>
        </Form.Select>
      </Form.Group>
      <Form.Group controlId="council_tax_band">
        <Form.Label>Council Tax Band</Form.Label>
        <Form.Select
          name="council_tax_band"
          value={council_tax_band}
          onChange={handleChange}
        >
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
        <Form.Label>Number of Bedrooms*</Form.Label>
        <Form.Control
          className="text-center"
          type="number"
          min="0"
          name="num_bedrooms"
          value={num_bedrooms}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="num_bathrooms">
        <Form.Label>Number of Bathrooms*</Form.Label>
        <Form.Control
          className="text-center"
          type="number"
          min="0"
          name="num_bathrooms"
          value={num_bathrooms}
          onChange={handleChange}
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
          value={has_garden}
          onChange={handleChecked}
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
          value={has_parking}
          onChange={handleChecked}
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
          value={is_sold_stc}
          onChange={handleChecked}
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
        onChange={() => {
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
      <Form onSubmit={handleSubmit}>
        <Row className="d-flex flex-column flex-md-row mx-3 my-3 gap-3">
          {/* Images */}
          <Col className="px-0">{imageFields}</Col>
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
