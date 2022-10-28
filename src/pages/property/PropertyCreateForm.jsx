import React, { useEffect, useRef, useState } from "react";

import { Alert, Image } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useHistory, useParams } from "react-router-dom";

import { axiosReq } from "../../api/axiosDefaults";
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";
import btnStyles from "../../styles/Buttons.module.css";
import styles from "../../styles/PropertyCreateEditForm.module.css";

export default function PropertyCreateForm() {
  const imageHeroFileInput = useRef(null);
  const floorplanFileInput = useRef(null);
  const epcFileInput = useRef(null);

  // If an 'id' is supplied as a parameter in the route path then set
  // 'isEditing' to true. This variable is used to determine if the property
  // information should be retrieved and used to populate the propertyData object
  // and therefore the form fields.
  const { id } = useParams();
  const isEditing = !!id;

  const [errors, setErrors] = useState({});

  const [propertyData, setPropertyData] = useState({
    imageHero: "",
    floorplan: "",
    epc: "",
    propertyName: "",
    propertyNumber: "",
    streetName: "",
    locality: "",
    city: "",
    postcode: "",
    description: "",
    price: "",
    propertyType: "apartment",
    tenure: "",
    councilTaxBand: "",
    numBedrooms: "",
    numBathrooms: "",
    hasGarden: false,
    hasParking: false,
    isSoldSTC: false,
  });

  const {
    imageHero,
    floorplan,
    epc,
    propertyName,
    propertyNumber,
    streetName,
    locality,
    city,
    postcode,
    description,
    price,
    propertyType,
    tenure,
    councilTaxBand,
    numBedrooms,
    numBathrooms,
    hasGarden,
    hasParking,
    isSoldSTC,
  } = propertyData;

  const history = useHistory();

  // When the component mounts, set the all propertyData fields to their
  // blank/undefined state. This handles the scenario where a user can navigate
  // from editing a property directly to creating a new one.
  //
  // If the form is being used for editing a property, fetch the property data
  // and display it the forms fields.
  useEffect(() => {
    setPropertyData({
      imageHero: "",
      floorplan: "",
      epc: "",
      propertyName: "",
      propertyNumber: "",
      streetName: "",
      locality: "",
      city: "",
      postcode: "",
      description: "",
      price: "",
      propertyType: "apartment",
      tenure: "",
      councilTaxBand: "",
      numBedrooms: "",
      numBathrooms: "",
      hasGarden: false,
      hasParking: false,
      isSoldSTC: false,
    });
    if (isEditing) {
      const handleMount = async () => {
        try {
          const { data } = await axiosReq.get(`/property/${id}`);
          const {
            image_hero,
            property_name,
            property_number,
            street_name,
            property_type,
            council_tax_band,
            num_bedrooms,
            num_bathrooms,
            has_garden,
            has_parking,
            is_sold_stc,
            is_owner,
          } = data;
          // If current user is not the owner of the property, redirect them
          // back to the home page.
          is_owner
            ? setPropertyData({
                ...data,
                imageHero: image_hero,
                propertyName: property_name,
                propertyNumber: property_number,
                streetName: street_name,
                propertyType: property_type,
                councilTaxBand: council_tax_band,
                numBedrooms: num_bedrooms,
                numBathrooms: num_bathrooms,
                hasGarden: has_garden,
                hasParking: has_parking,
                isSoldSTC: is_sold_stc,
              })
            : history.push("/");
        } catch (err) {
          console.log(err);
        }
      };
      handleMount();
    }
  }, [isEditing, id, history]);

  /**
   * Updates propertyData if input fields are modified.
   */
  const handleChange = (event) => {
    setPropertyData({
      ...propertyData,
      [event.target.name]: event.target.value,
    });
  };

  /**
   * Updates propertyData if checkbox fields are modified.
   */
  const handleChecked = (event) =>
    setPropertyData({
      ...propertyData,
      [event.target.name]: event.target.checked,
    });

  /**
   * If the image selection is modified by the user the existing URL will be
   * revoked.
   *
   * Updates propertyData with a URL of the image from the file input.
   */
  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(event.target.id);
      setPropertyData({
        ...propertyData,
        [event.target.id]: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  /**
   * Revokes image URL, sets the image variable in propertyData and the File
   * Field elements current value to an empty string.
   * @param {object} fileInputRef - Reference to DOM element
   */
  const handleClearImage = (fileInputRef) => {
    URL.revokeObjectURL(propertyData[fileInputRef.current.id]);
    setPropertyData({
      ...propertyData,
      [fileInputRef.current.id]: "",
    });
    fileInputRef.current.value = "";
  };

  /**
   * Post form data to the API
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append(
      "image_hero",
      imageHeroFileInput.current.files[0]
        ? imageHeroFileInput.current.files[0]
        : ""
    );
    formData.append(
      "floorplan",
      floorplanFileInput.current.files[0]
        ? floorplanFileInput.current.files[0]
        : ""
    );
    formData.append(
      "epc",
      epcFileInput.current.files[0] ? epcFileInput.current.files[0] : ""
    );
    formData.append("property_name", propertyName);
    formData.append("property_number", propertyNumber);
    formData.append("street_name", streetName);
    formData.append("locality", locality);
    formData.append("city", city);
    formData.append("postcode", postcode);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("property_type", propertyType);
    formData.append("tenure", tenure);
    formData.append("council_tax_band", councilTaxBand);
    formData.append("num_bedrooms", numBedrooms);
    formData.append("num_bathrooms", numBathrooms);
    formData.append("has_garden", hasGarden);
    formData.append("has_parking", hasParking);
    formData.append("is_sold_stc", isSoldSTC);

    try {
      let response = {};
      if (isEditing) {
        response = await axiosReq.put(`/property/${id}/`, formData);
      } else {
        response = await axiosReq.post("/property/create/", formData);
      }
      history.push(`/property/${response.data.id}/`);
    } catch (err) {
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const imageFields = (
    <>
      {/* Property Hero Image */}
      <Form.Group
        className={`${styles.AssetContainer} d-flex flex-column justify-content-center border border-2 rounded m-0 p-0`}
      >
        {imageHero ? (
          <>
            <figure>
              <Image className={appStyles.Image} src={imageHero} rounded />
            </figure>
            <div className="d-flex gap-2 justify-content-center align-items-baseline">
              <Form.Label
                className={`${btnStyles.Button} ${btnStyles.Primary} btn`}
                htmlFor="imageHero"
              >
                Change image
              </Form.Label>
              {/* Only allow images to be cleared during property creation */}
              {!isEditing && (
                <Button
                  className={`${btnStyles.Button} ${btnStyles.Primary}`}
                  onClick={() => handleClearImage(imageHeroFileInput)}
                >
                  Clear Image
                </Button>
              )}
            </div>
          </>
        ) : (
          <Form.Label
            className="d-flex flex-column justify-content-center"
            htmlFor="imageHero"
          >
            <Asset upload message="Upload a Property Image" />
          </Form.Label>
        )}
        <Form.Control
          className="d-none"
          type="file"
          id="imageHero"
          accept="image/*"
          onChange={handleChangeImage}
          ref={imageHeroFileInput}
        />
      </Form.Group>
      {errors.image_hero?.map((message, idx) => (
        <Alert className="mt-3" variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      {/* Floorplan Image */}
      <Form.Group
        className={`${styles.AssetContainer} d-flex flex-column justify-content-center border border-2 rounded my-3 p-0`}
      >
        {floorplan ? (
          <>
            <figure>
              <Image className={appStyles.Image} src={floorplan} rounded />
            </figure>
            <div className="d-flex gap-2 justify-content-center align-items-baseline">
              <Form.Label
                className={`${btnStyles.Button} ${btnStyles.Primary} btn`}
                htmlFor="floorplan"
              >
                Change the image
              </Form.Label>
              {/* Only allow images to be cleared during property creation */}
              {!isEditing && (
                <Button
                  className={`${btnStyles.Button} ${btnStyles.Primary}`}
                  onClick={() => handleClearImage(floorplanFileInput)}
                >
                  Clear Image
                </Button>
              )}
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
          accept="image/*"
          onChange={handleChangeImage}
          ref={floorplanFileInput}
        />
      </Form.Group>
      {errors.floorplan?.map((message, idx) => (
        <Alert className="mt-3" variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      {/* EPC Image */}
      <Form.Group
        className={`${styles.AssetContainer} d-flex flex-column justify-content-center border border-2 rounded m-0 p-0`}
      >
        {epc ? (
          <>
            <figure>
              <Image className={appStyles.Image} src={epc} rounded />
            </figure>
            <div className="d-flex gap-2 justify-content-center align-items-baseline">
              <Form.Label
                className={`${btnStyles.Button} ${btnStyles.Primary} btn`}
                htmlFor="epc"
              >
                Change the image
              </Form.Label>
              {/* Only allow images to be cleared during property creation */}
              {!isEditing && (
                <Button
                  className={`${btnStyles.Button} ${btnStyles.Primary}`}
                  onClick={() => handleClearImage(epcFileInput)}
                >
                  Clear Image
                </Button>
              )}
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
          accept="image/*"
          onChange={handleChangeImage}
          ref={epcFileInput}
        />
      </Form.Group>
      {errors.epc?.map((message, idx) => (
        <Alert className="mt-3" variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
    </>
  );

  const formFields = (
    <div className="d-flex flex-column gap-3">
      <Form.Group controlId="propertyName">
        <Form.Label>Property Name</Form.Label>
        <Form.Control
          className="text-center"
          type="text"
          name="propertyName"
          value={propertyName}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="propertyNumber">
        <Form.Label>Property Number</Form.Label>
        <Form.Control
          className="text-center"
          type="number"
          name="propertyNumber"
          value={propertyNumber}
          onChange={handleChange}
        />
      </Form.Group>
      {errors.property_number?.map((message, idx) => (
        <Alert className="mt-3" variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group controlId="streetName">
        <Form.Label>Street Name*</Form.Label>
        <Form.Control
          className="text-center"
          type="text"
          name="streetName"
          value={streetName}
          onChange={handleChange}
        />
      </Form.Group>
      {errors.street_name?.map((message, idx) => (
        <Alert className="mt-3" variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
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
      {errors.locality?.map((message, idx) => (
        <Alert className="mt-3" variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
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
      {errors.city?.map((message, idx) => (
        <Alert className="mt-3" variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
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
      {errors.postcode?.map((message, idx) => (
        <Alert className="mt-3" variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
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
      {errors.description?.map((message, idx) => (
        <Alert className="mt-3" variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
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
      {errors.price?.map((message, idx) => (
        <Alert className="mt-3" variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group controlId="propertyType">
        <Form.Label>Property Type</Form.Label>
        <Form.Select
          name="propertyType"
          value={propertyType}
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
      <Form.Group controlId="councilTaxBand">
        <Form.Label>Council Tax Band</Form.Label>
        <Form.Select
          name="councilTaxBand"
          value={councilTaxBand}
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
      <Form.Group controlId="numBedrooms">
        <Form.Label>Number of Bedrooms*</Form.Label>
        <Form.Control
          className="text-center"
          type="number"
          min="0"
          name="numBedrooms"
          value={numBedrooms}
          onChange={handleChange}
        />
      </Form.Group>
      {errors.num_bedrooms?.map((message, idx) => (
        <Alert className="mt-3" variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group controlId="numBathrooms">
        <Form.Label>Number of Bathrooms*</Form.Label>
        <Form.Control
          className="text-center"
          type="number"
          min="0"
          name="numBathrooms"
          value={numBathrooms}
          onChange={handleChange}
        />
      </Form.Group>
      {errors.num_bathrooms?.map((message, idx) => (
        <Alert className="mt-3" variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group
        className="align-self-center text-start"
        controlId="hasGarden"
      >
        <Form.Check
          className="pb-3 pt-2"
          label="Does it have a Garden?"
          name="hasGarden"
          checked={hasGarden}
          onChange={handleChecked}
        />
      </Form.Group>
      <Form.Group
        className="align-self-center text-start"
        controlId="hasParking"
      >
        <Form.Check
          className="pb-3"
          label="Is there dedicated parking?"
          name="hasParking"
          checked={hasParking}
          onChange={handleChecked}
        />
      </Form.Group>
      <Form.Group
        className="align-self-center text-start"
        controlId="isSoldSTC"
      >
        <Form.Check
          className="pb-3"
          label="Is the property Sold STC?"
          name="isSoldSTC"
          checked={isSoldSTC}
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
        {isEditing ? "Save" : "Create"}
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
      className={`${appStyles.ContentContainer} mt-3 p-0 text-center rounded`}
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
