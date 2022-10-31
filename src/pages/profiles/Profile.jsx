import React from "react";

import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import Avatar from "../../components/Avatar";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import btnStyles from "../../styles/Buttons.module.css";

export default function Profile({ profile, mobile, imageSize = 55 }) {
  const { id, following_id, image, owner } = profile;
  const currentUser = useCurrentUser();
  const isOwner = currentUser?.username === owner;

  return (
    <div
      className={`d-flex ${
        mobile ? "flex-column my-2" : "flex-row mx-3 my-4"
      } justify-content-between align-items-center `}
    >
      <Link
        className="text-decoration-none text-black px-1"
        to={`/profiles/${id}`}
      >
        <Avatar
          src={image}
          height={imageSize}
          text={owner}
          mobile={mobile ? true : false}
          strong={mobile ? false : true}
          textBreak
        />
      </Link>
      <div>
        {!mobile &&
          currentUser &&
          !isOwner &&
          (following_id ? (
            <Button
              className={`${btnStyles.Button} ${btnStyles.SecondaryOutline}`}
              onClick={() => {}}
            >
              Unfollow
            </Button>
          ) : (
            <Button
              className={`${btnStyles.Button} ${btnStyles.Secondary}`}
              onClick={() => {}}
            >
              Follow
            </Button>
          ))}
      </div>
    </div>
  );
}
