// Types
export const SET_CURRENT_LOCATION = "SET_LOCATION_BY_IP";
export const SET_CURRENT_WEATHER = "SET_CURRENT_WEATHER";

// Actions
export const setCurrentLocation = (city) => {
  return {
    type: SET_CURRENT_LOCATION,
    payload: { city },
  };
};

export const getLocationByIp = () => {
  return (dispatch) => {
    fetch("https://api.ipify.org?format=json")
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        throw new Error(response.status);
      })
      .then((objectIp) => objectIp.ip)
      .then((id) => {
        fetch(`https://api.sypexgeo.net/json/${id}`)
          .then((response) => {
            if (response.status === 200) {
              return response.json();
            }
            throw new Error(response.status);
          })
          .then((location) => {
            dispatch(setCurrentLocation(location.city.name_en));
          });
      });
  };
};
