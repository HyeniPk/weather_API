const app = document.querySelector('.weather-container');
const temp = document.querySelector('.temp');
const dateOutput = document.querySelector('.date');
const timeOutput = document.querySelector('.time');
const conditionOutput = document.querySelector('.condition');
const nameOutPut = document.querySelector('.city-name');
const icon = document.querySelector('.icon');
const cloudOutput = document.querySelector('.cloud');
const humidityOutput = document.querySelector('.humidity');
const windOutput = document.querySelector('.wind');
const search= document.querySelector('.search');
const btn = document.querySelector('.submit');
const cities = document.querySelectorAll('.city');
const searchForm = document.getElementById('locationInput');

let cityInput = "Toronto";

cities.forEach(( city )=> {
    city.addEventListener('click',(e)=>{
        cityInput = e.target.innerHTML;
        fetchWeatherData();

    });

}) ;

searchForm.addEventListener('submit', (event)=>{
    if(search.value.length == 0){
        alert('Please enter the city name');
    }else{
        cityInput = search.value;
        fetchWeatherData();

        search.value= "";
    }

    event.preventDefault();

});

function dayOfTheWeek( day, month, year){
    const weekday = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    return weekday[ new Date(`${day}/${month}/${year}`).getDay()];
}


function fetchWeatherData(){
    fetch(`http://api.weatherapi.com/v1/current.json?key=17d9a155ea3b40f4b04232524230402&q=${cityInput}`)
    .then( response => response.json())
    .then( data => {
        console.log(data);

        temp.innerHTML = data.current.temp_c + "&#176;";
        conditionOutput.innerHTML = data.current.condition.text;

        //date setting
        const date = data.location.localtime;
        const y = parseInt( date.substr(0,4));
        const m = parseInt( date.substr(5,2));
        const d = parseInt( date.substr(8,2));

        const time = date.substr(11);

        dateOutput.innerHTML = `${dayOfTheWeek( d, m, y)} ${d} / ${m} / ${y}`;
        timeOutput.innerHTML = time;
        nameOutPut.innerHTML = data.location.name;

        const iconId = data.current.condition.icon.substr("//cdn.weatherapi.com/weather/64x64/".length);
        icon.src = "https://cdn.weatherapi.com/weather/64x64/" + iconId;

        cloudOutput.innerHTML = data.current.cloud + "%";
        humidityOutput.innerHTML = data.current.humidity + "%"; 
        windOutput.innerHTML = data.current.wind_kph + "km/h";

    }).catch(()=>{
        alert('city can not find');
    });
}

fetchWeatherData();