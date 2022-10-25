import React from "react";

import { Button, Card, Container } from "react-bootstrap";

import appStyles from "../../App.module.css";
import Avatar from "../../components/Avatar";
import styles from "../../styles/PropertyDetail.module.css";

export default function PropertyDetail() {
  return (
    <Container className={`${appStyles.ContentContainer} p-3 p-md-4 rounded`}>
      {/* Property Header */}
      <div className="d-flex flex-row justify-content-between">
        <h1 className="d-flex flex-column align-items-start align-content-start gap-2 mb-4 me-3">
          <span className={`${styles.PropertyHeadingFont} ${styles.Heading}`}>
            2 bedroom terraced house
          </span>
          <span
            className={`${styles.PropertyHeadingFont} ${styles.SubHeading}`}
          >
            House Number, Street, City, POSTCODE
          </span>
        </h1>
        <p className={`${styles.PropertyHeadingFont} ${styles.Price}`}>
          £250,000
        </p>
      </div>
      {/* Image and contact info */}
      <Card style={{}}>
        <Card.Img className="" src="" variant="top" />
        <Card.Body className="d-flex flex-column flex-md-row justify-content-md-between align-items-center">
          <div className="d-md-none">
            <Avatar src="" mobile text="Placeholder" />
          </div>
          <div className="d-none d-md-block">
            <Avatar src="" text="Placeholder" />
          </div>
          <span className="d-flex flex-row flex-wrap justify-content-center gap-2 mt-4 mt-md-0">
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
          <i className="fas fa-bed pe-2"></i>2 bed
        </span>
        <span>
          <i className="fas fa-bath pe-2"></i>2 bath
        </span>
      </div>
      {/* Other images (Floorplan and EPC) */}
      <span className="d-flex flex-row flex-wrap justify-content-start gap-2 mt-4">
        <Button className="" variant="primary">
          <i className="fas fa-map pe-2"></i>
          Floorplan
        </Button>
        <Button variant="primary">
          <i className="fas fa-star-half-alt pe-2"></i>
          EPC Cert
        </Button>
      </span>
      {/* Key Info */}
      <div className="mt-4">
        <h2>Key Information</h2>
        <ul>
          <li>propertyType</li>
          <li>tenure</li>
          <li>councilTaxBand</li>
          <li>numBedrooms</li>
          <li>numBathrooms</li>
          <li>hasGarden</li>
          <li>hasParking</li>
        </ul>
      </div>
      {/* Description */}
      <div className="mt-4">
        <h2>Description</h2>
        <p>
          Occaecat et enim irure amet ullamco eu. Ut consectetur aute excepteur
          laborum voluptate aute magna nulla velit labore. Amet id culpa ex nisi
          ex sint tempor irure ad ad do. Incididunt enim sunt tempor irure Lorem
          amet fugiat exercitation nisi eu in. Laboris ut veniam irure non. Quis
          ad quis est officia commodo velit amet adipisicing ea commodo.
        </p>
      </div>
      {/* Local Map */}
      <div className="mt-4">
        <h2>Local Map</h2>
        <div style={{ height: "350px", width: "100%" }}></div>
      </div>
    </Container>
  );
}
