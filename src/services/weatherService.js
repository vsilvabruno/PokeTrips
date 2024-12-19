const url = "https://api.open-meteo.com/v1/forecast";

async function getWeatherData(latitude, longitude) {
  try {
    const currentWeatherResponse = await fetch(
      `${url}?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );
    const currentWeatherData = await currentWeatherResponse.json();

    const forecastResponse = await fetch(
      `${url}?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weather_code`
    );
    const forecastData = await forecastResponse.json();

    return {
      currentWeather: currentWeatherData.current_weather,
      forecast: forecastData.daily,
    };
  } catch (error) {
    console.error("Problem fetching weather data: " + error);
    throw error;
  }
}

export default getWeatherData;