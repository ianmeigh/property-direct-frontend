import React from "react";

import Spinner from "react-bootstrap/Spinner";

import styles from "../styles/Asset.module.css";

// CREDIT: Adapted from Code Institute Moments Tutorial Project
// URL:    https://github.com/Code-Institute-Solutions/moments

const Asset = ({ spinner, upload, src, message }) => {
  return (
    <div className={`${styles.Asset} p-4 text-center`}>
      {spinner && <Spinner animation="border" />}
      {upload && (
        <span className="d-flex flex-column justify-content-center">
          <i className="fas fa-upload fa-3x"></i>
        </span>
      )}
      {src && <img src={src} alt={message} />}
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
};

export default Asset;
