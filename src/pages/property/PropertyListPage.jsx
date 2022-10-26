import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useLocation } from "react-router-dom";

import { axiosReq } from "../../api/axiosDefaults";

// CREDIT: Adapted from Code Institute Moments Tutorial Project
// URL:    https://github.com/Code-Institute-Solutions/moments

export default function PropertyListPage() {
  const [property, setProperty] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  /**
   * Retrieve property data on component mount
   */
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosReq.get(`/property/`);
        setProperty(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    setHasLoaded(false);
    fetchPosts();
  }, [pathname]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Popular Sellers (Mobile)</p>
        {hasLoaded ? "Property Component" : "Loading Placeholder"}

        <Container>Notes</Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        Popular Seller (Desktop)
      </Col>
    </Row>
  );
}
