import { PropTypes } from "prop-types";

TripSummary.propTypes = {
    props: PropTypes.object,
    summary: PropTypes.string
};

function TripSummary({ props }) {
    // Split the summary text by new lines (`\n`) and map each line into a new paragraph
    const tripSummary = props.summary.split('\n').map((para, index) => (
        <p key={index}>{para.trim()}</p> 
    ));

    return (
        <>
            <div className="tripsummary-container">
                <span>{tripSummary}</span>
            </div>
        </>
    )
};
        
export default TripSummary;