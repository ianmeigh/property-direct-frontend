import React, { useEffect, useState } from "react";

import { Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useHistory, useParams } from "react-router-dom";

import { axiosReq } from "../../api/axiosDefaults";
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";
import Avatar from "../../components/Avatar";
import ContactInformationBtn from "../../components/ContactInfoBtn";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import {
  useProfileData,
  useSetProfileData,
} from "../../contexts/ProfileDataContext";
import btnStyles from "../../styles/Buttons.module.css";
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
  const isOwner = currentUser?.username === profile?.owner;

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
        if (err.response.status === 401) {
          history.push("/login");
        } else if (err.response.status === 403 || err.response.status === 404) {
          history.push("/404");
        }
        console.log(err);
      }
    };
    fetchData();
  }, [id, setProfileData, history]);

  const mainProfile = (
    <>
      <Row className="px-3 text-center">
        <Col
          lg={3}
          className="d-flex justify-content-center justify-content-lg-start"
        >
          <Avatar src={profile?.image} height={120} />
        </Col>
        <Col lg={6}>
          <h3 className="m-2 text-break">{profile?.owner}</h3>
          <div className="d-flex justify-content-center gap-4">
            {profile?.is_seller && (
              <>
                <div className="my-2 text-center">
                  <div>{profile?.property_count}</div>
                  <div>Posts</div>
                </div>
                <div className="my-2 text-center">
                  <div>{profile?.followers_count}</div>
                  <div>Followers</div>
                </div>
              </>
            )}
            <div className="my-2">
              <div>{profile?.following_count}</div>
              <div>Following</div>
            </div>
          </div>
        </Col>
        <Col lg={3} className="text-lg-right">
          {currentUser &&
            !isOwner &&
            (profile?.following_id ? (
              <Button
                className={`${btnStyles.Button} ${btnStyles.SecondaryOutline}`}
                onClick={() => {}}
              >
                Unfollow
              </Button>
            ) : (
              <Button
                className={`${btnStyles.Button} ${btnStyles.Secondary}`}
                onClick={() => {}}
              >
                Follow
              </Button>
            ))}
        </Col>
        {profile?.description && (
          <Col className="p-3">{profile.description}</Col>
        )}
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
              {profile.is_seller && (
                <div className="p-4 border-top">
                  <span className="d-flex flex-row flex-wrap justify-content-around gap-2 mt-4 mt-md-0">
                    {/* Property Contact Information */}
                    <ContactInformationBtn
                      telephone_landline={profile?.telephone_landline}
                      telephone_mobile={profile?.telephone_mobile}
                      type="phone"
                    />
                    <ContactInformationBtn
                      email={profile?.email}
                      type="email"
                    />
                  </span>
                </div>
              )}
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
