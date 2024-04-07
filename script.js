document.addEventListener('DOMContentLoaded', async function () {
  const cityInput = document.getElementById('cityInput');
  const getWeatherBtn = document.getElementById('getWeatherBtn');
  const weatherInfoContainer = document.getElementById('weatherInfo');

  // Set default city to Manchester
  const defaultCity = 'Manchester';
  cityInput.value = defaultCity;

  // Function to get weather information
  async function getWeather(city) {
    const apiKey = '8077b9d3132b56e84563d8f43816e55f';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(url);
      console.log(response);
      const data = await response.json();
      console.log(data);

      if (data.cod === '404') {
        // Check if there is no result
        weatherInfoContainer.style.display = 'none'; // Hide weather info container
      } else {
        weatherInfoContainer.style.display = 'block'; // Show weather info container
        const temperature = Math.round(data.main.temp);
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;

        const weather = `
          <h3>${data.name}</h3>
          <p>Temperature: ${temperature}°C</p>
          <p>Humidity: ${humidity}%</p>
          <p>Wind: ${windSpeed} km/h</p>
          <p>Weather: ${data.weather[0].description}</p>
        `;

        weatherInfoContainer.innerHTML = weather;
      }
    } catch (error) {
      console.error(error);
    }
  }

  // Call getWeather function with default city when page loads
  await getWeather(defaultCity);

  // Event listener for getWeatherBtn click
  getWeatherBtn.addEventListener('click', async function () {
    const city = cityInput.value;
    await getWeather(city);
  });
});
