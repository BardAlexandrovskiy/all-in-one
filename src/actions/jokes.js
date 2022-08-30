// Types
export const CHANGE_CATEGORY_TYPE = "CHANGE_CATEGORY_TYPE";
export const CHANGE_CATEGORIES = "CHANGE_CATEGORIES";
export const CHANGE_BLACKLIST = "CHANGE_BLACKLIST";
export const CHANGE_JOKE_TYPE = "CHANGE_JOKE_TYPE";
export const CHANGE_SEARCH_VALUE = "CHANGE_SEARCH_VALUE";
export const CHANGE_AMOUNT_VALUE = "CHANGE_AMOUNT_VALUE";
export const RESET_FILTERS = "RESET_FILTERS";
export const SHOW_JOKES_PRELOADER = "SHOW_JOKES_PRELOADER";
export const SET_JOKES = "SET_JOKES";
export const DELETE_JOKES = "DELETE_JOKES";

// Actions
export const changeCategoryType = (value) => {
  return {
    type: CHANGE_CATEGORY_TYPE,
    payload: { value },
  };
};

export const changeCategories = (value) => {
  return {
    type: CHANGE_CATEGORIES,
    payload: { value },
  };
};

export const changeBlackList = (value) => {
  return {
    type: CHANGE_BLACKLIST,
    payload: { value },
  };
};

export const changeJokeType = (value) => {
  return {
    type: CHANGE_JOKE_TYPE,
    payload: { value },
  };
};

export const changeSearchValue = (value) => {
  return {
    type: CHANGE_SEARCH_VALUE,
    payload: { value },
  };
};

export const changeAmountValue = (value) => {
  return {
    type: CHANGE_AMOUNT_VALUE,
    payload: { value },
  };
};

export const resetFilters = () => {
  return {
    type: RESET_FILTERS,
  };
};

export const showJokesPreloader = (bool) => {
  return {
    type: SHOW_JOKES_PRELOADER,
    payload: { bool },
  };
};

export const setJokes = (list) => {
  return {
    type: SET_JOKES,
    payload: { list },
  };
};

export const getJokes = (request) => {
  return (dispatch) => {
    dispatch(showJokesPreloader(true));

    return fetch(request)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        throw new Error(response.status);
      })
      .then((response) => {
        const { error, jokes } = response;
        if (jokes && !error) {
          dispatch(setJokes(jokes));
        } else throw new Error("Jokes not found");
      })
      .catch((error) => console.log(error))
      .finally(() => {
        dispatch(showJokesPreloader(false));
      });
  };
};
