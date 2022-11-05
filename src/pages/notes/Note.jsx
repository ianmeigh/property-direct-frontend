import React, { useState } from "react";

import Card from "react-bootstrap/Card";

import { axiosRes } from "../../api/axiosDefaults";
import MoreActionsDropdown from "../../components/MoreActionsDropdown";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import NoteForm from "./NoteForm";

export default function Note(props) {
  const { id, owner, updated_at, content, setNotes } = props;
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const [showEditForm, setShowEditForm] = useState(false);

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/notes/${id}/`);
      setNotes((prevNotes) => ({
        ...prevNotes,
        results: prevNotes.results.filter((note) => note.id !== id),
      }));
    } catch (err) {
      console.log(err);
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
