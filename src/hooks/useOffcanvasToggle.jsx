import { useEffect, useRef, useState } from "react";

// CREDIT: Adapted from Code Institute Moments Tutorial Project
// URL:    https://github.com/Code-Institute-Solutions/moments

/**
 * Toggle the expansion state of the Offcanvas Navigation element if the user
 * selects a link from the 'Nav' child element, of the 'Offcanvas.Body' element.
 */
export default function useOffcanvasLinkToggle() {
  const [expanded, setExpanded] = useState(null);

  const ref = useRef(null);
  useEffect(() => {
    const handleLinkClick = (event) => {
      if (ref.current && ref.current.contains(event.target)) {
        setExpanded(false);
      }
    };

    document.addEventListener("mouseup", handleLinkClick);
    return () => {
      document.removeEventListener("mouseup", handleLinkClick);
    };
  }, [ref]);

  return { expanded, setExpanded, ref };
}
