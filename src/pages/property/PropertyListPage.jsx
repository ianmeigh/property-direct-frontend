import React, { useEffect, useState } from "react";

import { Container } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import InfiniteScroll from "react-infinite-scroll-component";
import { useLocation } from "react-router-dom";

import { axiosReq } from "../../api/axiosDefaults";
import appStyles from "../../App.module.css";
import NoResults from "../../assets/no-results.png";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";
import PropertyDetail from "./PropertyDetail";

// CREDIT: Adapted from Code Institute Moments Tutorial Project
// URL:    https://github.com/Code-Institute-Solutions/moments

export default function PropertyListPage({ message, filter = "" }) {
  const [properties, setProperties] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  /**
   * Retrieve property data on component mount
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
