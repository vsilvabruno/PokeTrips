import React from 'react';
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Marker, useMap } from "react-leaflet";

interface CustomMarkerProps {
  position: L.LatLngExpression;
  children?: React.ReactNode;
}

const CustomMarker: React.FC<CustomMarkerProps> = ({ position, children }) => {
  const map = useMap();

  const customIcon = L.icon({
    iconUrl: "/images/icons/marker.svg",
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  return (
    <Marker position={position} icon={customIcon}>
      {children}
    </Marker>
  );
};

export default CustomMarker;