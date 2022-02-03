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
        main: { temp, feels_like: tempFeelsLike, humidity },
        wind: { speed: windSpeed, deg: windDeg },
        clouds: { all: cloudiness },
        name: cityName,
        sys: { sunrise, sunset },
      } = weatherObject;

      return {
        weatherDescription: weatherDescription
          ? weatherDescription.charAt(0).toUpperCase() +
            weatherDescription.slice(1)
          : "",
        weatherIcon: weatherIcon
          ? `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`
          : "",
        temp: temp ? `${Math.round(temp)}°C` : null,
        tempFeelsLike: tempFeelsLike ? `${Math.round(tempFeelsLike)}°C` : null,
        humidity: humidity ? `${humidity}%` : null,
        windSpeed: windSpeed ? `${windSpeed} m/s` : null,
        windDeg: windDeg ? `${windDeg} deg` : null,
        cloudiness: cloudiness ? `${cloudiness}%` : null,
        cityName: cityName ? cityName : null,
        sunrise: sunrise ? ConvertUnixDateToTime(sunrise) : null,
        sunset: sunset ? ConvertUnixDateToTime(sunset) : null,
      };
    });
};

// Convert unix date to time function
function ConvertUnixDateToTime(date) {
  const dateObject = new Date(date * 1000);
  const time = `${dateObject.getHours()}:${dateObject.getMinutes()}:${dateObject.getSeconds()}`;
  return time;
}
