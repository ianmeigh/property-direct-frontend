import React, { useState } from "react";

import Card from "react-bootstrap/Card";

import { axiosRes } from "../../api/axiosDefaults";
import MoreActionsDropdown from "../../components/MoreActionsDropdown";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import NoteForm from "./NoteForm";

/**
 * Component to display a note a user has created for a property, handle
 * deletion of comments.
 * @param {object} props
 * @param {number} props.id id of the note
 * @param {string} props.owner username of note owner
 * @param {string} props.updated_at time since the note was updated
 * @param {string} props.content note body / content
 * @param {function} props.setNotes function to update the notes state variable
 * @returns
 */
export default function Note(props) {
  const { id, owner, updated_at, content, setNotes } = props;
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const [showEditForm, setShowEditForm] = useState(false);

  /**
   * Deletes the note from the API and the notes state variable
   */
  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/notes/${id}/`);
      setNotes((prevNotes) => ({
        ...prevNotes,
        results: prevNotes.results.filter((note) => note.id !== id),
      }));
    } catch (err) {
      // continue regardless of error
    }
  };

  return (
    <>
      <hr />
      <Card className="border-0 d-flex flex-row align-content-between">
        <Card.Body className="d-flex flex-column gap-3 m-0 p-0">
          <span className="text-muted">{updated_at}</span>
          {showEditForm ? (
            <NoteForm
              id={id}
              currentContent={content}
              setNotes={setNotes}
              setShowEditForm={setShowEditForm}
            />
          ) : (
            <p>{content}</p>
          )}
        </Card.Body>
        {is_owner && !showEditForm && (
          <MoreActionsDropdown
            handleEdit={() => {
              setShowEditForm(true);
            }}
            handleDelete={handleDelete}
          />
        )}
      </Card>
    </>
  );
}
