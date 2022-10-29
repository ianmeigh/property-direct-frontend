import React from "react";

import { Card } from "react-bootstrap";

import { axiosRes } from "../../api/axiosDefaults";
import MoreActionsDropdown from "../../components/MoreActionsDropdown";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

export default function Note(props) {
  const { id, owner, updated_at, content, setNotes } = props;
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

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
          <p className="m-0">{content}</p>
        </Card.Body>
        {is_owner && (
          <MoreActionsDropdown
            handleEdit={() => {}}
            handleDelete={handleDelete}
          />
        )}
      </Card>
    </>
  );
}
