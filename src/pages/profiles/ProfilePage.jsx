import React, { useEffect, useState } from "react";

import { Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import InfiniteScroll from "react-infinite-scroll-component";
import { useHistory, useParams } from "react-router-dom";

import { axiosReq } from "../../api/axiosDefaults";
import appStyles from "../../App.module.css";
import NoResults from "../../assets/no-results.png";
import Asset from "../../components/Asset";
import Avatar from "../../components/Avatar";
import ContactInformationBtn from "../../components/ContactInfoBtn";
import { ProfileEditDropdown } from "../../components/MoreActionsDropdown";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import {
  useProfileData,
  useSetProfileData,
} from "../../contexts/ProfileDataContext";
import btnStyles from "../../styles/Buttons.module.css";
import { fetchMoreData } from "../../utils/utils";
import PropertyDetail from "../property/PropertyDetail";
import PopularProfiles from "./PopularProfiles";

// CREDIT: Adapted from Code Institute Moments Tutorial Project
// URL:    https://github.com/Code-Institute-Solutions/moments

export default function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [profileProperties, setProfileProperties] = useState({ results: [] });
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const { setProfileData, handleFollow, handleUnfollow } = useSetProfileData();
  const { pageProfile } = useProfileData();
  const [profile] = pageProfile.results;
  const history = useHistory();
  const isOwner = currentUser?.username === profile?.owner;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: pageProfile }, { data: profileProperties }] =
          await Promise.all([
            axiosReq(`/profiles/${id}/`),
            axiosReq(`/property/?properties_listed_by_profile=${id}`),
          ]);
        setProfileData((prevState) => ({
          ...prevState,
          pageProfile: { results: [pageProfile] },
        }));
        setProfileProperties(profileProperties);
        setHasLoaded(true);
      } catch (err) {
        if (err.response?.status === 401) {
          history.push("/login");
        } else if (
          // Redirect users if they request a profile that doesn't exist or they
          // don't have permission to view (only sellers profiles are visible)
          //
          // As promises can be returned in any order, the error checking below
          // accounts for rejection of the profile not being found (404) and the
          // filter id not being valid (400).
          (err.response?.status === 400 &&
            (err.response?.data?.properties_listed_by_profile[0]).includes(
              "Select a valid choice"
            )) ||
          err.response?.status === 403 ||
          err.response?.status === 404
        ) {
          history.push("/404");
        }
        console.log(err);
      }
    };
    fetchData();
  }, [id, setProfileData, history]);

  const mainProfile = (
    <>
      {profile?.is_owner && <ProfileEditDropdown id={profile?.id} />}
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
                  <div>Properties</div>
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
                onClick={() => handleUnfollow(profile)}
              >
                Unfollow
              </Button>
            ) : (
              <Button
                className={`${btnStyles.Button} ${btnStyles.Secondary}`}
                onClick={() => handleFollow(profile)}
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
      <p className="text-center">Profile owners properties</p>
      <hr />
      {profileProperties.results.length ? (
        <InfiniteScroll
          dataLength={profileProperties.results.length}
          loader={<Asset spinner />}
          hasMore={!!profileProperties.next}
          next={() => {
            fetchMoreData(profileProperties, setProfileProperties);
          }}
        >
          {profileProperties.results.map((property) => (
            <PropertyDetail
              key={property.id}
              {...property}
              setProperty={setProfileProperties}
            />
          ))}
        </InfiniteScroll>
      ) : (
        <Asset
          src={NoResults}
          message={`No results found, ${profile?.owner} seller hasn't listed any properties yet.`}
        />
      )}
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
            {profile?.is_seller && (
              <Container
                className={`${appStyles.ContentContainer} shadow rounded`}
              >
                {mainProfilePosts}
              </Container>
            )}
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
