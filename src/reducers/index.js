import { combineReducers } from "redux";
import { toDoReducer } from "./toDo";

export const rootReducer = combineReducers({
  toDo: toDoReducer,
});
