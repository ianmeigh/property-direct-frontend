import React, { useEffect, useState } from "react";

import { Alert, Button, Container, Form } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import InfiniteScroll from "react-infinite-scroll-component";
import { useLocation } from "react-router-dom";

import { axiosReq } from "../../api/axiosDefaults";
import appStyles from "../../App.module.css";
import NoResults from "../../assets/no-results.png";
import Asset from "../../components/Asset";
import btnStyles from "../../styles/Buttons.module.css";
import { fetchMoreData } from "../../utils/utils";
import PropertyDetail from "./PropertyDetail";

// CREDIT: Adapted from Code Institute Moments Tutorial Project
// URL:    https://github.com/Code-Institute-Solutions/moments

export default function PropertyListPage({ message, filter = "" }) {
  const [properties, setProperties] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  // Search State Variables
  const [postcode, setPostcode] = useState("");
  const [radius, setRadius] = useState(0.5);
  const [errors, setErrors] = useState({});

  /**
   * Fetch properties within the supplied radius (miles) from a point of origin
   * postcode. If no radius or postcode are supplied will return all properties
   * matching the filter prop.
   * @param {String} postcode - UK Postcode
   * @param {Float} radius - Float representing distance in miles
   */
  const fetchProperties = async (postcode = "", radius = "") => {
    // Clear any previous errors before attempting another search
    setErrors({});
    try {
      const { data } = await axiosReq.get(
        `/property/?postcode=${postcode}&radius=${radius}&${filter}`
      );
      setProperties(data);
      setHasLoaded(true);
    } catch (err) {
      setErrors(err.response?.data);
      setHasLoaded(true);
      console.log(err.response?.data);
    }
  };

  /**
   * Function to handle Search form submission
   * @param {Object} event - onClick event for form submit button
   */
  const handleSubmit = (event) => {
    console.log(event);
    event.preventDefault();
    setHasLoaded(false);
    fetchProperties(postcode, radius);
  };

  /**
   * Retrieve property data matching filter prop on component mount
   */
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosReq.get(`/property/?${filter}`);
        setProperties(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    setHasLoaded(false);
    fetchPosts();
  }, [pathname, filter]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Popular Sellers (Mobile)</p>
        <Col
          className={`${appStyles.ContentContainer} p-3 p-md-4 rounded mb-4`}
        >
          {/* Search Form */}
          <Form onSubmit={handleSubmit}>
            <div className="d-flex gap-3 mb-3">
              {/* Postcode Input */}
              <Form.Group
                className="d-flex align-items-end w-50"
                controlId="postcode"
              >
                <Form.Label className="me-2">Postcode</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="postcode"
                  value={postcode}
                  onChange={(event) => setPostcode(event.target.value)}
                />
              </Form.Group>
              {/* Radius Select */}
              <Form.Group
                className="d-flex align-items-end w-50"
                controlId="radius"
              >
                <Form.Label className="me-2">Radius</Form.Label>
                <Form.Select
                  name="radius"
                  value={radius}
                  onChange={(event) => setRadius(event.target.value)}
                  aria-label="Search Radius"
                >
                  <option value="0.5">0.5 miles</option>
                  <option value="1">1 miles</option>
                  <option value="50">50 miles</option>
                </Form.Select>
              </Form.Group>
            </div>
            {/* Postcode error Feedback */}
            {errors.postcode?.map((detail) => (
              <Alert className="text-center" key={detail} variant="warning">
                {detail}
              </Alert>
            ))}
            <div className="d-flex d-column flex-sm-row justify-content-between">
              {/* Filter Button */}
              <Button
                className={`${btnStyles.Button} ${btnStyles.Primary} btn`}
                type="button"
                onClick={() => {}}
              >
                <i className="fas fa-filter"></i>
                <span className="d-none d-sm-inline ms-2">Show Filters</span>
              </Button>
              {/* Search submission and Clear buttons */}
              <div>
                <Button
                  className={`${btnStyles.Button} ${btnStyles.Primary} btn me-2`}
                  type="submit"
                >
                  <i className="fas fa-search"></i>
                  <span className="d-none d-sm-inline ms-2">Search</span>
                </Button>
                <Button
                  className={`${btnStyles.Button} ${btnStyles.Primary} btn`}
                  type="button"
                  onClick={() => {
                    fetchProperties();
                  }}
                >
                  <i className="fas fa-eraser"></i>
                  <span className="d-none d-sm-inline ms-2">Clear Search</span>
                </Button>
              </div>
            </div>
          </Form>
        </Col>
        <Col
          className={`${appStyles.ContentContainer} pt-4 px-3 px-md-4 rounded`}
        >
          {hasLoaded ? (
            <>
              {properties.results.length ? (
                <InfiniteScroll
                  dataLength={properties.results.length}
                  loader={<Asset spinner />}
                  hasMore={!!properties.next}
                  next={() => {
                    fetchMoreData(properties, setProperties);
                  }}
                >
                  {properties.results.map((property) => (
                    <PropertyDetail
                      key={property.id}
                      {...property}
                      setProperties={setProperties}
                    />
                  ))}
                </InfiniteScroll>
              ) : (
                <Container className={appStyles.Content}>
                  <Asset src={NoResults} message={message} />
                </Container>
              )}
            </>
          ) : (
            <Asset spinner />
          )}
        </Col>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        Popular Seller (Desktop)
      </Col>
    </Row>
  );
}
