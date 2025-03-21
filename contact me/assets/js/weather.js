// Fetch and display weather data
async function fetchWeather() {
  try {
    const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=34.7465&longitude=-92.2896&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto');
    const data = await response.json();
    const dailyForecasts = data.daily;

    const weatherIcons = {
      0: '☀️', // Clear sky
      1: '🌤️', // Mainly clear
      2: '⛅', // Partly cloudy
      3: '☁️', // Overcast
      45: '🌫️', // Fog
      48: '🌫️', // Depositing rime fog
      51: '🌦️', // Drizzle: Light
      53: '🌦️', // Drizzle: Moderate
      55: '🌦️', // Drizzle: Dense
      61: '🌧️', // Rain: Slight
      63: '🌧️', // Rain: Moderate
      65: '🌧️', // Rain: Heavy
      71: '❄️', // Snow: Slight
      73: '❄️', // Snow: Moderate
      75: '❄️', // Snow: Heavy
      80: '🌦️', // Rain showers: Slight
      81: '🌦️', // Rain showers: Moderate
      82: '🌦️', // Rain showers: Violent
      95: '⛈️', // Thunderstorm: Slight or moderate
      96: '⛈️', // Thunderstorm with slight hail
      99: '⛈️', // Thunderstorm with heavy hail
    };

    let forecastHTML = '<div class="row">';
    for (let i = 0; i < dailyForecasts.time.length; i++) {
      const weatherCode = dailyForecasts.weathercode[i];
      const icon = weatherIcons[weatherCode] || '❓'; // Default icon if code is unknown

      // Convert date to weekday and day of the month
      const date = new Date(dailyForecasts.time[i]);
      const options = { weekday: 'long', day: 'numeric', month: 'long' };
      const formattedDate = date.toLocaleDateString(undefined, options);

      forecastHTML += `
        <div class="col-md-4 mb-3">
          <div class="card">
            <div class="card-body text-center">
              <h5 class="card-title">${formattedDate}</h5>
              <p class="card-text">${icon}</p>
              <p class="card-text">Max Temp: ${dailyForecasts.temperature_2m_max[i]}°C</p>
              <p class="card-text">Min Temp: ${dailyForecasts.temperature_2m_min[i]}°C</p>
            </div>
          </div>
        </div>`;
    }
    forecastHTML += '</div>';

    document.getElementById('weather-info').innerHTML = forecastHTML;
  } catch (error) {
    document.getElementById('weather-info').textContent = 'Unable to fetch weather data.';
  }
}
fetchWeather();