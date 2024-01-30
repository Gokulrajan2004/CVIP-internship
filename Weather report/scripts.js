const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const cityHide = document.querySelector('.city-hide');


search.addEventListener('click', () => {
    const APIKey = '8be23ea23dc7410941b44d6aa08931e8';
    const city = document.querySelector('.search-box input').value;

    if (city === '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json()).then(json => {

            if(json.cod == '404'){
                container.style.height ='400px';
                weatherBox.classList.remove('active');
                weatherDetails.classList.remove('active');
                error404.classList.add('active');
                return;
            }

             

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            // Update your handling of the response data here
            // Example (make sure to adapt it to the actual response structure and your HTML):
            temperature.innerHTML= `${parseInt(json.main.temp)}<span>℃</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)} km/h`;

            


            if(cityHide.textContent == city){
                return;
            }
            else{
                cityHide.textContent =city;

                container.style.height ='555px';
                container.classList.add('active');
                weatherBox.classList.add('active');
                weatherDetails.classList.add('active');
                error404.classList.remove('active');

                setTimeout(() => {
                    container.classList.remove('active');
                },2500);

                switch (json.weather[0].main) {
                    case 'Clear':
                        image.src = 'images/clear.png';
                        break;
                    case 'Rain':
                        image.src = 'images/rain.png';
                        break;
                    case 'Mist':
                        image.src = 'images/mist.png';
                        break;
                    case 'Clouds':
                        image.src = 'images/cloud.png';
                        break;
                    case 'Snow':
                        image.src = 'images/snow.png';
                        break;
                    case 'Haze':
                        image.src = 'images/mist.png';
                        break;
                    default:
                        image.src = 'images/cloud.png';
                }

                const infoWeather = document.querySelector('.info-weather');
                const infoHumidity = document.querySelector('.info-humidity');
                const infoWind = document.querySelector('.info-wind');

                const elCloneInfoWeather =infoWeather.cloneNode(true);
                const elCloneInfoHumidity =infoHumidity.cloneNode(true);
                const elCloneInfoWind =infoWind.cloneNode(true);

                elCloneInfoWeather.id='clone-info-weather';
                elCloneInfoWeather.classList.add('active-clone');

                elCloneInfoHumidity.id='clone-info-humidity';
                elCloneInfoHumidity.classList.add('active-clone');

                elCloneInfoWind.id='clone-info-wind';
                elCloneInfoWind.classList.add('active-clone');

                setTimeout(() => {
                    infoWeather.insertAdjacentElement("afterend",elCloneInfoWeather);
                    infoHumidity.insertAdjacentElement("afterend",elCloneInfoHumidity);
                    infoWind.insertAdjacentElement("afterend",elCloneInfoWind);

                },2200);

                const CloneInfoWeather =document.querySelectorAll('.info-weather.active-clone');
                const totalCloneInfoWeather = CloneInfoWeather.length;
                const CloneInfoWeatherFirst = CloneInfoWeather[0];

                const CloneInfoHumidity = document.querySelectorAll('.info-humidity.active-clone');
                const CloneInfoHumidityFirst = CloneInfoHumidity[0];

                const CloneInfoWind = document.querySelectorAll('.info-wind.active-clone');
                const CloneInfoWindFirst = CloneInfoWind[0];

                if(totalCloneInfoWeather > 0){
                    CloneInfoWeatherFirst.classList.remove('active-clone');
                    CloneInfoHumidityFirst.classList.remove('active-clone');
                    CloneInfoWindFirst.classList.remove('active-clone');

                    setTimeout(() =>{
                        CloneInfoWeatherFirst.remove();
                        CloneInfoHumidityFirst.remove();
                        CloneInfoWindFirst.remove();

                    },2200);
                }

            }

        })
});
