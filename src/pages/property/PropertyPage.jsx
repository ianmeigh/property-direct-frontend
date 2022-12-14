import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import InfiniteScroll from "react-infinite-scroll-component";
import { useHistory, useParams } from "react-router-dom";

import { axiosReq } from "../../api/axiosDefaults";
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { fetchMoreData } from "../../utils/utils";
import Note from "../notes/Note";
import NoteForm from "../notes/NoteForm";
import PopularProfiles from "../profiles/PopularProfiles";
import PropertyDetail from "./PropertyDetail";

// CREDIT: Adapted from Code Institute Moments Tutorial Project
// URL:    https://github.com/Code-Institute-Solutions/moments

/**
 * Component used to display individual property components using the expanded
 * detail view.
 * @returns
 */
export default function PropertyPage() {
  const { id } = useParams();
  const [hasLoaded, setHasLoaded] = useState(false);
  const [property, setProperty] = useState({ results: [] });
  const [notes, setNotes] = useState({ results: [] });
  const history = useHistory();
  const currentUser = useCurrentUser();

  /**
   * Retrieve property data on component mount
   */
  useEffect(() => {
    setHasLoaded(false);
    setNotes({ results: [] });
    const handleMount = async () => {
      try {
        const [{ data: property }, { data: notes }] = await Promise.all([
          axiosReq.get(`/property/${id}`),
          axiosReq.get(`/notes/?property=${id}`),
        ]);
        setProperty({ results: [property] });
        setNotes(notes);
        setHasLoaded(true);
      } catch (err) {
        /* 
        As the promises can be returned in any order, the error checking
        below accounts for rejection of both requests:
        
        - A response when fetching and property that doesn't exist will
          return a 404 Not Found Error.
        - A response when fetching notes using the property filter with an id
          that doesn't exist returns a 400 Bad Request Error with the message
          "Select a valid choice. That choice is not one of the available
          choices."
         */
        if (
          (err.response?.status === 400 &&
            (err.response?.data?.property[0]).includes(
              "Select a valid choice"
            )) ||
          err.response?.status === 404
        ) {
          history.push("/404");
        }
      }
    };
    handleMount();
  }, [id, history]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularProfiles mobile />
        {hasLoaded ? (
          <>
            <PropertyDetail
              detailView
              {...property.results[0]}
              setProperties={setProperty}
            />
            <Col
              className={`${appStyles.ContentContainer} p-3 p-md-4 rounded mt-3`}
            >
              {currentUser ? (
                <NoteForm
                  profile_id={currentUser.profile_id}
                  profile_image={currentUser.profile_image}
                  property={id}
                  setNotes={setNotes}
                />
              ) : notes.results.length ? (
                "Notes"
              ) : null}
              {notes.results.length ? (
                <InfiniteScroll
                  dataLength={notes.results.length}
                  loader={<Asset spinner />}
                  hasMore={!!notes.next}
                  next={() => {
                    fetchMoreData(notes, setNotes);
                  }}
                >
                  {notes.results.map((note) => (
                    <Note key={note.id} setNotes={setNotes} {...note} />
                  ))}
                </InfiniteScroll>
              ) : currentUser ? (
                <div className="text-center w-100 mt-3">
                  Leave notes about your viewing or anything really, these notes
                  are private to you!
                </div>
              ) : (
                <div className="text-center w-100">
                  Log in to create private notes about this property.
                </div>
              )}
            </Col>
          </>
        ) : (
          <Col
            className={`${appStyles.ContentContainer} p-3 p-md-4 rounded mt-3`}
          >
            <Asset spinner />
          </Col>
        )}
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
      </Col>
    </Row>
  );
}
