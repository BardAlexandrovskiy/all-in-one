import { SET_CURRENT_LOCATION } from "../actions/weather";

let localInitialState = JSON.parse(localStorage.getItem("all-in-one"));

if (localInitialState) {
  localInitialState = localInitialState.weather;
} else localInitialState = null;

const initialState = localInitialState || {
  currentLocation: { city: "" },
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
    default:
      return state;
  }
}
