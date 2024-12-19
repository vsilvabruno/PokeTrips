import { useState, useEffect } from 'react';
import getWeatherData from '../services/weatherService';

const useWeather = (latitude, longitude) => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const { currentWeather, forecast } = await getWeatherData(latitude, longitude);
        setCurrentWeather(currentWeather);
        setForecast(forecast);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (latitude && longitude) {
      fetchWeather();
    }
  }, [latitude, longitude]);

  return { currentWeather, forecast, loading, error };
};

export default useWeather;