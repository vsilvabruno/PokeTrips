import PropTypes from 'prop-types';
import useWeather from '../../hooks/useWeather';

Weather.propTypes = {
  props: PropTypes.object,
  coordinates: PropTypes.object,
  lat: PropTypes.string,
  lng: PropTypes.string,
  town: PropTypes.string,
  images: PropTypes.object
};

function Weather({ props }) {
  // Destructure props to extract coordinates (latitude & longitude), images, and town
  const { coordinates, images, town } = props;
  const { lat: latitude, lng: longitude } = coordinates;
  const image = images.photo_1;

  const { currentWeather, forecast, loading, error } = useWeather(latitude, longitude);

  // Show loading state while weather data is being fetched
  if (loading) {
    return (
      <div className="loading-container">
        <img src="/images/icons/loading.png" alt="Loading..." />
        Loading...
      </div>
    );
  };

  // Show error state if there was an issue fetching weather data
  if (error) {
    console.error("Problem fetching data: " + error.message);
    return (
      <div className="error-container">
        <img src="/images/icons/error.png" alt="Error" />
        Error
      </div>
    );
  };

  // Function to get the appropriate weather icon based on weather code and whether it's day or night
  const getWeatherIcon = (weatherCode, isDay) => {
    const isNight = !isDay;
    switch (weatherCode) {
      case 0: 
        return <img src={isNight ? "/images/icons/weather/weather_moon.svg" : "/images/icons/weather/weather_sun.svg"} alt="Clear sky" />;
      case 1: 
      case 2: 
      case 3:
        return <img src={isNight ? "/images/icons/weather/weather_cloudmoon.svg" : "/images/icons/weather/weather_cloudsun.svg"} alt="Partly cloudy" />;
      case 45: 
      case 48:
        return <img src={isNight ? "/images/icons/weather/weather_fog.svg" : "/images/icons/weather/weather_fog.svg"} alt="Fog" />;
      case 51:
      case 53:
      case 55:
        return <img src={isNight ? "/images/icons/weather/weather_rainmoon.svg" : "/images/icons/weather/weather_rainsun.svg"} alt="Light rain" />;
      case 56: 
      case 57:
        return <img src={isNight ? "/images/icons/weather/weather_rainmoon.svg" : "/images/icons/weather/weather_rainsun.svg"} alt="Heavy rain" />;
      case 61:
      case 63:
      case 65:
        return <img src={isNight ? "/images/icons/weather/weather_rainmoon.svg" : "/images/icons/weather/weather_rainsun.svg"} alt="Rain" />;
      case 66:
      case 67:
        return <img src={isNight ? "/images/icons/weather/weather_rainmoon.svg" : "/images/icons/weather/weather_rainsun.svg"} alt="Heavy rain" />;
      case 71: 
      case 73:
      case 75:
      case 77:
        return <img src={isNight ? "/images/icons/weather/weather_snowmoon.svg" : "/images/icons/weather/weather_snowsun.svg"} alt="Snow" />;
      case 80:
      case 81:
      case 82:
        return <img src={isNight ? "/images/icons/weather/weather_rainmoon.svg" : "/images/icons/weather/weather_rainsun.svg"} alt="Rain showers" />;
      case 95:
      case 96:
      case 99:
        return <img src={isNight ? "/images/icons/weather/weather_thunder.svg" : "/images/icons/weather/weather_thunder.svg"} alt="Thunderstorm" />;
      default:
        return <img src={isNight ? "/images/icons/weather/weather_clouds.svg" : "/images/icons/weather/weather_clouds.svg"} alt="Cloudy" />;
    }
  };

  // Weather component rendering once weather data is fetched without errors
  return (
    <>
      <div className="weather-container">
        {/* Current weather card */}
        <div className="current-card">
          <img className="bg" src={image} alt="Town Photo" />
          <h3>
            <i className="fa-solid fa-location-dot"></i> {town}
          </h3>
          {currentWeather && (
            <div className="info">
              {/* Current temperature */}
              <div className="temperature">
                <h1>
                  <i className="fa-solid fa-temperature-three-quarters" /> {Math.floor(currentWeather.temperature)}°C
                </h1>
              </div>
              {/* Current weather icon */}
              <div className="icon">
                {getWeatherIcon(currentWeather.weathercode, currentWeather.is_day === 1)}
              </div>
            </div>
          )}
        </div>

        {/* 5-day forecast card */}
        <div className="forecast-card">
          <div className="forecast-grid">
            {/* Loop through the forecast data and render a forecast item for each day */}
            {/* Remove data for the current day in the forecast card and the last day, to make it a 5-day forecast */}
            {forecast && forecast.time.slice(1, -1).map((time, index) => (
              <div key={index} className="forecast-item">
                {/* Day of the week */}
                <h3>
                  {new Date(time).toLocaleDateString('en-GB', { weekday: 'short' })}
                </h3>
                {/* Weather icon for the day */}
                <div className="icon">
                  {getWeatherIcon(forecast.weather_code[index], true)}
                </div>
                {/* Max and min temperatures for the day */}
                <p>
                  <i className="fa-solid fa-temperature-arrow-up" /> {Math.floor(forecast.temperature_2m_max[index])}°C
                </p>
                <p>
                  <i className="fa-solid fa-temperature-arrow-down" /> {Math.floor(forecast.temperature_2m_min[index])}°C
                </p>
                {/* Precipitation percentage for the day */}
                <p>
                  <i className="fa-solid fa-droplet" /> {Math.floor(forecast.precipitation_sum[index])}%
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Weather;