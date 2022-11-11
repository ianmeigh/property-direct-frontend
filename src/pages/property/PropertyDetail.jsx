import React from "react";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { Link, useHistory } from "react-router-dom";

import { axiosRes } from "../../api/axiosDefaults";
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";
import Avatar from "../../components/Avatar";
import ContactInformationBtn from "../../components/ContactInfoBtn";
import Map from "../../components/Map";
import MoreActionsDropdown from "../../components/MoreActionsDropdown";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import btnStyles from "../../styles/Buttons.module.css";
import styles from "../../styles/PropertyDetail.module.css";

/**
 * Component used to display the details of an individual property in a
 * condensed or expanded detail view.
 *
 * All property details are spread as they are passed in to this component and
 * destructured for before use.
 * @param {object} props
 * @param {function} props.setProperties function to update the notes state
 * variable
 * @param {boolean} props.detailView used to specify that the full property
 * detail html layout should be returned, if not supplied the html for the
 * condensed list view will be used
 * @returns
 */
export default function PropertyDetail(props) {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    profile_telephone_mobile,
    profile_telephone_landline,
    profile_email,
    bookmark_id,
    created_at,
    updated_at,
    image_hero,
    floorplan,
    epc,
    property_name,
    property_number,
    street_name,
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
    distance,
  } = props;

  const houseTypes = ["detached", "semi-detached", "terraced", "end terrace"];

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();

  /**
   * Redirects user to the property edit page
   */
  const handleEdit = () => {
    history.push(`/property/${id}/edit`);
  };

  /**
   * Deletes property and redirects user to previous page in history
   */
  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/property/${id}/`);
      history.goBack();
    } catch (err) {
      // continue regardless of error
    }
  };

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
      // continue regardless of error
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
      // continue regardless of error
    }
  };

  return (
    <>
      {detailView ? (
        <Col className={`${appStyles.ContentContainer} p-3 p-md-4 rounded`}>
          {/* Edit Menu */}
          {is_owner && detailView && (
            <div className="d-flex justify-content-end pb-3">
              <MoreActionsDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
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
                {property_number !== 0 && property_number !== null
                  ? property_number + ", "
                  : property_name !== ""
                  ? property_name + ", "
                  : ""}
                {street_name}, {city}, {postcode.toUpperCase()}
              </span>
            </h1>
            <p className={`${styles.PropertyHeadingFont} ${styles.Price}`}>
              £{price.toLocaleString()}
            </p>
          </div>
          <p className="text-muted">
            {created_at === updated_at
              ? `Listed on ${created_at}`
              : `Last updated on ${updated_at}`}
          </p>
          {/* Image and contact info */}
          <Card>
            <Card.Img
              src={image_hero}
              alt={`Property image for ${street_name}`}
              variant="top"
            />
            {is_sold_stc && (
              <Card.ImgOverlay
                className={`${styles.Banner} rounded border border-2 border-dark text-white bg-danger p-3 user-select-none`}
              >
                <p className="mb-0">Sold STC</p>
              </Card.ImgOverlay>
            )}
            {/* Contact Information */}
            <Card.Body className="d-flex flex-column flex-md-row justify-content-md-between align-items-center border-top">
              <Link
                to={`/profiles/${profile_id}`}
                className="d-md-none text-decoration-none text-black"
                aria-label={`${owner}'s profile.`}
              >
                <Avatar src={profile_image} mobile text={owner} />
              </Link>
              <Link
                to={`/profiles/${profile_id}`}
                className="d-none d-md-block text-decoration-none text-black"
                aria-label={`${owner}'s profile.`}
              >
                <Avatar src={profile_image} text={owner} />
              </Link>
              <span className="d-flex flex-row flex-wrap justify-content-center gap-2 mt-4 mt-md-0">
                {/* Property Contact Information */}
                <ContactInformationBtn
                  telephone_landline={profile_telephone_landline}
                  telephone_mobile={profile_telephone_mobile}
                  type="phone"
                />
                <ContactInformationBtn email={profile_email} type="email" />
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
              <Link
                to={`/property/${id}`}
                aria-label={`Property image for ${street_name}`}
              >
                <Image
                  src={image_hero}
                  alt={`Property image for ${street_name}`}
                  className={`${styles.PropertyImage}`}
                />
                {is_sold_stc && (
                  <Card.ImgOverlay
                    className={`${styles.Banner} rounded border border-2 border-dark text-white bg-danger p-3 user-select-none`}
                  >
                    <p className="mb-0">Sold STC</p>
                  </Card.ImgOverlay>
                )}
              </Link>
            </Col>
            {/* Text Context and Price (below xxl breakpoint) */}
            <Col className="d-flex flex-xxl-column flex-column-reverse">
              {/* Text Content */}
              <div className="p-4 d-flex flex-column h-100">
                <div className="d-flex justify-content-between">
                  <h3 className="m-0">£{price.toLocaleString()}</h3>
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
                <p className="mb-0 text-muted">
                  {property_number !== 0 && property_number !== null
                    ? property_number + ", "
                    : property_name !== ""
                    ? property_name + ", "
                    : ""}
                  {street_name}, {city}, {postcode.toUpperCase()}
                </p>
                {distance != null && (
                  <p className="text-muted">
                    Distance from origin - {distance.toFixed(1)} miles
                  </p>
                )}
                {/* Shortened description */}
                <p className="flex-grow-1 mt-3">
                  {`${description.slice(0, 200).trimEnd()}...`}
                </p>
                <div className="mt-3 d-flex justify-content-between">
                  <Link to={`/property/${id}`}>
                    <p className={`${styles.MoreDetail} m-0`}>More Detail...</p>
                  </Link>
                  <p className="mb-1 text-muted">
                    {created_at === updated_at
                      ? `Listed on ${created_at}`
                      : `Last updated on ${updated_at}`}
                  </p>
                </div>
              </div>
              {/* Contact Information */}
              <div className="border-bottom p-4 d-xxl-none d-block border-top">
                <div className="d-flex flex-column flex-md-row justify-content-md-between align-items-center">
                  <Link
                    to={`/profiles/${profile_id}`}
                    className="d-md-none text-decoration-none text-black"
                    aria-label={`${owner}'s profile.`}
                  >
                    <Avatar src={profile_image} mobile text={owner} />
                  </Link>
                  <Link
                    to={`/profiles/${profile_id}`}
                    className="d-none d-md-block text-decoration-none text-black"
                    aria-label={`${owner}'s profile.`}
                  >
                    <Avatar src={profile_image} text={owner} />
                  </Link>
                  <span className="d-flex flex-row flex-wrap justify-content-center gap-2 mt-4 mt-md-0">
                    {/* Property Contact Information */}
                    <ContactInformationBtn
                      telephone_landline={profile_telephone_landline}
                      telephone_mobile={profile_telephone_mobile}
                      type="phone"
                    />
                    <ContactInformationBtn email={profile_email} type="email" />
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
                aria-label={`${owner}'s profile.`}
              >
                <Avatar src={profile_image} mobile text={owner} />
              </Link>
              <Link
                to={`/profiles/${profile_id}`}
                className="d-none d-md-block text-decoration-none text-black"
                aria-label={`${owner}'s profile.`}
              >
                <Avatar src={profile_image} text={owner} />
              </Link>
              <span className="d-flex flex-row flex-wrap justify-content-center gap-2 mt-4 mt-md-0">
                {/* Property Contact Information */}
                <ContactInformationBtn
                  telephone_landline={profile_telephone_landline}
                  telephone_mobile={profile_telephone_mobile}
                  type="phone"
                />
                <ContactInformationBtn email={profile_email} type="email" />
              </span>
            </div>
          </div>
        </Col>
      )}
    </>
  );
}
