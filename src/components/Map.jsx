"use client";

import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

export default function MapComponent() {
  const center = {
    lat: 28.6139, // Example: Delhi latitude
    lng: 77.2090, // Example: Delhi longitude
  };

  const containerStyle = {
    width: "100%",
    height: "400px",
    borderRadius: "12px",
  };

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        {/* Marker Example */}
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
}
