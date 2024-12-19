import { PropTypes } from "prop-types";
import Hero from "../components/home/Hero";
import TownCard from "../components/home/TownCard";
import Map from "../components/home/Map";

HomeView.propTypes = {
  tripInfo: PropTypes.array
};

function HomeView({ tripInfo }) {
  // Sorting the trip cards by trip date, from most recent to oldest
  const sortedCards = [...tripInfo].sort((a, b) => new Date(b.date) - new Date(a.date));

  // Home View component rendering
  return (
    <>
      <main>
        <Hero />
        <div className="title-container">
          Latest
        </div>

        {/* Container for all the trip cards */}
        <div className="town-cards-container">
          {sortedCards.map((info) => (
            // Render a TownCard for each item in the sortedCards array
            <TownCard key={info.id} props={info}/>
          ))}
        </div>
        
        {/* Map component */}
        <Map data={tripInfo} />
      </main>
    </>
  )
};
  
export default HomeView;