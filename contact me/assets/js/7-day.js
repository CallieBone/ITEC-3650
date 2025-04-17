async function generate7DayForecast() {
    const apiKey = '2828a96fab262b13b7d825acf754d808';
    const city = 'Little Rock';
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dailyForecast = {};

    // Group forecasts by day
    data.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const day = date.toISOString().split('T')[0]; 
        if (!dailyForecast[day] || date.getHours() === 12) {
            dailyForecast[day] = item;
        }
    });

    // Ensure 7 consecutive days
    const today = new Date();
    const forecast = [];
    for (let i = 0; i < 7; i++) {
        const currentDay = new Date(today);
        currentDay.setDate(today.getDate() + i);
        const dayKey = currentDay.toISOString().split('T')[0];
        const dayIndex = currentDay.getDay();

        if (dailyForecast[dayKey]) {
            const item = dailyForecast[dayKey];
            const condition = item.weather[0].main;
            const icons = {
                Clear: '☀️',
                Clouds: '☁️',
                Rain: '🌧️',
                Thunderstorm: '⛈️',
                Snow: '❄️',
                Drizzle: '🌦️',
                Mist: '🌫️'
            };

            forecast.push({
                day: days[dayIndex],
                temperature: item.main.temp.toFixed(1),
                condition: condition,
                icon: icons[condition] || '❓'
            });
        } else {
            // Fallback for missing data
            forecast.push({
                day: days[dayIndex],
                temperature: 'N/A',
                condition: 'Unknown',
                icon: '❓'
            });
        }
    }

    return forecast;
}

async function display7DayForecast() {
    const forecast = await generate7DayForecast();
    const forecastContainer = document.getElementById('weather-info');
    forecastContainer.innerHTML = ''; // Clear previous content

    forecastContainer.style.display = 'flex';
    forecastContainer.style.justifyContent = 'space-between';

    forecast.forEach(dayForecast => {
        const dayElement = document.createElement('div');
        dayElement.className = 'forecast-day';
        dayElement.style.flex = '1'; 
        dayElement.style.margin = '0 10px'; 
        dayElement.innerHTML = `
            <h3>${dayForecast.day}</h3>
            <p>${dayForecast.icon} ${dayForecast.condition}</p>
            <p>Temperature: ${dayForecast.temperature}°C</p>
        `;
        forecastContainer.appendChild(dayElement);
    });
}

document.addEventListener('DOMContentLoaded', display7DayForecast);
