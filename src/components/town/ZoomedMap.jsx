import { PropTypes } from "prop-types";
import { MapContainer, Popup, TileLayer } from "react-leaflet";
import CustomMarker from "../../services/customMarker";

ZoomedMap.propTypes = {
  props: PropTypes.object,
  coordinates: PropTypes.object,
  town: PropTypes.string
};

function ZoomedMap({ props }) {
  // Destructure props to extract coordinates and town
  const coordinates = props.coordinates;
  const town = props.town;

  const zoom = 12;

  // Scrolls to the top of the page when called
  const scrollToTop = () => {
    window.scrollTo(0, 0)
  }

  // "Zoomed map" component rendering
  return (
    <>
      {/* Main component for rendering the map */}
      <MapContainer center={coordinates} zoom={zoom} className="zoomed-map-container" scrollWheelZoom={false} touchZoom={false} dragging={false}>
        {/* Display of the map tiles (the base map) */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png"
        />
        {/* Marker on the map and respective popup */}
        <CustomMarker position={coordinates}>
          <Popup closeButton={false}>
            <div className="map-popup" onClick={scrollToTop}>
              <div className="map-popup-text">{town}</div>
            </div>
          </Popup>
        </CustomMarker>
      </MapContainer>
    </>
  );
};

export default ZoomedMap;