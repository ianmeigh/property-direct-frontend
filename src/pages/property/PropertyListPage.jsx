import React, { useEffect, useState } from "react";

import { Alert, Button, Container, Form, Offcanvas } from "react-bootstrap";
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
import PopularProfiles from "../profiles/PopularProfiles";
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
  const [show, setShow] = useState(false);
  // Search Filter State Variables
  const [searchFilters, setSearchFilters] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState("");
  const [minBedrooms, setMinBedrooms] = useState(0);
  const [maxBedrooms, setMaxBedrooms] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [hasGarden, setHasGarden] = useState("");
  const [hasParking, setHasParking] = useState("");
  const [isSoldSTC, setIsSoldSTC] = useState("");

  /**
   * Retrieve property data matching filter prop on component mount and when
   * either the pathname, filter change
   */
  useEffect(() => {
    clearSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, filter]);

  /**
   * Retrieve property data when the searchFilters change
   */
  useEffect(() => {
    setHasLoaded(false);
    fetchProperties(postcode, radius);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchFilters]);

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
        `/property/?postcode=${postcode}&radius=${radius}&${filter}&${searchFilters}`
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
    event.preventDefault();
    setHasLoaded(false);
    fetchProperties(postcode, radius);
  };

  /**
   * Reset Postcode, Radius and all Search filters to default values.
   */
  const clearSearch = () => {
    if (postcode !== "") {
      setPostcode("");
      setRadius(0.5);
      fetchProperties();
    }
    if (searchFilters !== "") {
      clearSearchFilters();
      setSearchFilters("");
    } else {
      fetchProperties();
    }
  };

  /** Set searchFilters to initial values */
  const clearSearchFilters = () => {
    setMinPrice(0);
    setMaxPrice("");
    setMinBedrooms(0);
    setMaxBedrooms("");
    setPropertyType("");
    setHasGarden("");
    setHasParking("");
    setIsSoldSTC("");
  };

  /**
   * Update the search filters and close the offCanvas element
   */
  const handleClose = () => {
    setSearchFilters(
      `price_min=${minPrice}` +
        `&price_max=${maxPrice}` +
        `&property_type=${propertyType}` +
        `&bedrooms_min=${minBedrooms}` +
        `&bedrooms_max=${maxBedrooms}` +
        `&has_garden=${hasGarden}` +
        `&has_parking=${hasParking}` +
        `&is_sold_stc=${isSoldSTC ? false : ""}`
    );
    setShow(false);
  };

  /** Show the offCanvas element */
  const handleShow = () => setShow(true);

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
              {/* Filter Button and Offcanvas element */}
              <Button
                className={`${btnStyles.Button} ${btnStyles.Primary} btn`}
                type="button"
                onClick={handleShow}
              >
                <i className="fas fa-filter"></i>
                <span className="d-none d-sm-inline ms-2">Show Filters</span>
              </Button>
              <Offcanvas show={show} onHide={handleClose} placement="end">
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title>Filters</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Form onSubmit={handleClose}>
                    {/* Min and Max Price Filter */}
                    <div className="d-flex gap-3 mb-4">
                      <Form.Group
                        className="text-center w-50"
                        controlId="minPrice"
                      >
                        <Form.Label className="me-2">Min Price</Form.Label>
                        <Form.Control
                          className="text-center"
                          type="number"
                          name="minPrice"
                          value={minPrice}
                          onChange={(event) => setMinPrice(event.target.value)}
                          min={0}
                          step={50000}
                        />
                      </Form.Group>
                      <Form.Group
                        className="text-center w-50"
                        controlId="maxPrice"
                      >
                        <Form.Label className="me-2">Max Price</Form.Label>
                        <Form.Control
                          className="text-center"
                          type="number"
                          name="maxPrice"
                          value={maxPrice}
                          onChange={(event) => setMaxPrice(event.target.value)}
                          min={0}
                          step={50000}
                        />
                      </Form.Group>
                    </div>
                    <hr />
                    {/* Min and Max Bedrooms Filter */}
                    <div className="d-flex gap-3 mb-4">
                      <Form.Group
                        className="text-center w-50"
                        controlId="minBedrooms"
                      >
                        <Form.Label className="me-2">Min Bedrooms</Form.Label>
                        <Form.Control
                          className="text-center"
                          type="number"
                          name="minBedrooms"
                          value={minBedrooms}
                          onChange={(event) =>
                            setMinBedrooms(event.target.value)
                          }
                          min={0}
                          step={1}
                        />
                      </Form.Group>
                      <Form.Group
                        className="text-center w-50"
                        controlId="maxBedrooms"
                      >
                        <Form.Label className="me-2">Max Bedrooms</Form.Label>
                        <Form.Control
                          className="text-center"
                          type="number"
                          name="maxBedrooms"
                          value={maxBedrooms}
                          onChange={(event) =>
                            setMaxBedrooms(event.target.value)
                          }
                          min={0}
                          step={1}
                        />
                      </Form.Group>
                    </div>
                    <hr />
                    {/* Property Type */}
                    <Form.Group
                      className="text-center mb-4"
                      controlId="propertyType"
                    >
                      <Form.Label>Property Type</Form.Label>
                      <Form.Select
                        className="text-center"
                        name="propertyType"
                        value={propertyType}
                        onChange={(event) => {
                          setPropertyType(event.target.value);
                        }}
                      >
                        <option value="">All Types</option>
                        <option value="apartment">Apartment</option>
                        <option value="detached">Detached</option>
                        <option value="semi-detached">Semi-detached</option>
                        <option value="terraced">Terraced</option>
                        <option value="end terrace">End Terrace</option>
                        <option value="cottage">Cottage</option>
                        <option value="bungalows">Bungalows</option>
                      </Form.Select>
                    </Form.Group>
                    <hr />
                    {/* Property must have a Garden */}
                    <Form.Group
                      className="align-self-center text-start"
                      controlId="hasGarden"
                    >
                      <Form.Check
                        className="pb-3 pt-2"
                        label="Must have a Garden?"
                        name="hasGarden"
                        checked={hasGarden}
                        onChange={(event) => {
                          event.target.checked === false
                            ? setHasGarden("")
                            : setHasGarden(event.target.checked);
                        }}
                      />
                    </Form.Group>
                    {/* Property must have Parking */}
                    <Form.Group
                      className="align-self-center text-start"
                      controlId="hasParking"
                    >
                      <Form.Check
                        className="pb-3"
                        label="Must have dedicated parking?"
                        name="hasParking"
                        checked={hasParking}
                        onChange={(event) => {
                          event.target.checked === false
                            ? setHasParking("")
                            : setHasParking(event.target.checked);
                        }}
                      />
                    </Form.Group>
                    {/* Exclude properties Sold STC */}
                    <Form.Group
                      className="align-self-center text-start mb-4"
                      controlId="isSoldSTC"
                    >
                      <Form.Check
                        className=""
                        label="Hide properties that are Sold STC?"
                        name="isSoldSTC"
                        checked={isSoldSTC}
                        onChange={(event) => {
                          setIsSoldSTC(event.target.checked);
                        }}
                      />
                    </Form.Group>
                    <hr />
                    <div className="text-center mt-4">
                      <Button
                        className={`${btnStyles.Button} ${btnStyles.Primary} btn me-3`}
                        type="button"
                        onClick={handleClose}
                      >
                        <i className="fas fa-search"></i>
                        <span className="ms-2">Save Filters</span>
                      </Button>
                      <Button
                        className={`${btnStyles.Button} ${btnStyles.Primary} btn`}
                        type="button"
                        onClick={clearSearchFilters}
                      >
                        <i className="fas fa-eraser"></i>
                        <span className="ms-2">Clear Filters</span>
                      </Button>
                    </div>
                  </Form>
                </Offcanvas.Body>
              </Offcanvas>
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
                  onClick={clearSearch}
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
              <div className="text-center mb-4">
                {pathname === "/" && properties.count !== 0 && (
                  <h4>{properties.count} Properties Available</h4>
                )}
              </div>
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
        <PopularProfiles />
      </Col>
    </Row>
  );
}
