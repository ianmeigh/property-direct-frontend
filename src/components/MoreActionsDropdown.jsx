import React from "react";

import Dropdown from "react-bootstrap/Dropdown";

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

export default function MoreActionsDropdown() {
  return (
    <Dropdown className="ml-auto" drop="left">
      <Dropdown.Toggle
        as={MoreActions}
        id="dropdown-custom-components"
        aria-label="More Actions Menu"
      />

      <Dropdown.Menu>
        <div className="d-flex align-content-center">
          <Dropdown.Item
            className="d-flex flex-column align-items-center"
            onClick={() => {}}
            aria-label="Edit Property"
          >
            <i className="fas fa-edit fa-2x mb-1" />
            <span>Edit</span>
          </Dropdown.Item>
          <Dropdown.Item
            className="d-flex flex-column align-items-center"
            onClick={() => {}}
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
