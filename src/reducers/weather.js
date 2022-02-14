import {
  ADD_NEW_LOCATION,
  CHANGE_WEATHER_HEADER,
  SET_CURRENT_LOCATION,
  SHOW_WEATHER_SETTINGS,
} from "../actions/weather";

let localInitialState = JSON.parse(localStorage.getItem("all-in-one"));

if (localInitialState) {
  localInitialState = localInitialState.weather;
} else localInitialState = null;

const initialState = localInitialState || {
  currentLocation: {
    city: "",
    isSearchError: false,
    weatherInfo: {},
    updateWeatherTime: null,
    id: null,
  },
  locations: [],
  isActiveHeader: false,
  isShowSettings: false,
};

export function weatherReducer(state = initialState, action) {
  const { type, payload } = action;
  const { currentLocation, locations } = state;

  switch (type) {
    case SET_CURRENT_LOCATION:
      if (payload) {
        return {
          ...state,
          currentLocation: Object.assign(currentLocation, payload),
        };
      } else
        return {
          ...state,
          currentLocation: {
            city: "",
            isSearchError: false,
            weatherInfo: {},
            updateWeatherTime: null,
            id: null,
          },
        };
    case CHANGE_WEATHER_HEADER:
      return { ...state, isActiveHeader: payload.bool };
    case SHOW_WEATHER_SETTINGS:
      return { ...state, isShowSettings: payload.bool };
    case ADD_NEW_LOCATION:
      let isUnique = true;
      const {
        location: { city: newCity },
      } = payload;

      if (newCity === currentLocation.city) {
        isUnique = false;
      } else {
        locations.forEach((el) => {
          if (el.city === newCity) {
            isUnique = false;
          }
        });
      }

      if (isUnique) {
        return {
          ...state,
          locations: locations.concat(payload.location),
        };
      } else return state;
    default:
      return state;
  }
}
