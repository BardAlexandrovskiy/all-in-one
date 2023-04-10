export const SET_LAST_LOCATION_URL = "SET_LAST_LOCATION_URL";

export const setLastLocationUrl = (location: string) => {
  return {
    type: SET_LAST_LOCATION_URL,
    payload: { location },
  };
};
