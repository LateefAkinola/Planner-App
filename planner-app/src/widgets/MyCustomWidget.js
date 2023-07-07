import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const API_KEY = 'ba579273e8c4667647311fe91e20585d';

  useEffect(() => {
    const fetchWeatherData = async (latitude, longitude) => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    const fetchForecastData = async (latitude, longitude) => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
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

    const handleLocationSuccess = (position) => {
      const { latitude, longitude } = position.coords;
      fetchWeatherData(latitude, longitude);
      fetchForecastData(latitude, longitude);
    };

    const handleLocationError = (error) => {
      console.error('Error getting user location:', error);
    };

    navigator.geolocation.getCurrentPosition(handleLocationSuccess, handleLocationError);
  }, []);

  const getWeatherIconUrl = (iconCode) => {
    return `http://openweathermap.org/img/w/${iconCode}.png`;
  };


  

  return (
    <div style={styles.weatherWidget}>
      {weatherData ? (
        <div style={styles.currentWeather}>
          <h2 style={styles.city}>{weatherData.name}</h2>
          <span style={styles.date}>
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
          </span>
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
            <p style={styles.temperatureDesc}>{weatherData.weather[0].description}</p>
            <div style={styles.weatherDetailsOther}>
              <div>
                {/* <i src="./drop.png"/> */}
                <span style={styles.weatherOther}>Humidity: </span>
                <span style={styles.humidityLabel}>{weatherData.main.humidity}%</span>
              </div>
              <div>
                <span style={styles.weatherOther}>Wind Speed: </span>
                <span style={styles.windLabel}>{weatherData.wind.speed}m/s</span>
              </div>
            </div>
            <div>
              <span style={styles.weatherOther}>Air Pressure: </span>
              <span style={styles.windLabel}>{weatherData.main.pressure} hPa</span>
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

const styles = {
  weatherWidget: {
    backgroundColor: '#1f253d',
    padding: '10px',
    borderRadius: '10px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    width: '300px',
    margin: '0 auto',
    fontFamily: 'Poppins, sans-serif',
  },
  currentWeather: {
    marginBottom: '20px',
  },
  city: {
    fontSize: '26px',
    fontWeight: 'bold',
    // marginBottom: '2px',
    color: '#f5f5f5',
  },
  date: {
    fontSize: '14px',
    fontWeight: '600',
    marginBottom: '10px',
    color: '#EBCA08',
  },
  weatherDetails: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
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
    color: '#f5f5f5',
  },
  temperatureDesc: {
    fontSize: '20px',
    fontWeight: 'medium',
    marginBottom: '10px',
    color: '#f5f5f5',
    alignText: 'center',
  },
  weatherDetailsTemp: {
    display: 'flex',
    // alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlign: 'center',
    fontSize: '14px',
    fontWeight: 'medium',
    flex: '1',
  },
  weatherDetailsOther: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlign: 'center',
    // flex: '1',
  },
  weatherOther: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#E3E3E3',
  },
  humidityLabel: {
    fontWeight: 'bold',
    fontSize: '15px',
    marginRight: '12px',
    color: '#ffffff',
  },
  windLabel: {
    fontSize: '15px',
    fontWeight: 'bold',
    color: '#ffffff',
  },
  forecast: {
    marginTop: '10px',
  },
  forecastHeading: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#EBCA08',
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
