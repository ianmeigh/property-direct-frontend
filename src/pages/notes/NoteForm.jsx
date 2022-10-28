import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";

import { axiosRes } from "../../api/axiosDefaults";
import Avatar from "../../components/Avatar";
import btnStyles from "../../styles/Buttons.module.css";

// CREDIT: Adapted from Code Institute Moments Tutorial Project
// URL:    https://github.com/Code-Institute-Solutions/moments

export default function NoteForm({
  property,
  setNotes,
  profileImage,
  profileId,
}) {
  const [content, setContent] = useState("");

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
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
  };

  return (
    <Form className="w-100 d-flex flex-column" onSubmit={handleSubmit}>
      <Form.Group className="d-flex flex-row align-items-center">
        <Link className="me-3" to={`/profiles/${profileId}`}>
          <Avatar height={50} src={profileImage} />
        </Link>
        <TextareaAutosize
          className="border-0 border border-bottom w-100"
          placeholder="my note..."
          as="textarea"
          value={content}
          onChange={handleChange}
          maxRows={6}
        />
      </Form.Group>
      <button
        className={`${btnStyles.Button} ${btnStyles.Primary} btn align-self-end mt-3`}
        disabled={!content.trim()}
        type="submit"
      >
        Add Note
      </button>
    </Form>
  );
}
