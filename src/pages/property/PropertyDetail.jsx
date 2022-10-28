import React from "react";

import {
  Button,
  Card,
  Col,
  Image,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { Link } from "react-router-dom";

import { axiosRes } from "../../api/axiosDefaults";
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";
import Avatar from "../../components/Avatar";
import Map from "../../components/Map";
import MoreActionsDropdown from "../../components/MoreActionsDropdown";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
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
    created_at,
    updated_at,
    image_hero,
    floorplan,
    epc,
    property_name,
    property_number,
    street_name,
    locaḷity,
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
    longitude,
    latitude,
    setProperties,
    detailView,
  } = props;

  const houseTypes = ["detached", "semi-detached", "terraced", "end terrace"];

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const handleBookmark = async () => {
    try {
      const { data } = await axiosRes.post("/bookmarks/", { property: id });
      setProperties((prevProperty) => ({
        ...prevProperty,
        results: prevProperty.results.map((property) => {
          return property.id === id
            ? {
                ...property,
                bookmark_id: data.id,
              }
            : property;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemoveBookmark = async () => {
    try {
      await axiosRes.delete(`/bookmarks/${bookmark_id}/`);
      setProperties((prevProperty) => ({
        ...prevProperty,
        results: prevProperty.results.map((property) => {
          return property.id === id
            ? {
                ...property,
                bookmark_id: null,
              }
            : property;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {detailView ? (
        <Col className={`${appStyles.ContentContainer} p-3 p-md-4 rounded`}>
          {/* Edit Menu */}
          {is_owner && detailView && (
            <div className="d-flex justify-content-end pb-3">
              <MoreActionsDropdown />
            </div>
          )}
          {/* Property Header */}
          <div className="d-flex flex-row justify-content-between">
            <h1 className="d-flex flex-column align-items-start align-content-start gap-2 mb-4 me-3">
              <span
                className={`${styles.PropertyHeadingFont} ${styles.Heading}`}
              >
                {num_bedrooms} bedroom {property_type}
                {houseTypes.includes(property_type) ? " house" : ""}
              </span>
              <span
                className={`${styles.PropertyHeadingFont} ${styles.SubHeading}`}
              >
                {property_number ? property_number : property_name},{" "}
                {street_name}, {city}, {postcode}
              </span>
            </h1>
            <p className={`${styles.PropertyHeadingFont} ${styles.Price}`}>
              £{price}
            </p>
          </div>
          <p className="text-muted">
            {created_at === updated_at
              ? `Listed on ${created_at}`
              : `Last updated on ${updated_at}`}
          </p>
          {/* Image and contact info */}
          <Card>
            <Card.Img src={image_hero} variant="top" />
            <Card.Body className="d-flex flex-column flex-md-row justify-content-md-between align-items-center">
              <Link
                to={`/profiles/${profile_id}`}
                className="d-md-none text-decoration-none text-black"
              >
                <Avatar src={profile_image} mobile text={owner} />
              </Link>
              <Link
                to={`/profiles/${profile_id}`}
                className="d-none d-md-block text-decoration-none text-black"
              >
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
          <div className="d-flex flex-row justify-content-between align-items-center px-3 mt-4">
            <div className={`${styles.QuickInfo}`}>
              <span className="me-3">
                <i className="fas fa-bed pe-2"></i>
                {num_bedrooms} bed
              </span>
              <span>
                <i className="fas fa-bath pe-2"></i>
                {num_bathrooms} bath
              </span>
            </div>
            {/* Bookmark Logic */}
            {bookmark_id ? (
              <span onClick={handleRemoveBookmark}>
                <i
                  className={`fas fa-bookmark fa-2x ${styles.CursorPointer}`}
                ></i>
              </span>
            ) : currentUser ? (
              <span onClick={handleBookmark}>
                <i
                  className={`far fa-bookmark fa-2x ${styles.CursorPointer}`}
                ></i>
              </span>
            ) : (
              <OverlayTrigger
                placement="left"
                overlay={
                  <Tooltip>Please login to bookmark properties.</Tooltip>
                }
              >
                <i
                  className={`far fa-bookmark fa-2x ${styles.CursorNotAllowed}`}
                ></i>
              </OverlayTrigger>
            )}
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
                {houseTypes.includes(property_type)
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
            <div className={styles.Map}>
              {latitude ? (
                <Map latitude={latitude} longitude={longitude} />
              ) : (
                <Asset spinner />
              )}
            </div>
          </div>
        </Col>
      ) : (
        <Col md={12} className="shadow mb-4">
          <div className="d-flex flex-column flex-xxl-row border rounded-top overflow-hidden position-relative">
            <Col xxl={6}>
              <Image src={image_hero} className={`${styles.PropertyImage}`} />
            </Col>
            {/* Text Context and Price (below xxl breakpoint) */}
            <Col className="d-flex flex-xxl-column flex-column-reverse">
              {/* Text Content */}
              <div className="p-4 d-flex flex-column h-100">
                <div className="d-flex justify-content-between">
                  <h3 className="m-0">£{price}</h3>
                  {/* Bookmark Logic */}
                  {bookmark_id ? (
                    <span onClick={handleRemoveBookmark}>
                      <i
                        className={`fas fa-bookmark fa-2x ${styles.CursorPointer}`}
                      ></i>
                    </span>
                  ) : currentUser ? (
                    <span onClick={handleBookmark}>
                      <i
                        className={`far fa-bookmark fa-2x ${styles.CursorPointer}`}
                      ></i>
                    </span>
                  ) : (
                    <OverlayTrigger
                      placement="left"
                      overlay={
                        <Tooltip>Please login to bookmark properties.</Tooltip>
                      }
                    >
                      <i
                        className={`far fa-bookmark fa-2x ${styles.CursorNotAllowed}`}
                      ></i>
                    </OverlayTrigger>
                  )}
                </div>
                <div className={`${styles.QuickInfo} my-2`}>
                  <span className="me-3">
                    <i className="fas fa-bed pe-2"></i>
                    {num_bedrooms} bed
                  </span>
                  <span>
                    <i className="fas fa-bath pe-2"></i>
                    {num_bathrooms} bath
                  </span>
                </div>
                <p className="mb-0">
                  {num_bedrooms} bedroom {property_type}
                  {houseTypes.includes(property_type) ? " house" : ""}
                </p>
                <p className="text-muted">
                  {street_name}, {city}, {postcode}
                </p>
                {/* Shortened description */}
                <p className="flex-grow-1">
                  {`${description.slice(0, 200).trimEnd()}...`}
                </p>
                <div className="mt-3 d-flex justify-content-between">
                  <Link to={`/property/${id}`}>More Detail...</Link>
                  <p className="mb-1 text-muted">
                    {created_at === updated_at
                      ? `Listed on ${created_at}`
                      : `Last updated on ${updated_at}`}
                  </p>
                </div>
              </div>
              <div className="border-bottom p-4 d-xxl-none d-block">
                <div className="d-flex flex-column flex-md-row justify-content-md-between align-items-center">
                  <Link
                    to={`/profiles/${profile_id}`}
                    className="d-md-none text-decoration-none text-black"
                  >
                    <Avatar src={profile_image} mobile text={owner} />
                  </Link>
                  <Link
                    to={`/profiles/${profile_id}`}
                    className="d-none d-md-block text-decoration-none text-black"
                  >
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
                </div>
              </div>
            </Col>
          </div>
          <div className="border border-top-0 p-4 d-none d-xxl-block">
            <div className="d-flex flex-column flex-md-row justify-content-md-between align-items-center">
              <Link
                to={`/profiles/${profile_id}`}
                className="d-md-none text-decoration-none text-black"
              >
                <Avatar src={profile_image} mobile text={owner} />
              </Link>
              <Link
                to={`/profiles/${profile_id}`}
                className="d-none d-md-block text-decoration-none text-black"
              >
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
            </div>
          </div>
        </Col>
      )}
    </>
  );
}
