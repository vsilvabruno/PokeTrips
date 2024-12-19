import { PropTypes } from "prop-types";
import { useState } from "react";
import { Link } from "wouter";

TownCard.propTypes = {
  props: PropTypes.object,
  id: PropTypes.string,
  images: PropTypes.object,
  town: PropTypes.string,
  date: PropTypes.string,
};

function TownCard({ props }) {
  const [cardHover, setCardHover] = useState(false);

  // Scrolls to the top of the page when called
  const scrollToTop = () => {
    window.scrollTo(0, 0)
  }

  // "Town card" component rendering
  return (
    <>
      <Link onClick={scrollToTop} href={`/town/${props.id}`}>
        {/* Card container */}
        <div
          onMouseEnter={() => {setCardHover(true)}}
          onMouseLeave={() => {setCardHover(false)}}
          className={cardHover ? "card-container hover" : "card-container"}
        >
          <img src={props.images.photo_1} alt={`${props.town} Photo`} />
          <div className="card-text-container">
            <h4>{props.town}</h4>
            <h5><i className="fa-solid fa-calendar" /> {props.date}</h5>
          </div>
        </div>
      </Link>
    </>
  )
};
  
export default TownCard;