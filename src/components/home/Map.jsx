import { PropTypes } from "prop-types";
import { MapContainer, Popup, TileLayer } from "react-leaflet";
import { Link } from "wouter";
import CustomMarker from "../../services/customMarker";

Map.propTypes = {
  data: PropTypes.array,
  id: PropTypes.string,
  coordinates: PropTypes.object,
  town: PropTypes.string
};

function Map({ data }) {
  const kantoCenter = { lat: 35.2, lng: 139.9 };
  const kantoZoom = 9;

  // Scrolls to the top of the page when called
  const scrollToTop = () => {
    window.scrollTo(0, 0)
  };
  
  // "Hero" component rendering
  return (
    <>
      {/* Main component for rendering the map */}
      <MapContainer center={kantoCenter} zoom={kantoZoom} scrollWheelZoom={false} touchZoom={false} dragging={false}>
        {/* Display of the map tiles (the base map) */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png"
        />
        {/* Markers on the map and respective popups */}
        {data.map((value) => (
          <CustomMarker key={value.id} position={value.coordinates}>
            <Popup closeButton={false}>
              <Link className="map-popup" onClick={scrollToTop} href={`/town/${value.id}`}>
                <div className="map-popup-text">{value.town}</div>
              </Link>
            </Popup>
          </CustomMarker>
        ))}
      </MapContainer>
    </>
  );
};

export default Map;