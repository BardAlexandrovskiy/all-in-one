import { SET_LOCATION_BY_IP } from "../actions/weather";

let localInitialState = JSON.parse(localStorage.getItem("all-in-one"));

if (localInitialState) {
  localInitialState = localInitialState.weather;
} else localInitialState = null;

const initialState = localInitialState || {
  locationByIp: { city: "" },
};

export function weatherReducer(state = initialState, action) {
  const { type, payload } = action;
  const { locationByIp } = state;

  switch (type) {
    case SET_LOCATION_BY_IP:
      return { ...state, locationByIp: Object.assign(locationByIp, payload) };
    default:
      return state;
  }
}
