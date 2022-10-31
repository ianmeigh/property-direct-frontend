import React, { useEffect, useState } from "react";

import { Accordion, Container } from "react-bootstrap";

import { axiosReq } from "../../api/axiosDefaults";
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

// CREDIT: Code Institute Moments Tutorial Project
// URL:    https://github.com/Code-Institute-Solutions/moments

export default function PopularProfiles({ mobile }) {
  const [profileData, setProfileData] = useState({
    // pageProfile: { results: [] },
    popularProfiles: { results: [] },
  });
  const { popularProfiles } = profileData;
  const currentUser = useCurrentUser();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(
          "/profiles/?ordering=-followers_count"
        );
        setProfileData((prevState) => ({
          ...prevState,
          popularProfiles: data,
        }));
      } catch (err) {
        console.log(err);
      }
    };
    handleMount();
  }, [currentUser]);

  return (
    <Container
      className={`${appStyles.ContentContainer} ${
        mobile && "d-lg-none"
      } p-0 border-0 rounded mb-4`}
    >
      {popularProfiles.results.length ? (
        <Accordion
          defaultActiveKey={!mobile && ["0"]}
          alwaysOpen={!mobile && true}
        >
          <Accordion.Item eventKey="0">
            <Accordion.Header>Most Followed Sellers</Accordion.Header>
            {mobile ? (
              <Accordion.Body className="d-flex justify-content-between">
                {popularProfiles.results.slice(0, 4).map((profile) => (
                  <p key={profile.id}>{profile.owner}</p>
                ))}
              </Accordion.Body>
            ) : (
              <Accordion.Body>
                {popularProfiles.results.map((profile) => (
                  <p key={profile.id}>{profile.owner}</p>
                ))}
              </Accordion.Body>
            )}
          </Accordion.Item>
        </Accordion>
      ) : (
        <Asset spinner />
      )}
    </Container>
  );
}
