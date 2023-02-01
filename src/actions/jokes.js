// Types
export const CHANGE_CATEGORY_TYPE = "JOKES_CHANGE_CATEGORY_TYPE";
export const CHANGE_CATEGORIES = "JOKES_CHANGE_CATEGORIES";
export const CHANGE_BLACKLIST = "JOKES_CHANGE_BLACKLIST";
export const CHANGE_JOKE_TYPE = "JOKES_CHANGE_JOKE_TYPE";
export const CHANGE_SEARCH_VALUE = "JOKES_CHANGE_SEARCH_VALUE";
export const CHANGE_AMOUNT_VALUE = "JOKES_CHANGE_AMOUNT_VALUE";
export const RESET_FILTERS = "JOKES_RESET_FILTERS";
export const SHOW_JOKES_PRELOADER = "SHOW_JOKES_PRELOADER";
export const SET_JOKES = "SET_JOKES";
export const DELETE_JOKES = "DELETE_JOKES";
export const SET_JOKES_ERROR = "SET_JOKES_ERROR";
export const SET_JOKES_ERROR_TEXT = "SET_JOKES_ERROR_TEXT";
export const SHOW_CATEGORIES_RED_BORDER = "JOKES_SHOW_CATEGORIES_RED_BORDER";

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

export const showCategoriesRedBorder = (bool) => {
  return {
    type: SHOW_CATEGORIES_RED_BORDER,
    payload: { bool },
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

export const setError = (bool) => {
  return {
    type: SET_JOKES_ERROR,
    payload: { bool },
  };
};

export const setErrorText = (text) => {
  return {
    type: SET_JOKES_ERROR_TEXT,
    payload: { text },
  };
};

export const getJokes = (request) => {
  return async (dispatch) => {
    dispatch(showJokesPreloader(true));
    dispatch(setError(false));
    dispatch(setJokes([]));

    try {
      let response = await fetch(request);
      if (response.status === 200) {
        response = await response.json();
        const { error, jokes, joke, setup, delivery } = response;
        if ((jokes || joke || setup || delivery) && !error) {
          if (jokes) {
            dispatch(setJokes(jokes));
          } else {
            delete response.error;
            dispatch(setJokes([response]));
          }
        } else throw new Error("Jokes not found");
      } else {
        throw new Error(`Error: ${response.status}`);
      }
    } catch (error) {
      dispatch(setError(true));
      dispatch(setErrorText(error.message));
    }
    dispatch(showJokesPreloader(false));
  };
};
