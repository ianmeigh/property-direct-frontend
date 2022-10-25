import React from "react";

import { Button, Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

import appStyles from "../../App.module.css";
import Avatar from "../../components/Avatar";
import btnStyles from "../../styles/Buttons.module.css";
import styles from "../../styles/PropertyDetail.module.css";

export default function PropertyDetail(props) {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    bookmark_id,
    bookmarks_count,
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
  } = props;

  const homes = ["detached", "semi-detached", "terraced", "end terrace"];

  return (
    <Container className={`${appStyles.ContentContainer} p-3 p-md-4 rounded`}>
      {/* Property Header */}
      <div className="d-flex flex-row justify-content-between">
        <h1 className="d-flex flex-column align-items-start align-content-start gap-2 mb-4 me-3">
          <span className={`${styles.PropertyHeadingFont} ${styles.Heading}`}>
            {num_bedrooms} bedroom {property_type}
            {homes.includes(property_type) ? " house" : ""}
          </span>
          <span
            className={`${styles.PropertyHeadingFont} ${styles.SubHeading}`}
          >
            {property_number ? property_number : property_name}, {street_name},{" "}
            {city}, {postcode}
          </span>
        </h1>
        <p className={`${styles.PropertyHeadingFont} ${styles.Price}`}>
          £{price}
        </p>
      </div>
      {/* Image and contact info */}
      <Card>
        <Card.Img src={image_hero} variant="top" />
        <Card.Body className="d-flex flex-column flex-md-row justify-content-md-between align-items-center">
          <Link className="d-md-none text-decoration-none text-black">
            <Avatar src={profile_image} mobile text={owner} />
          </Link>
          <Link className="d-none d-md-block text-decoration-none text-black">
            <Avatar src={profile_image} text={owner} />
          </Link>
          <span className="d-flex flex-row flex-wrap justify-content-center gap-2 mt-4 mt-md-0">
            {/* TODO: Property Contact Information */}
            <Button className="" variant="primary" onClick={() => {}}>
              <i className="fas fa-phone-alt pe-2"></i>
              Reveal Phone
            </Button>
            <Button variant="primary" onClick={() => {}}>
              <i className="fas fa-envelope pe-2"></i>
              Reveal Email
            </Button>
          </span>
        </Card.Body>
      </Card>
      {/* Property Info (# beds, etc) and bookmark icon */}
      <div className={`${styles.QuickInfo} mt-4`}>
        <span className="me-3">
          <i className="fas fa-bed pe-2"></i>
          {num_bedrooms} bed
        </span>
        <span>
          <i className="fas fa-bath pe-2"></i>
          {num_bathrooms} bath
        </span>
      </div>
      {/* Other images (Floorplan and EPC) */}
      <span className="d-flex flex-row flex-wrap justify-content-start gap-2 mt-4">
        {floorplan ? (
          <a
            href={floorplan}
            alt="Image of Property Floorplan (Opens in a new window)"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className={`${btnStyles.Button} ${btnStyles.Primary}`}>
              <i className="fas fa-map pe-2"></i>
              Floorplan
            </Button>
          </a>
        ) : (
          <Button className={`${btnStyles.Static} ${btnStyles.Primary}`}>
            <i className="fas fa-map pe-2"></i>
            No Floorplan Available
          </Button>
        )}
        {epc ? (
          <a
            href={epc}
            alt="Image of EPC Certificate (Opens in a new window)"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className={`${btnStyles.Button} ${btnStyles.Primary}`}>
              <i className="fas fa-star-half-alt pe-2"></i>
              EPC Cert
            </Button>
          </a>
        ) : (
          <Button className={`${btnStyles.Static} ${btnStyles.Primary}`}>
            <i className="fas fa-star-half-alt pe-2"></i>
            No EPC Cert Available
          </Button>
        )}
      </span>
      {/* Key Info */}
      <div className="mt-4">
        <h2>Key Information</h2>
        <ul>
          <li className="text-capitalize">
            {homes.includes(property_type)
              ? `${property_type} house`
              : property_type}
          </li>
          {tenure && <li className="text-capitalize">{tenure}</li>}
          {council_tax_band && (
            <li>
              <span>Council Tax Band - </span>
              <span className="text-uppercase">{council_tax_band}</span>
            </li>
          )}
          <li>{num_bedrooms} bed</li>
          <li>{num_bathrooms} bath</li>
          {has_garden && <li>Property has garden space</li>}
          {has_parking && <li>Property has dedicated parking</li>}
        </ul>
      </div>
      {/* Description */}
      <div className="mt-4">
        <h2>Description</h2>
        <p>{description}</p>
      </div>
      {/* Local Map */}
      <div className="mt-4">
        <h2>Local Map</h2>
        <div style={{ height: "350px", width: "100%" }}></div>
      </div>
    </Container>
  );
}
