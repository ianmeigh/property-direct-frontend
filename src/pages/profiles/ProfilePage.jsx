import React, { useEffect, useState } from "react";

import { Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useHistory, useParams } from "react-router-dom";

import { axiosReq } from "../../api/axiosDefaults";
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import {
  useProfileData,
  useSetProfileData,
} from "../../contexts/ProfileDataContext";
import PopularProfiles from "./PopularProfiles";

// CREDIT: Adapted from Code Institute Moments Tutorial Project
// URL:    https://github.com/Code-Institute-Solutions/moments

export default function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const { setProfileData } = useSetProfileData();
  const { pageProfile } = useProfileData();
  const [profile] = pageProfile.results;
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: pageProfile }] = await Promise.all([
          axiosReq(`/profiles/${id}/`),
        ]);
        setProfileData((prevState) => ({
          ...prevState,
          pageProfile: { results: [pageProfile] },
        }));
        setHasLoaded(true);
      } catch (err) {
        if (err.response.status === 403 || err.response.status === 404) {
          history.push("/404");
        }
        console.log(err);
      }
    };
    fetchData();
  }, [id, setProfileData, history]);

  const mainProfile = (
    <>
      <Row noGutters className="px-3 text-center">
        <Col lg={3} className="text-lg-left">
          <p>Image</p>
        </Col>
        <Col lg={6}>
          <h3 className="m-2">{profile?.owner}</h3>
          <p>Profile stats</p>
        </Col>
        <Col lg={3} className="text-lg-right">
          <p>Follow button</p>
        </Col>
        <Col className="p-3">Profile content</Col>
      </Row>
    </>
  );

  const mainProfilePosts = (
    <>
      <hr />
      <p className="text-center">Profile owners posts</p>
      <hr />
    </>
  );

  return (
    <Row>
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularProfiles mobile />

        {hasLoaded ? (
          <>
            <Col
              className={`${appStyles.ContentContainer} rounded shadow mb-4 d-flex flex-column`}
            >
              <div className="p-4 d-flex flex-column">{mainProfile}</div>
              <div className="p-4 border-top">
                <span className="d-flex flex-row flex-wrap justify-content-around gap-2 mt-4 mt-md-0">
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
            </Col>

            <Container
              className={`${appStyles.ContentContainer} shadow rounded`}
            >
              {mainProfilePosts}
            </Container>
          </>
        ) : (
          <Asset spinner />
        )}
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
      </Col>
    </Row>
  );
}
