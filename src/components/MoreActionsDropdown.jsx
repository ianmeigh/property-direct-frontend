import React from "react";

import Dropdown from "react-bootstrap/Dropdown";
import { useHistory } from "react-router-dom";

// CREDIT: Adapted from Bootstrap Custom Dropdown Component
// URL:    https://react-bootstrap.github.io/components/dropdowns/#custom-dropdown-components

// CREDIT: Adapted from Code Institute Moments Tutorial Project
// URL:    https://github.com/Code-Institute-Solutions/moments

const MoreActions = React.forwardRef(({ onClick }, ref) => (
  <i
    className="fas fa-ellipsis-h fa-2x"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  />
));
MoreActions.displayName = "MoreActionsIcon";

export default function MoreActionsDropdown({ handleEdit, handleDelete }) {
  return (
    <Dropdown className="ml-auto" drop="left">
      <Dropdown.Toggle as={MoreActions} aria-label="More Actions Menu" />

      <Dropdown.Menu>
        <div className="d-flex align-content-center">
          <Dropdown.Item
            className="d-flex flex-column align-items-center"
            onClick={handleEdit}
            aria-label="Edit Property"
          >
            <i className="fas fa-edit fa-2x mb-1" />
            <span>Edit</span>
          </Dropdown.Item>
          <Dropdown.Item
            className="d-flex flex-column align-items-center"
            onClick={handleDelete}
            aria-label="Delete Property"
          >
            <i className="fas fa-trash-alt fa-2x mb-1" />
            <span>Delete</span>
          </Dropdown.Item>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
}

/**
 * More actions dropdown for Profile. Redirects users to Profile Edit, Change
 * Username and Change Password routes.
 * @param {Int} id - Id of User profile to be edited.
 */
export function ProfileEditDropdown({ id }) {
  const history = useHistory();
  return (
    <Dropdown className="ms-auto float-end" drop="start">
      <Dropdown.Toggle as={MoreActions} aria-label="More Actions Menu" />
      <Dropdown.Menu>
        <Dropdown.Item
          className="d-flex flex-column align-items-center mb-2"
          aria-label="Edit Profile"
          onClick={() => history.push(`/profiles/${id}/edit`)}
        >
          <i className="fas fa-edit fa-2x mb-1" /> Edit Profile
        </Dropdown.Item>
        <Dropdown.Item
          className="d-flex flex-column align-items-center mb-2"
          aria-label="Edit Username"
          onClick={() => history.push(`/profiles/${id}/edit/username`)}
        >
          <i className="far fa-id-card fa-2x mb-1" />
          Change Username
        </Dropdown.Item>
        <Dropdown.Item
          className="d-flex flex-column align-items-center"
          aria-label="Edit Password"
          onClick={() => history.push(`/profiles/${id}/edit/password`)}
        >
          <i className="fas fa-key fa-2x mb-1" />
          Change Password
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
