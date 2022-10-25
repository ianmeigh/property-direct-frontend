import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useParams } from "react-router-dom";

import { axiosReq } from "../../api/axiosDefaults";
import PropertyDetail from "./PropertyDetail";

// CREDIT: Adapted from Code Institute Moments Tutorial Project
// URL:    https://github.com/Code-Institute-Solutions/moments

export default function PropertyPage() {
  const { id } = useParams();
  const [property, setProperty] = useState({ results: [] });

  /**
   * Retrieve property data on component mount
   */
  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: property }] = await Promise.all([
          axiosReq.get(`/property/${id}`),
        ]);
        setProperty({ results: [property] });
        console.log(property);
      } catch (err) {
        console.log(err);
      }
    };
    handleMount();
  }, [id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Popular Sellers (Mobile)</p>
        <p>Property Detail</p>
        <Container>Notes</Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        Popular Seller (Desktop)
      </Col>
    </Row>
  );
}
