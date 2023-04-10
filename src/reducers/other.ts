import { SET_LAST_LOCATION_URL } from "../actions/other";

enum ACTIONS {
  SET_LAST_LOCATION_URL = "SET_LAST_LOCATION_URL",
}

type Action = {
  type: ACTIONS.SET_LAST_LOCATION_URL;
  payload: { location: string };
};

type OtherState = {
  lastLocation: string;
};

// initialState
const localStorageState = localStorage.getItem("all-in-one");
let localInitialState = localStorageState
  ? JSON.parse(localStorageState)
  : null;

const defaultState: OtherState = {
  lastLocation: "/",
};

const initialState = localInitialState?.other || defaultState;

export function otherReducer(state: OtherState = initialState, action: Action) {
  const { type, payload } = action;

  switch (type) {
    case SET_LAST_LOCATION_URL:
      return {
        ...state,
        lastLocation: payload.location,
      };
    default:
      return state;
  }
}
