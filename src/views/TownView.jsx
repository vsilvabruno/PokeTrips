import { PropTypes } from "prop-types";
import Slider from "../components/town/Slider";
import ZoomedMap from "../components/town/ZoomedMap";
import TripSummary from "../components/town/TripSummary";
import Weather from "../components/town/Weather";
import PkmnEncounters from "../components/town/PkmnEncounters";
import usePkmnData from "../hooks/usePkmnData";

TownView.propTypes = {
  tripInfo: PropTypes.array,
  params: PropTypes.object
};

function TownView({ tripInfo, params }) {
  // Extract 'id' from route parameters
  const { id } = params;

  // Find the specific trip from the 'tripInfo' array based on the 'id'
  const trip = tripInfo.find(item => item.id === id);

  // Redirect to 404 page if trip is not found
  if (!trip) {
    window.location = "/404";
  }

  // Define the Pokemon names based on the encounters from the trip data
  const pkmnNames = [
    trip.encounters.poke_1,
    trip.encounters.poke_2,
    trip.encounters.poke_3,
  ];

  const { pkmnData, loading, error } = usePkmnData(pkmnNames);

  // Show loading state while pkmn data is being fetched
  if (loading) {
    return (
      <div className="loading-container">
        <img src="/images/icons/loading.png" alt="Loading..." />
        Loading...
      </div>
    );
  };

  // Show error state if there was an issue fetching pkmn data
  if (error) {
    console.error("Problem fetching data: " + error.message);
    return (
      <div className="error-container">
        <img src="/images/icons/error.png" alt="Error" />
        Error
      </div>
    );
  };

  // Town view rendering once pkmn data is fetched without errors
  return (
    <>
      <main>
        {/* Title section displaying town name and trip date */}
        <div className="title-container">
          {trip.town}
          <div className="trip-date-container">
            <i className="fa-solid fa-calendar" /> {trip.date}
          </div>
        </div>

         {/* Slider component */}
        <Slider props={trip.images} />

        {/* ZoomedMap component */}
        <ZoomedMap props={trip} />

        {/* Bottom container with Trip Summary, Weather, and Pokemon Encounters components */}
        <div className="bottom-container">
          {/* TripSummary component sub-container */}
          <TripSummary props={trip} />
          {/* Weather and Pokemon Encounters components sub-container */}
          <div className="weather-pkmn-container">
            <Weather props={trip} />
            <PkmnEncounters pkmnData={pkmnData} props={trip} />
          </div>
        </div>
      </main>
    </>
  );
}

export default TownView;