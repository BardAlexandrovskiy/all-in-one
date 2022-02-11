import {
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
  isActiveHeader: false,
  isShowSettings: false,
};

export function weatherReducer(state = initialState, action) {
  const { type, payload } = action;
  const { currentLocation } = state;

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
    default:
      return state;
  }
}
