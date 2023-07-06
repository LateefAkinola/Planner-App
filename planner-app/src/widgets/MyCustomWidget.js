import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const API_KEY = 'ba579273e8c4667647311fe91e20585d';
  const CITY_NAME = 'Lagos';

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&appid=${API_KEY}&units=metric`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    const fetchForecastData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${CITY_NAME}&appid=${API_KEY}&units=metric`
        );
        const forecastList = response.data.list;
        const nextThreeDays = forecastList.filter((item) => {
          const forecastDate = new Date(item.dt_txt);
          const isNextThreeDays = forecastDate.getDate() !== new Date().getDate();
          return isNextThreeDays && forecastDate.getHours() === 12;
        }).slice(0, 3);
        setForecastData(nextThreeDays);
      } catch (error) {
        console.error('Error fetching forecast data:', error);
      }
    };

    fetchWeatherData();
    fetchForecastData();
  }, []);

  const getWeatherIconUrl = (iconCode) => {
    return `http://openweathermap.org/img/w/${iconCode}.png`;
  };

  const styles = {
    weatherWidget: {
      backgroundColor: '#1f253d',
      padding: '10px',
      borderRadius: '10px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
      maxWidth: '300px',
      margin: '0 auto',
    },
    currentWeather: {
      marginBottom: '20px',
    },
    city: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '10px',
      color: '#f5f5f5',
    },
    weatherDetails: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      // textAlign: 'center',
      flex: '1',
    },
    weatherDetailsTemp: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      justifyItems: 'space-around',
      // textAlign: 'center',

      flex: '1',
    },
    weatherIcon: {
      width: '50px',
      height: '50px',
      marginRight: '10px',
    },
    temperature: {
      fontSize: '36px',
      fontWeight: 'bold',
      color: '#f5f5f5',
    },
    temperatureValue: {
      marginRight: '5px',
    },
    temperatureUnit: {
      fontSize: '24px',
      color: '#D5CA0A',
    },
    humidity: {
      marginLeft: '20px',
      fontSize: '18px',
      color: '#f5f5f5',
    },
    humidityLabel: {
      fontWeight: 'bold',
      marginRight: '5px',
      color: '#f5f5f5',
    },
    forecast: {
      marginTop: '10px',
    },
    forecastHeading: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '10px',
      color: '#f5f5f5',
    },
    forecastContainer: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    forecastItem: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      flex: '1',
    },
    forecastDay: {
      fontSize: '14px',
      marginBottom: '5px',
    },
    forecastIcon: {
      width: '30px',
      height: '30px',
    },
    forecastTemperature: {
      fontSize: '14px',
    },
  };

  return (
    <div style={styles.weatherWidget}>
      {weatherData ? (
        <div style={styles.currentWeather}>
          <h2 style={styles.city}>{weatherData.name}</h2>
          <div style={styles.weatherDetails}>
            <div style={styles.weatherDetailsTemp}>
              <img
                src={getWeatherIconUrl(weatherData.weather[0].icon)}
                alt={weatherData.weather[0].description}
                style={styles.weatherIcon}
              />
              <div style={styles.temperature}>
                <span style={styles.temperatureValue}>
                  {weatherData.main.temp}
                </span>
                <span style={styles.temperatureUnit}>°C</span>
              </div>
            </div>
            <div style={styles.weatherDetailsTemp}>
              <div style={styles.humidity}>
                {/* <img src="planner-app/src/humidity2.png"/> */}
                <span style={styles.windSpeedLabel}>Humidity:</span>
                <span>{weatherData.main.humidity}%</span>
              </div>
              <div style={styles.windSpeed}>
                <span style={styles.windSpeedLabel}>Wind Speed:</span>
                <span>{weatherData.wind.speed} m/s</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}


      {forecastData ? (
        <div style={styles.forecast}>
          <h3 style={styles.forecastHeading}>Forecast</h3>
          <div style={styles.forecastContainer}>
            {forecastData.map((forecast, index) => (
              <div key={index} style={styles.forecastItem}>
                <div style={styles.forecastDay}>
                  {new Date(forecast.dt_txt).toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                  })}
                </div>
                <img
                  src={getWeatherIconUrl(forecast.weather[0].icon)}
                  alt={forecast.weather[0].description}
                  style={styles.forecastIcon}
                />
                <div style={styles.forecastTemperature}>
                  {forecast.main.temp}°C
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Loading forecast data...</p>
      )}
    </div>
  );
};

export default WeatherWidget;
