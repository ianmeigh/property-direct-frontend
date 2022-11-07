import React from "react";

import NoResults from "../assets/no-results.png";
import styles from "../styles/NotFound.module.css";
import Asset from "./Asset";

// CREDIT: Code Institute Moments Tutorial Project
// URL:    https://github.com/Code-Institute-Solutions/moments

/**
 * Component to feedback 404 page not found errors.
 * @returns
 */
export default function NotFound() {
  return (
    <div className={styles.Container}>
      <Asset
        src={NoResults}
        message={"Sorry, the page you were looking for doesn't exist."}
      />
    </div>
  );
}
