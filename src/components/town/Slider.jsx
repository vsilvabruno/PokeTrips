import { PropTypes } from "prop-types";
import { useState, useEffect, useRef } from 'react';

Slider.propTypes = {
    props: PropTypes.object,
    photo_1: PropTypes.string,
    photo_2: PropTypes.string,
    photo_3: PropTypes.string,
    descriptions: PropTypes.object,
    desc_1: PropTypes.string,
    desc_2: PropTypes.string,
    desc_3: PropTypes.string,
};

function Slider({ props }) {
    const photos = [props.photo_1, props.photo_2, props.photo_3];
    const descriptions = [props.descriptions.desc_1, props.descriptions.desc_2, props.descriptions.desc_3];

    // State to track which image is currently being displayed
    const [currentIndex, setCurrentIndex] = useState(0);

    // Reference to store the interval ID for auto sliding functionality
    const intervalRef = useRef(null);

    // Function to go to the next image and wrap around to the first image when at the last one)
    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
    };

    // Function to go to the previous image and wrap around to the last image when at the first one
    const prevImage = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? photos.length - 1 : prevIndex - 1
        );
    };

    // Function to navigate directly to a specific image based on the index
    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    // Start the automatic slideshow with a 5-second interval
    const startAutoSlide = () => {
        intervalRef.current = setInterval(() => {
            nextImage();
        }, 5000);
    };

    // Stop the automatic slideshow by clearing the interval
    const stopAutoSlide = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    };

    // useEffect to start the slideshow when the component mounts and clean up when it unmounts
    useEffect(() => {
        startAutoSlide();

        // Cleanup function to clear the interval when the component is unmounted
        return () => {
            clearInterval(intervalRef.current);
        };
    }, []);

    // Stop the automatic slideshow if user interaction with it is detected
    const handleUserInteraction = () => {
        stopAutoSlide();
    };

    return (
        <>
            <div className="slider-container">
                <div className="slider">
                    <div className="slider-image">
                        <div className="image-wrapper">
                            {/* Display the current image based on the currentIndex */}
                            <img
                                key={currentIndex}
                                src={photos[currentIndex]}
                                alt={`Slide ${currentIndex + 1}`}
                                className="fade-in"
                            />
                        </div>
                    </div>

                    {/* Previous slide button */}
                    <button className="prev" onClick={() => { prevImage(); handleUserInteraction(); }}>
                        &#10094;
                    </button>

                    {/* Next slide button */}
                    <button className="next" onClick={() => { nextImage(); handleUserInteraction(); }}>
                        &#10095;
                    </button>
                </div>

                {/* Description for the current image based on the currentIndex */}
                <div className="slider-description">
                    <p>{descriptions[currentIndex]}</p>
                </div>

                {/* Dots Navigation for direct navigation to a slide */}
                <div className="slider-dots">
                    {photos.map((_, index) => (
                        <span
                            key={index}
                            className={`dot ${currentIndex === index ? "active" : ""}`}
                            onClick={() => { goToSlide(index); handleUserInteraction(); }}
                        ></span>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Slider;