import React from "react";

import Image from "react-bootstrap/Image";

import styles from "../styles/Avatar.module.css";

export default function Avatar({
  src,
  height = 35,
  text,
  mobile,
  bold,
  textBreak,
}) {
  return (
    <>
      <span
        className={`${styles.Avatar} ${
          mobile
            ? "d-flex flex-column align-items-center"
            : "d-flex flex-row align-items-center gap-1"
        }`}
      >
        <Image
          className="border border-2"
          src={src}
          height={height}
          width={height}
          alt="User Profile Picture (Avatar)"
          roundedCircle
        />
        <span className={`${bold && "fw-bold"} ${textBreak && "text-break"}`}>
          {text}
        </span>
      </span>
    </>
  );
}
