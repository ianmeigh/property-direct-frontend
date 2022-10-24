import React from "react";

import styles from "../styles/Asset.module.css";

// CREDIT: Adapted from Code Institute Moments Tutorial Project
// URL:    https://github.com/Code-Institute-Solutions/moments

const Asset = ({ upload, message }) => {
  return (
    <div className={`${styles.Asset} p-4`}>
      {upload && (
        <span className="d-flex flex-column justify-content-center">
          <i className="fas fa-upload fa-3x"></i>
        </span>
      )}
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
};

export default Asset;
