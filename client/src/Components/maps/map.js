import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { useSelector } from "react-redux";
import "./map.css";

function Map() {
  const { location } = useSelector((state) => state.user);
  const center = {
    lat: location.lat || 38.8115756,
    lng: location.lng || -77.1361142,
  };
  console.log("lo", center);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyASN6XwiLdtI4KQU3GjJah1bqNYKo5o8Q0",
  });
  if (!isLoaded) {
    return (
      <div className="mt-5 pt-5">Loadinf..............................</div>
    );
  }
  return (
    <div className="mt-5 pt-5 map">
      <GoogleMap
        center={center}
        zoom={15}
        mapContainerStyle={{ width: "600px", height: "400px" }}
        options={{
          zoomControl: false,
        }}
      >
        <Marker position={center} />
      </GoogleMap>
    </div>
  );
}

export default Map;
