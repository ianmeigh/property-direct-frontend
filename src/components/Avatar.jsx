import React from "react";

import Image from "react-bootstrap/Image";

import styles from "../styles/Avatar.module.css";

/**
 * Component to display the user profile picture and text.
 * @param {object} props
 * @param {string} props.src url of the image to be displayed
 * @param {number} props.height height and width of the image (default value is 35)
 * @param {boolean} props.mobile alter layout of component for mobile viewports
 * @param {boolean} props.bold embolden displayed text
 * @param {boolean} props.textBreak add text style ('text-break') to displayed
 * text
 * @returns
 */
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
