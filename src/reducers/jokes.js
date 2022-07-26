import {
  CHANGE_AMOUNT_VALUE,
  CHANGE_BLACKLIST,
  CHANGE_CATEGORIES,
  CHANGE_CATEGORY_TYPE,
  CHANGE_JOKE_TYPE,
  CHANGE_SEARCH_VALUE,
  RESET_FILTERS,
} from "../actions/jokes";

let localInitialState = JSON.parse(localStorage.getItem("all-in-one"));

if (localInitialState) {
  localInitialState = localInitialState.jokes;
} else localInitialState = null;

const defaultState = {
  categoryTypeValue: "any",
  categoriesList: [
    { value: "Programming", isCheck: false },
    { value: "Miscellaneous", isCheck: false },
    { value: "Dark", isCheck: false },
    { value: "Pun", isCheck: false },
    { value: "Spooky", isCheck: false },
    { value: "Christmas", isCheck: false },
  ],
  blacklist: [
    { value: "nsfw", isCheck: false },
    { value: "religious", isCheck: false },
    { value: "political", isCheck: false },
    { value: "racist", isCheck: false },
    { value: "sexist", isCheck: false },
    { value: "explicit", isCheck: false },
  ],
  jokeType: [
    { value: "both", isCheck: true },
    { value: "single", isCheck: false },
    { value: "twopart", isCheck: false },
  ],
  searchValue: "",
  amountValue: 1,
};

const initialState = localInitialState || defaultState;

export function jokesReducer(state = initialState, action) {
  const { type, payload } = action;
  const { categoriesList, blacklist, jokeType } = initialState;

  switch (type) {
    case CHANGE_CATEGORY_TYPE:
      return { ...state, categoryTypeValue: payload.value };
    case CHANGE_CATEGORIES:
      return {
        ...state,
        categoriesList: categoriesList.map((category) => {
          if (category.value === payload.value) {
            console.log(category.isCheck);
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
    default:
      return state;
  }
}
