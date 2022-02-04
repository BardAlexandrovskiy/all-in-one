// Weather request function
export const getWeatherFunction = (cityName, lat, long) => {
  let request;

  if (cityName) {
    request = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=12c7488f70bcd015f75b9a10d559d91f&units=metric`;
  } else if (lat && long) {
    request = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=12c7488f70bcd015f75b9a10d559d91f&units=metric`;
  }
  return fetch(request)
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
        weatherInfo: {
          weatherDescription: weatherDescription
            ? weatherDescription.charAt(0).toUpperCase() +
              weatherDescription.slice(1)
            : null,
          weatherIcon: weatherIcon
            ? `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`
            : null,
          temp: temp ? `${Math.round(temp)}°C` : null,
          tempFeelsLike: tempFeelsLike
            ? `${Math.round(tempFeelsLike)}°C`
            : null,
          humidity: humidity ? `${humidity}%` : null,
          windSpeed: windSpeed ? `${windSpeed} m/s` : null,
          windDeg: windDeg ? `${windDeg} deg` : null,
          cloudiness: cloudiness ? `${cloudiness}%` : null,
          sunrise: sunrise ? ConvertUnixDateToTime(sunrise) : null,
          sunset: sunset ? ConvertUnixDateToTime(sunset) : null,
        },
        cityName: cityName ? cityName : null,
      };
    });
};

// Convert unix date to time function
function ConvertUnixDateToTime(date) {
  const dateObject = new Date(date * 1000);
  const time = `${dateObject.getHours()}:${dateObject.getMinutes()}:${dateObject.getSeconds()}`;
  return time;
}
