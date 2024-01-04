const apiKey = '92e22793faa0a44404e775685ced5d54'; // Replace with your API key

const weatherCardsContainer = document.getElementById('weatherCards');

let cities = [];

function addCity() {
    const cityInput = document.getElementById('cityInput');
    const cityName = cityInput.value.trim();

    if (cityName === '') {
        alert('Please enter a city name.');
        return;
    }

    if (cities.some(city => city.name.toLowerCase() === cityName.toLowerCase())) {
        alert('City already added.');
        return;
    }

    fetchWeatherData(cityName);
    cityInput.value = '';
}

function fetchWeatherData(cityName) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            cities.push(data);
            cities.sort((a, b) => a.main.temp - b.main.temp);
            updateWeatherCards();
        })
        .catch(error => {
            alert('Error fetching weather data.');
            console.error(error);
        });
}


function updateWeatherCards() {
  weatherCardsContainer.innerHTML = '';
  cities.forEach(city => {
      const card = document.createElement('div');
      card.classList.add('weather');

      // Extract and display relevant weather details
      const temperature = city.main.temp;
      const high = city.main.temp_max;
      const low = city.main.temp_min;
      const weatherCondition = city.weather[0].main;
      const cityName = `${city.name}, ${city.sys.country}`;

      card.innerHTML = `
          <div class="temp">
              <p class="temprature">${temperature}°</p>
              <p class="high_low">H:${high}° L:${low}°</p>
              <p class="city">${cityName}</p>
          </div>
          <div class="image">
              <img src="${getWeatherIcon(weatherCondition)}" alt="${weatherCondition}">
              <p class="description">${weatherCondition}</p>
          </div>
      `;

      weatherCardsContainer.appendChild(card);
  });
}

function getWeatherIcon(weatherCondition) {
  // Implement a function to map weather conditions to icon paths
  // You may need to adjust this based on the actual icon paths you have
  const weatherIcons = {
      'Rain': './assets/Moon cloud mid rain.svg',
      'Clear': './assets/Sun cloud angled rain.svg',
      'Clouds': './assets/Moon cloud mid rain.svg',
      'Wind': './assets/Moon cloud fast wind.svg'
      // Add more conditions as needed
  };

  return weatherIcons[weatherCondition] || './assets/Sun cloud angled rain.svg';
}
