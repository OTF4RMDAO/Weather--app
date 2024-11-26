// Weather App Script

// Array of cities in Abuja
const cities = [
    "Garki",
    "Wuse",
    "Maitama",
    "Asokoro",
    "Gwarinpa",
    "Lugbe",
    "Jabi",
    "Utako",
    "Kubwa",
    "Nyanya",
    "Karu",
    "Gwagwalada",
    "Kuje",
    "Abaji",
    "Bwari",
];

// OpenWeatherMap API settings
const API_KEY = "ac481344639028cf0e8a600443f52e27"; // Your actual API key
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

// DOM reference for the container
const weatherContainer = document.querySelector(".weather-container");

/**
 * Fetch weather data for a city
 * @param {string} city - Name of the city to fetch weather data for
 * @returns {Promise<Object>} Weather data or fallback info if an error occurs
 */
async function fetchWeather(city) {
    try {
        const response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
        if (!response.ok) {
            throw new Error(`Failed to fetch weather for ${city}: ${response.statusText}`);
        }
        const data = await response.json();
        return {
            Bwari: data.name,
            description: data.weather[0].description,
            temperature: Math.round(data.main.temp), // Rounds temperature for better readability
        };
    } catch (error) {
        console.error(error);
        return {
            city,
            description: "Unavailable",
            temperature: "N/A",
        };
    }
}

/**
 * Create and append a city weather card to the DOM
 * @param {Object} weather - Weather data object with city, description, and temperature
 */
function createCityWeatherCard(weather) {
    const card = document.createElement("div");
    card.className = "city-weather";
    card.innerHTML = `
        <h2>${weather.city}</h2>
        <p>Description: ${weather.description}</p>
        <p>Temperature: ${weather.temperature}°C</p>
    `;
    weatherContainer.appendChild(card);
}

/**
 * Load and display weather data for all cities in the list
 */
async function loadWeatherData() {
    weatherContainer.innerHTML = ""; // Clear any existing content
    for (const city of cities) {
        const weather = await fetchWeather(city); // Fetch weather for each city
        createCityWeatherCard(weather); // Create and append weather card
    }
}

// Initialize the weather app
loadWeatherData();
