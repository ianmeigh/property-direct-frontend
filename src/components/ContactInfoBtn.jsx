import React, { useEffect, useState } from "react";

import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { useLocation } from "react-router-dom";

import { useCurrentUser } from "../contexts/CurrentUserContext";
import btnStyles from "../styles/Buttons.module.css";

export default function ContactInformationBtn({
  telephone_mobile = "",
  telephone_landline = "",
  email = "",
  type,
}) {
  const [btnText, setBtnText] = useState();
  const [btnClicked, setBtnClicked] = useState(false);
  const pathname = useLocation();
  const currentUser = useCurrentUser();

  /**
   * When the pathname changes ensure the button clicked state is set to false
   * and the text is reset.
   */
  useEffect(() => {
    setBtnClicked(false);
    if (type === "phone") {
      setBtnText("Reveal Phone");
    } else if (type === "email") {
      setBtnText("Reveal Email");
    } else {
      setBtnText("No Contact Info");
    }
  }, [pathname, type]);

  /**
   * Set the button clicked state to true and update the button text state.
   */
  const handleClick = () => {
    setBtnClicked(true);
    telephone_mobile
      ? setBtnText(telephone_mobile)
      : setBtnText(telephone_landline);
    email && setBtnText(email);
  };
  return (
    <>
      {/*
        Phone Number Button

        - If no user is currently authenticated, show OverlayTrigger to prompt login.
        - If both telephone number variables are empty, show a non-active button
        - On the first click of the button the contact information is revealed as a 'call' link.
        */}
      {type === "phone" &&
        (currentUser ? (
          !telephone_mobile && !telephone_landline ? (
            <Button
              className={`${btnStyles.Static} ${btnStyles.Primary}`}
              disabled
            >
              <i className="fas fa-phone-alt pe-2"></i>
              {btnText}
            </Button>
          ) : (
            <Button
              className={`${btnStyles.Button} ${btnStyles.Primary}`}
              onClick={handleClick}
            >
              {!btnClicked ? (
                <>
                  <i className="fas fa-phone-alt pe-2"></i>
                  {btnText}
                </>
              ) : (
                <a
                  className="text-decoration-none text-white"
                  href={`tel:${btnText}`}
                >
                  <i className="fas fa-phone-alt pe-2"></i>
                  {btnText}
                </a>
              )}
            </Button>
          )
        ) : (
          <OverlayTrigger
            placement="bottom"
            overlay={
              <Tooltip>Please login to reveal contact information.</Tooltip>
            }
          >
            <Button className={`${btnStyles.Static} ${btnStyles.Primary}`}>
              <i className="fas fa-phone-alt pe-2"></i>
              {btnText}
            </Button>
          </OverlayTrigger>
        ))}
      {/*
        Email Button

        - If no user is currently authenticated, show OverlayTrigger to prompt login.
        - If the email variables are empty, show a non-active button.
        - On the first click of the button the contact information is revealed as a 'mailto' link.
        */}
      {type === "email" &&
        (currentUser ? (
          !email ? (
            <Button
              className={`${btnStyles.Static} ${btnStyles.Primary}`}
              disabled
            >
              <i className="fas fa-envelope pe-2"></i>
              {btnText}
            </Button>
          ) : (
            <Button
              className={`${btnStyles.Button} ${btnStyles.Primary}`}
              onClick={handleClick}
            >
              {!btnClicked ? (
                <>
                  <i className="fas fa-envelope pe-2"></i>
                  {btnText}
                </>
              ) : (
                <a
                  className="text-decoration-none text-white"
                  href={`mailto:${btnText}`}
                >
                  <i className="fas fa-envelope pe-2"></i>
                  {btnText}
                </a>
              )}
            </Button>
          )
        ) : (
          <OverlayTrigger
            placement="bottom"
            overlay={
              <Tooltip>Please login to reveal contact information.</Tooltip>
            }
          >
            <Button className={`${btnStyles.Static} ${btnStyles.Primary}`}>
              <i className="fas fa-envelope pe-2"></i>
              {btnText}
            </Button>
          </OverlayTrigger>
        ))}
    </>
  );
}
