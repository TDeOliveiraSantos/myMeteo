const weatherIcons = {
    "Rain": "wi wi-day-rain",
    "Clouds": "wi wi-day-cloudy",
    "Clear": "wi wi-day-sunny",
    "Snow": "wi wi-day-snow",
    "mist": "wi wi-day-fog",
    "Drizzle": "wi wi-day-sleet",
}
const details = document.getElementById('details');

function capitalize(str){
    return str[0].toUpperCase( + str.slice(1))
}

const main = async(withIp = true) => {
    let ville;

    if(withIp){
        const ip =  await fetch(`https://api.ipify.org?format=json`)
        .then((result) => result.json())
        .then((json) =>  json.ip)

        ville = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_nE9VfM6KMsJwnChR1Bcaxl1C0RkqZ&ipAddress=${ip}`)
        .then((result) => result.json())
        .then((json) => (json.location.city))
        
    }else{
        ville = document.getElementById('ville').textContent;
    }
         
    const meteo = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=b2e697204e810cf5ba7089748c057f45&lang=fr&units=metric`)
        .then((result) => result.json())
        .then((json) => json)

    displayWeatherInfos(meteo)
}                                                                                                                                             

async function displayWeatherInfos(data) {
    
    const name = data.name;
    const temperature = Math.round(data.main.temp);
    const conditions = data.weather[0].main;
    const description = data.weather[0].description;
    const humidite = data.main.humidity;
    const vent = data.wind.speed;
    const visibilite = Math.round(data.visibility/1000);
    


    document.querySelector('#ville').textContent = name;
    document.querySelector('#temperature').textContent = Math.round(temperature);
    document.querySelector('#conditions').textContent = description;
    document.querySelector('i.wi').className = weatherIcons[conditions];
    document.querySelector('#app').className = conditions.toLowerCase();
    document.getElementById('humidite').textContent = `Humidité : ${humidite}%`
    document.getElementById('vent').textContent = `Vitesse du vent : ${vent} m/s`
    document.getElementById('visibilite').textContent = `Visibilité à : ${visibilite}km`
}

ville = document.querySelector('#ville');

ville.addEventListener('click', () => {
    ville.contentEditable = true;
})

ville.addEventListener('keydown', (e) => {
    if(e.keyCode === 13) {
        e.preventDefault();
        ville.contentEditable = false;
        main(false);
    }
})

main();