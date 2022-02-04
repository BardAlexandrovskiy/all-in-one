import {
  CHANGE_WEATHER_HEADER,
  SET_CURRENT_LOCATION,
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
};

export function weatherReducer(state = initialState, action) {
  const { type, payload } = action;
  const { currentLocation } = state;

  switch (type) {
    case SET_CURRENT_LOCATION:
      return {
        ...state,
        currentLocation: Object.assign(currentLocation, payload),
      };
    case CHANGE_WEATHER_HEADER:
      return { ...state, isActiveHeader: payload.bool };
    default:
      return state;
  }
}
