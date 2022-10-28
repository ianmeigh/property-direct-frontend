import React from "react";

import { Card } from "react-bootstrap";

export default function Note(props) {
  const { owner, updated_at, content } = props;

  return (
    <>
      <hr />
      <Card className="border-0 ">
        <Card.Body className="d-flex flex-column gap-3 m-0 p-0">
          <span className="text-muted">{updated_at}</span>
          <p className="m-0">{content}</p>
        </Card.Body>
      </Card>
    </>
  );
}
