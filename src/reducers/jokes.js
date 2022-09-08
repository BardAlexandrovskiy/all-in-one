import {
  CHANGE_AMOUNT_VALUE,
  CHANGE_BLACKLIST,
  CHANGE_CATEGORIES,
  CHANGE_CATEGORY_TYPE,
  CHANGE_JOKE_TYPE,
  CHANGE_SEARCH_VALUE,
  RESET_FILTERS,
  SET_ERROR,
  SET_ERROR_TEXT,
  SET_JOKES,
  SET_JOKES_ERROR,
  SET_JOKES_ERROR_TEXT,
  SHOW_JOKES_PRELOADER,
} from "../actions/jokes";

let localInitialState = JSON.parse(localStorage.getItem("all-in-one"));

if (localInitialState) {
  localInitialState = localInitialState.jokes;
} else localInitialState = null;

const defaultState = {
  isShowJokesPreloader: false,
  categoryTypeValue: "Any",
  jokesList: [],
  isError: false,
  errorText: "",
  categoriesList: [
    { value: "Programming", isCheck: false },
    { value: "Miscellaneous", isCheck: false },
    { value: "Dark", isCheck: false },
    { value: "Pun", isCheck: false },
    { value: "Spooky", isCheck: false },
    { value: "Christmas", isCheck: false },
  ],
  isCategoriesRedBorder: false,
  blacklist: [
    { value: "nsfw", isCheck: true },
    { value: "religious", isCheck: true },
    { value: "political", isCheck: true },
    { value: "racist", isCheck: true },
    { value: "sexist", isCheck: true },
    { value: "explicit", isCheck: true },
  ],
  jokeType: [
    { value: "both", isCheck: true },
    { value: "single", isCheck: false },
    { value: "twopart", isCheck: false },
  ],
  searchValue: "",
  amountValue: 10,
};

const initialState = localInitialState || defaultState;

export function jokesReducer(state = initialState, action) {
  const { type, payload } = action;
  const { categoriesList, blacklist, jokeType } = state;

  switch (type) {
    case CHANGE_CATEGORY_TYPE:
      return { ...state, categoryTypeValue: payload.value };
    case CHANGE_CATEGORIES:
      return {
        ...state,
        categoriesList: categoriesList.map((category) => {
          if (category.value === payload.value) {
            return { ...category, isCheck: !category.isCheck };
          } else return category;
        }),
      };
    case CHANGE_BLACKLIST:
      return {
        ...state,
        blacklist: blacklist.map((item) => {
          if (item.value === payload.value) {
            return { ...item, isCheck: !item.isCheck };
          } else return item;
        }),
      };
    case CHANGE_JOKE_TYPE:
      return {
        ...state,
        jokeType: jokeType.map((item) => {
          if (item.value === payload.value) {
            return { ...item, isCheck: true };
          } else return { ...item, isCheck: false };
        }),
      };
    case CHANGE_SEARCH_VALUE:
      return { ...state, searchValue: payload.value };
    case CHANGE_AMOUNT_VALUE:
      return { ...state, amountValue: payload.value };
    case RESET_FILTERS:
      return defaultState;
    case SHOW_JOKES_PRELOADER:
      return { ...state, isShowJokesPreloader: payload.bool };
    case SET_JOKES:
      return { ...state, jokesList: payload.list };
    case SET_JOKES_ERROR:
      return { ...state, isError: payload.bool };
    case SET_JOKES_ERROR_TEXT:
      return { ...state, errorText: payload.text };
    default:
      return state;
  }
}
