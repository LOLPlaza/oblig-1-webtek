let weatherUpdates = document.getElementById("weatherUpdates");
let values = [];
const cities = ['Seoul', 'Jeju Island', 'Los Angeles', 'Paris', 'Tokyo'];

const meteoUrl = "https://api.open-meteo.com/v1/forecast?latitude=37.566,33.5097,34.0522,48.8534,35.6895&longitude=126.9784,126.5219,-118.2437,2.3488,139.6917&current=temperature_2m,wind_speed_10m&wind_speed_unit=ms";


function fetchStatus() {
    fetch(meteoUrl).then(response => response.json()).then(json => {
        values = [];
        for (let i = 0; i < 5; i++) {
            values.push(json.slice(i, i + 1));
        }
        renderValues();
    })
}

function renderValues() {
    weatherUpdates.innerHTML = ' ';
    for (let i = 0; i < values.length; i++) {
        weatherUpdates.innerHTML += `<article class="weather">
                        <div class="city">${cities[i]}</div>
                        <div class="temperature">It is ${values[i][0].current.temperature_2m}&deg</div>
                        <div class="windSpeed">The wind speed is currently ${values[i][0].current.wind_speed_10m}m/s</div>
                    </article>`
    }
}

window.addEventListener('load', function () {
    fetchStatus();
    const fetchInterval = 60000;
    setInterval(fetchStatus, fetchInterval);
})