// Types
export const SET_CURRENT_LOCATION = "SET_CURRENT_LOCATION";
export const CHANGE_WEATHER_HEADER = "CHANGE_WEATHER_HEADER";

// Actions
export const setCurrentLocation = (location) => {
  return {
    type: SET_CURRENT_LOCATION,
    payload: location,
  };
};

export const getLocationByIp = () => {
  return (dispatch) => {
    dispatch(setCurrentLocation({ isSearchError: false }));
    return fetch(`https://api.sypexgeo.net/json/`)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        throw new Error(response.status);
      })
      .then((location) => {
        const { city } = location;
        if (city) {
          dispatch(
            setCurrentLocation({
              city: city.name_en,
              isSearchError: false,
              id: Date.now(),
            })
          );
        } else throw new Error("Current location not found");
      })
      .catch(() => {
        dispatch(setCurrentLocation({ isSearchError: true }));
      });
  };
};

export const changeWeatherHeader = (bool) => {
  return {
    type: CHANGE_WEATHER_HEADER,
    payload: { bool },
  };
};
