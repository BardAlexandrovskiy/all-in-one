import { combineReducers } from "redux";
import { toDoReducer } from "./toDo";
import { weatherReducer } from "./weather";

export const rootReducer = combineReducers({
  toDo: toDoReducer,
  weather: weatherReducer,
});
