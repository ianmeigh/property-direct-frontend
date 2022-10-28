import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useHistory, useParams } from "react-router-dom";

import { axiosReq } from "../../api/axiosDefaults";
import appStyles from "../../App.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import NoteForm from "../notes/NoteForm";
import PropertyDetail from "./PropertyDetail";

// CREDIT: Adapted from Code Institute Moments Tutorial Project
// URL:    https://github.com/Code-Institute-Solutions/moments

export default function PropertyPage() {
  const { id } = useParams();
  const [property, setProperty] = useState({ results: [] });
  const [notes, setNotes] = useState({ results: [] });
  const history = useHistory();
  const currentUser = useCurrentUser();

  /**
   * Retrieve property data on component mount
   */
  useEffect(() => {
    setNotes({ results: [] });
    const handleMount = async () => {
      try {
        const [{ data: property }, { data: notes }] = await Promise.all([
          axiosReq.get(`/property/${id}`),
          axiosReq.get(`/notes/?property=${id}`),
        ]);
        setProperty({ results: [property] });
        setNotes(notes);
      } catch (err) {
        if (err.response.status === 404) {
          history.push("/404");
        }
        console.log(err);
      }
    };
    handleMount();
  }, [id, history]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Popular Sellers (Mobile)</p>
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
              profileImage={currentUser.profile_image}
              property={id}
              setNotes={setNotes}
            />
          ) : notes.results.length ? (
            "Notes"
          ) : null}
          {notes.results.length ? (
            notes.results.map((note) => (
              <p key={note.id}>
                {notes.results.length} {note.owner}: {note.content}
              </p>
            ))
          ) : currentUser ? (
            <span>
              Leave notes about your viewing or anything really, these notes are
              private to you!
            </span>
          ) : (
            <span>Log in to create private notes about this property.</span>
          )}
        </Col>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        Popular Seller (Desktop)
      </Col>
    </Row>
  );
}
