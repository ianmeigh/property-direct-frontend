import React from "react";

import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

import Avatar from "../../components/Avatar";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useSetProfileData } from "../../contexts/ProfileDataContext";
import btnStyles from "../../styles/Buttons.module.css";

/**
 * Component to display the user profile information in the popular profiles
 * component.
 * @param {object} props
 * @param {object} props.profile user profile object from the api
 * @param {boolean} props.mobile alter layout of component for mobile viewports
 * @param {number} props.imageSize height and width of the image (default value is 55)
 * @returns
 */
export default function Profile({ profile, mobile, imageSize = 55 }) {
  const { id, following_id, image, owner } = profile;
  const currentUser = useCurrentUser();
  const isOwner = currentUser?.username === owner;
  const { handleFollow, handleUnfollow } = useSetProfileData();
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
          bold={mobile ? false : true}
          textBreak
        />
      </Link>
      <div>
        {!mobile &&
          currentUser &&
          !isOwner &&
          (following_id ? (
            <Button
              className={`${btnStyles.Button} ${btnStyles.Secondary}`}
              onClick={() => handleUnfollow(profile)}
            >
              Unfollow
            </Button>
          ) : (
            <Button
              className={`${btnStyles.Button} ${btnStyles.Primary}`}
              onClick={() => handleFollow(profile)}
            >
              Follow
            </Button>
          ))}
      </div>
    </div>
  );
}
