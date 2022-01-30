// Weather request function
export const getWeatherFunction = (cityName) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=12c7488f70bcd015f75b9a10d559d91f&units=metric`
  )
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      throw new Error(response.status);
    })
    .then((weatherObject) => {
      const {
        weather: [{ description: weatherDescription, icon: weatherIcon }],
        main: {
          temp,
          feels_like: tempFeelsLike,
          temp_min: tempMin,
          temp_max: tempMax,
          humidity,
        },
        wind: { speed: windSpeed, deg: windDeg },
        clouds: { all: cloudiness },
        name: cityName,
      } = weatherObject;

      return {
        weatherDescription: weatherDescription
          ? weatherDescription.charAt(0).toUpperCase() +
            weatherDescription.slice(1)
          : "",
        weatherIcon: weatherIcon
          ? `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`
          : "",
        temp: temp ? `${Math.round(temp)}°C` : "",
        tempFeelsLike: tempFeelsLike ? `${Math.round(tempFeelsLike)}°C` : "",
        tempMin: tempMin ? `${Math.round(tempMin)}°C` : "",
        tempMax: tempMax ? `${Math.round(tempMax)}°C` : "",
        humidity: humidity ? `${humidity}%` : "",
        windSpeed: windSpeed ? `${windSpeed} m/s` : "",
        windDeg: windDeg ? `${windDeg} deg` : "",
        cloudiness: cloudiness ? `${cloudiness}%` : "",
        cityName: cityName ? cityName : "",
      };
    });
};
