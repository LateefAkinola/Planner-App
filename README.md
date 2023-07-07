# Weather Widget in the Planner App
Tasked to create a custom widget in addition to an existing planner App

## Why add a Weather Widget in the Planner App?

- The Weather Widget is an appropriate addition to the Planner App as it provides users with valuable weather information that can enhance their planning and scheduling activities.
- Weather conditions can significantly impact daily plans, events, and outdoor activities, making it essential to have real-time weather updates conveniently accessible within the Planner App for users to stay informed and make informed decisions.
- The Weather Widget in the Planner App retrieves and displays current weather data and a ``three-day forecast`` for the user's location. The widget utilizes the OpenWeatherMap API to fetch weather information such as `temperature`, `weather description`, `humidity`, `wind speed`, and `air pressure`.

### Benefits of the Weather Widget in the Planner App
--------------------------------------------------------
The Weather Widget offers several advantages to users of the Planner App:

- `Enhanced Planning`:
  Users can make more informed decisions and plan their activities effectively by considering the current weather conditions and forecasts.
- `Seamless Integration`:
  The widget seamlessly integrates within the Planner App, providing a unified user experience without the need for switching between different applications or websites.
- `Real-time Updates`:
  The widget automatically updates the weather information at regular intervals, ensuring that users have access to the latest data.
- `Visual Representation`:
   The weather icons used in the widget provide a visually appealing representation of the weather conditions, making it easy to grasp the information at a glance. Icons for temperature, humidity, wind speed, air pressure, and forecast provide comprehensive weather insights.
- `User-friendly Interface`:
  The widget is designed with a clean and user-friendly interface, allowing users to view essential weather details such as temperature, description, humidity, wind speed, air pressure, and a concise forecast for the upcoming days. The information is presented in a visually appealing manner, enhancing the overall user experience.


## How to Use the Weather Widget

- `Initial Display/Setup`:
   When the Planner App is loaded, the Weather Widget will automatically determine the user's location using geolocation. If geolocation is available and permission is granted, the widget will display the current weather and forecast for the user's location. If geolocation is not available or permission is denied, the widget will fall back to a default city (London, in this case) to display weather information.

- `Weather Details`:
   The Weather Widget provides various weather details for the selected location:
      - `City Name and Date`: The widget displays the name of the city and the current date.
      - `Temperature`: The current temperature in `Celsius (°C)` is shown, along with an icon representing the weather conditions.
      - `Weather Description`: A brief description of the current weather conditions is displayed.
      - `Humidity`: The humidity percentage `(%)` is shown, represented by a humidity icon.
      - `Wind Speed`: The wind speed in `meters per second (m/s)` is displayed, along with a wind icon.
      - `Air Pressure`: The air pressure in `hectopascals (hPa)` is shown, represented by a pressure icon.

- `Three-Day Forecast`:
   The widget also provides a three-day forecast for the selected location. The forecast includes the date, an icon representing the weather conditions, and the temperature in `Celsius (°C)` for each of the next three days.

- `Interaction`:
  Users can interact with the Weather Widget by simply viewing the weather information and forecast. No explicit actions or inputs are required to retrieve the data. The widget automatically refreshes the weather information periodically to ensure the data remains up to date.

```Note```: The Weather Widget requires an `internet connection` to fetch weather information from the `OpenWeatherMap API`.


## How the Code Works:

- **Weather Data Fetching:**
     - The `fetchWeatherData` function is responsible for fetching the current weather data from the ``OpenWeatherMap API``.
     - It takes in the `latitude` and `longitude` parameters, which are obtained either from the user's geolocation.
     - Inside the function, an asynchronous Axios GET request is made to the ``OpenWeatherMap API`` endpoint by passing the provided `API key`, `latitude`, and `longitude` as query parameters. 
     - If the request is successful, the weather data is extracted from the `response.data` property and stored in the `weatherData` state using the `setWeatherData` function.
     - If there is an error during the request, the error is logged to the console using `console.error`.

- **Forecast Data Fetching:**
     - The `fetchForecastData` function is also an asynchronous function that takes `latitude` and `longitude` as parameters.
     - It makes a GET request to the ``OpenWeatherMap API``, similar to the `fetchWeatherData` function.
     - The response from the API is stored in the `response` variable.
     - If the request is successful, the forecast data is extracted from the `response.data.list` property.
     - The `forecastList` variable stores the complete list of forecast data.
     - The `nextThreeDays` variable filters the forecast list to include only the next three days' forecast at 12 PM.
     - The filtered forecast data is stored in the `forecastData` state using the `setForecastData` function.
     - If there is an error during the request, the error is logged to the console using `console.error`.


- **Geolocation:**
     - The component uses the `navigator.geolocation` API to obtain the user's current geolocation coordinates. If geolocation is not available, it falls back to the default city (`London`)
     - The `getCurrentPosition` method is called with two callback functions: `handleLocationSuccess` and `handleLocationError`.
     - If the user grants permission and the geolocation is successfully obtained, the `handleLocationSuccess` function is called.
     - Inside `handleLocationSuccess`, the `latitude` and `longitude` coordinates are extracted from the `position.coords` object.
     - The `fetchWeatherData` and `fetchForecastData` functions are then called with the obtained coordinates to fetch the weather and forecast data accordingly.
     - If there is an error obtaining the geolocation or the user denies permission, the `handleLocationError` function is called, an error message is logged to the console using `console.error`, and it falls back to the default city (`London`) by calling the `fetchWeatherData` and `fetchForecastData` functions with the default city name.
     - The `useEffect` hook is used to execute this geolocation logic when the component mounts.
     - It fetches the initial weather and forecast data based on the user's geolocation using `getCurrentPosition`.
     - Additionally, a periodic data refresh is set up using `setInterval` to automatically fetch updated weather and forecast data at regular intervals.
     - Every 30 seconds (adjustable as needed), the `getCurrentPosition` function is called again to fetch updated weather and forecast data based on the latest geolocation.
     - The `clearInterval` function is returned in the cleanup function to clear the interval when the component unmounts, preventing memory leaks.

- **Weather Icon URL Generation:**
     - The `getWeatherIconUrl` function generates the URL for the weather icon based on the provided `iconCode`.
     - It constructs the URL by appending the `iconCode` to the base URL of the OpenWeatherMap icon repository.
     - The generated URL is then returned, and it can be used as the `src` attribute for an `<img>` element to display the weather icon.


- **Rendering the Widget:**
     - Inside the `return` statement, the JSX code defines the structure and appearance of the weather widget.
     - Conditionally rendered content is used to display different states of the widget:
       - If `weatherData` exists, the current weather information is displayed, including the `city name`, `date`, `temperature`, `weather description`, `humidity`, `wind speed`, and `air pressure`.
       - If `forecastData` exists, the forecast section is displayed, showing the forecast for the `next three days`, including the `dates` and `temperatures`.
       - If `weatherData` or `forecastData` is not available, a loading message is displayed.
     - The styles for different elements within the widget are defined using the `styles` object.
  
- **Customization:**
     - The appearance of the widget can be customized by modifying the CSS styles defined in the `styles` object.
     - You can adjust the colors, font sizes, margins, and other properties to match the design of the planner app.



