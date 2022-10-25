import React from "react";

import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// CREDIT: Adapted from @react-google-maps/api package documentation
// URL:    https://www.npmjs.com/package/@react-google-maps/api

export default function Map(props) {
  const { latitude, longitude } = props;

  const center = {
    lat: latitude,
    lng: longitude,
  };

  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  return (
    <LoadScript googleMapsApiKey="API_KEY">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={17}
        clickableIcons={false}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
}
