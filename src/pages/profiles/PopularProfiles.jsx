import React from "react";

import { Accordion, Container } from "react-bootstrap";

import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";
import { useProfileData } from "../../contexts/ProfileDataContext";
import Profile from "./Profile";

// CREDIT: Adapted from Code Institute Moments Tutorial Project
// URL:    https://github.com/Code-Institute-Solutions/moments

export default function PopularProfiles({ mobile }) {
  const { popularProfiles } = useProfileData();

  return (
    <Container
      className={`${appStyles.ContentContainer}  p-0 border-0 rounded mb-4`}
    >
      {popularProfiles.results.length ? (
        <Accordion
          defaultActiveKey={!mobile && ["0"]}
          alwaysOpen={!mobile && true}
        >
          <Accordion.Item eventKey="0">
            <Accordion.Header>Most Followed Sellers</Accordion.Header>
            {mobile ? (
              <Accordion.Body className="d-flex justify-content-around">
                {popularProfiles.results.slice(0, 4).map((profile) => (
                  <Profile key={profile.id} profile={profile} mobile />
                ))}
              </Accordion.Body>
            ) : (
              <Accordion.Body>
                {popularProfiles.results.map((profile) => (
                  <Profile key={profile.id} profile={profile} />
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
