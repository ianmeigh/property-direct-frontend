import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";

import { axiosRes } from "../../api/axiosDefaults";
import Avatar from "../../components/Avatar";
import btnStyles from "../../styles/Buttons.module.css";

// CREDIT: Adapted from Code Institute Moments Tutorial Project
// URL:    https://github.com/Code-Institute-Solutions/moments

/**
 * Component to display note creation/edit form and submit data to the API.
 * @param {object} props
 * @param {number} props.id id number of the note to be edited
 * @param {string} props.currentContent current content of the note being edited
 * @param {function} props.setShowEditForm update the state variable which
 * determines if the form is displayed to the user
 * @param {number} props.property id on the property a note is being left on
 * @param {function} props.setNotes function to update the notes state variable
 * @param {string} props.profile_image url of current users profile image
 * @param {number} props.profile_id id of the currently authenticated user
 * @returns
 */
export default function NoteForm({
  id,
  currentContent,
  setShowEditForm,
  property,
  setNotes,
  profile_image,
  profile_id,
}) {
  const [content, setContent] = useState("");

  // If an 'id' is supplied as a prop then set 'isEditing' to true. This
  // variable is used to determine if the notes current content should be set so
  // it is displayed to the user, element visibility and submission method.
  const isEditing = !!id;

  // Set the content state variable to the current notes content, passed as a
  // prop.
  useEffect(() => {
    if (isEditing) {
      setContent(currentContent);
    }
  }, [isEditing, currentContent]);

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  /**
   * If the note is being edited, try to update the API and update the edited
   * note in the notes array (state variable).
   *
   * Otherwise try to add the note via the API and update the notes array (state
   * variable) with returned note.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isEditing) {
      try {
        await axiosRes.put(`/notes/${id}/`, {
          content: content.trim(),
        });
        setNotes((prevNotes) => ({
          ...prevNotes,
          results: prevNotes.results.map((note) => {
            return note.id === id
              ? {
                  ...note,
                  content: content.trim(),
                  updated_at: "now",
                }
              : note;
          }),
        }));
        setShowEditForm(false);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const { data } = await axiosRes.post("/notes/", {
          content,
          property,
        });
        setNotes((prevNotes) => ({
          ...prevNotes,
          results: [data, ...prevNotes.results],
        }));
        setContent("");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Form className="w-100 d-flex flex-column" onSubmit={handleSubmit}>
      <Form.Group className="d-flex flex-row align-items-center">
        {!isEditing && (
          <Link className="me-3" to={`/profiles/${profile_id}`}>
            <Avatar height={50} src={profile_image} />
          </Link>
        )}
        <TextareaAutosize
          className="border-0 border border-bottom w-100"
          placeholder="my note..."
          as="textarea"
          value={content}
          onChange={handleChange}
          maxRows={6}
        />
      </Form.Group>
      <div className="align-self-end mt-3">
        <button
          className={`${btnStyles.Button} ${btnStyles.Primary} btn `}
          disabled={!content.trim()}
          type="submit"
        >
          {!isEditing ? "Add Note" : "Save Note"}
        </button>
        {isEditing && (
          <button
            className={`${btnStyles.Button} ${btnStyles.Primary} btn ms-2`}
            disabled={!content.trim()}
            type="button"
            onClick={() => setShowEditForm(false)}
          >
            Cancel
          </button>
        )}
      </div>
    </Form>
  );
}
