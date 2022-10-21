import React from "react";

import { Image } from "react-bootstrap";

import styles from "../styles/Avatar.module.css";

export default function Avatar({ src, height = 35, alt, text, isMobile }) {
  return (
    <>
      <span
        className={`${styles.Avatar} ${
          isMobile
            ? "d-flex flex-column align-items-center"
            : "d-flex flex-row align-items-center gap-1"
        }`}
      >
        <Image
          src={src}
          height={height}
          width={height}
          alt={alt}
          roundedCircle
        />
        {text}
      </span>
    </>
  );
}
