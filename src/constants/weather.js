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
        main: { temp },
        clouds: { all },
      } = weatherObject;

      return {
        temp: Math.round(temp),
        cloudiness: all,
      };
    });
};
