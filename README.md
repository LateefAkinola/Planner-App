# Planner-App

- **Weather Data Fetching:**
  - The `fetchWeatherData` function is responsible for fetching the current weather data from the OpenWeatherMap API.
  - It takes in the `latitude` and `longitude` parameters, which are obtained either from the user's geolocation or the default city (Lagos).
  - Inside the function, an asynchronous Axios GET request is made to the API endpoint using the provided API key, latitude, and longitude.
  - If the request is successful, the response data containing the weather information is stored in the `weatherData` state using the `setWeatherData` function.
  - If an error occurs during the request, the error is logged to the console.
- **Forecast Data Fetching:**
  - The `fetchForecastData` function is responsible for fetching the forecast data from the OpenWeatherMap API.
  - Similar to `fetchWeatherData`, it takes in the `latitude` and `longitude` parameters.
  - Inside the function, an asynchronous Axios GET request is made to the API endpoint using the provided API key, latitude, and longitude.
  - If the request is successful, the response data containing the forecast information is stored in the `forecastData` state using the `setForecastData` function.
  - The fetched forecast data is filtered to include only the next three days' forecasts at 12:00 PM.
  - If an error occurs during the request, the error is logged to the console.
- **Geolocation:**
  - The component uses the `navigator.geolocation` API to obtain the user's current geolocation coordinates.
  - The `getCurrentPosition` method is called with two callback functions: `handleLocationSuccess` and `handleLocationError`.
  - If the user grants permission and the geolocation is successfully obtained, the `handleLocationSuccess` function is called.
  - Inside `handleLocationSuccess`, the `latitude` and `longitude` coordinates are extracted from the `position.coords` object.
  - The `fetchWeatherData` and `fetchForecastData` functions are then called with the obtained coordinates to fetch the weather and forecast data accordingly.
  - If there is an error obtaining the geolocation or the user denies permission, the `handleLocationError` function is called, and an error message is logged to the console.
- **Weather Icon URL Generation:**
  - The `getWeatherIconUrl` function generates the URL for the weather icon based on the provided `iconCode`.
  - It constructs the URL by appending the `iconCode` to the base URL of the OpenWeatherMap icon repository.
  - The generated URL is then returned, and it can be used as the `src` attribute for an `<img>` element to display the weather icon.
- **Rendering the Widget:**
  - Inside the `return` statement, the JSX code defines the structure and appearance of the weather widget.
  - The widget is enclosed within a `<div>` element with the `styles.weatherWidget` style applied to it.
  - Conditionally rendered content is used to display different states of the widget:
    - If `weatherData` exists, the current weather information is displayed, including the city name, date, temperature, weather description, humidity, wind speed, and air pressure.
    - If `forecastData` exists, the forecast section is displayed, showing the forecast for the next three days, including the dates and temperatures.
    - If `weatherData` or `forecastData` is not available, a loading message is displayed.
  - The styles for different elements within the widget are defined using the `styles` object.
- **Customization:**
  - The appearance of the widget can be customized by modifying the CSS styles defined in the `styles` object.
  - You can adjust the colors, font sizes, margins, and other properties to match the design of your planner app.
- **Usage:**
  - To use the Weather Widget component, integrate it into your planner app by including `<WeatherWidget />` in the desired location where you want to display the weather information.
  - The widget will automatically fetch the weather data and forecast based on the user's geolocation. If geolocation is not available, it falls back to the default city (Lagos).
  - The weather information, including the current weather and forecast, will be displayed in a user-friendly format.
  - You can further customize the widget's appearance by modifying the provided styles or adding additional styling to match your app's design.
  - Ensure that the necessary dependencies, including React and Axios, are installed in your project.




- **Weather Data Fetching:**
  - The `fetchWeatherData` function is an asynchronous function that takes latitude and longitude as parameters.
  - It makes a GET request to the OpenWeatherMap API, passing the latitude, longitude, and API key as query parameters.
  - The response from the API is stored in the `response` variable.
  - If the request is successful, the weather data is extracted from the `response.data` property and stored in the `weatherData` state using the `setWeatherData` function.
  - If there is an error during the request, the error is logged to the console using `console.error`.

- **Forecast Data Fetching:**
  - The `fetchForecastData` function is an asynchronous function that takes latitude and longitude as parameters.
  - It makes a GET request to the OpenWeatherMap API, similar to the `fetchWeatherData` function.
  - The response from the API is stored in the `response` variable.
  - If the request is successful, the forecast data is extracted from the `response.data.list` property.
  - The `forecastList` variable stores the complete list of forecast data.
  - The `nextThreeDays` variable filters the forecast list to include only the next three days' forecast at 12 PM.
  - The filtered forecast data is stored in the `forecastData` state using the `setForecastData` function.
  - If there is an error during the request, the error is logged to the console using `console.error`.

- **Geolocation Handling:**
  - The `handleLocationSuccess` function is called when the user's location is successfully obtained using the geolocation API.
  - It receives the `position` object containing the latitude and longitude coordinates.
  - The latitude and longitude values are extracted from `position.coords` and passed to the `fetchWeatherData` and `fetchForecastData` functions to fetch the weather and forecast data for the user's location.
  - If there is an error obtaining the user's location, the `handleLocationError` function is called.
  - The `handleLocationError` function receives the `error` object and logs the error to the console using `console.error`.

- **Component Mounting and Rendering:**
  - The `useEffect` hook is used to handle the component's mounting and fetching of weather and forecast data.
  - When the component mounts, the `useEffect` hook is triggered.
  - It calls the `navigator.geolocation.getCurrentPosition` function to obtain the user's current location.
  - The `handleLocationSuccess` and `handleLocationError` functions are passed as success and error callbacks to the geolocation API.
  - If the user's location is successfully obtained, the `handleLocationSuccess` function is called, which fetches the weather and forecast data for that location.
  - The weather and forecast data are stored in the component's state variables (`weatherData` and `forecastData`) using the `setWeatherData` and `setForecastData` functions.
  - The JSX code in the `return` statement is rendered, displaying the weather widget based on the available data in the component's state.
  - If the weather data is available, it is displayed along with the current date, temperature, weather icon, humidity, wind speed, and air pressure.
  - If the forecast data is available, it is displayed as a 3-day forecast with the respective dates and temperatures.
  - If the weather or forecast data is not available, a loading message is displayed.
