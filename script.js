const apiKey = '874ee8a22fc3f7e3258c696984701d3d';

document.getElementById('getWeatherBtn').addEventListener('click', () => {
    const city = document.getElementById('cityInput').value;
    if(city) {
        getWeather(city);
    } else {
        alert('Please enter a city name');
    }
});

async function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    try {
        const response = await fetch(url);
        if(!response.ok) throw new Error('City not found');
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        document.getElementById('weatherResult').innerHTML = `<p>${error.message}</p>`;
    }
}

function displayWeather(data) {
    const { name } = data;
    const { temp } = data.main;
    const { description, icon } = data.weather[0];

    document.getElementById('weatherResult').innerHTML = `
        <h2>${name}</h2>
        <p>${temp}°C</p>
        <p>${description}</p>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
    `;
}
