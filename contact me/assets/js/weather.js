    // Fetch and display weather data
    async function fetchWeather() {
        try {
          const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=34.7465&longitude=-92.2896&current_weather=true');
          const data = await response.json();
          const weather = data.current_weather;
          document.getElementById('weather-info').textContent = `Temperature: ${weather.temperature}°C, Condition: ${weather.weathercode}`;
        } catch (error) {
          document.getElementById('weather-info').textContent = 'Unable to fetch weather data.';
        }
      }
      fetchWeather();