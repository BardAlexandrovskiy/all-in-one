import {
  ADD_NEW_TASK,
  CHANGE_TASK_FILTER,
  DELETE_TASK,
  CHANGE_SEARCH_TASKS_INPUT_VALUE,
  TOGGLE_TASK,
  CHANGE_ADD_TASK_INPUT_VALUE,
  CHECK_ALL_TASKS,
  DELETE_COMPLETED_TASKS,
  EDIT_TASK,
  SET_ADD_TASK_INPUT_FOCUS,
} from "../actions/tasks";
import { filterAll } from "../constants/tasks";

let localInitialState = JSON.parse(localStorage.getItem("all-in-one"));

if (localInitialState) {
  localInitialState = localInitialState.tasks;
  localInitialState.addTaskInputFocus = false;
} else localInitialState = null;

const defaultState = {
  list: [],
  filter: filterAll.name,
  searchTasksInputValue: "",
  addTaskInputValue: "",
  addTaskInputFocus: false,
};

const initialState = localInitialState || defaultState;

export function tasksReducer(state = initialState, action) {
  const { type, payload } = action;
  const { list } = state;

  switch (type) {
    case ADD_NEW_TASK:
      return {
        ...state,
        list: list.concat({
          value: payload.value,
          check: false,
          id: Date.now(),
        }),
      };
    case TOGGLE_TASK:
      return {
        ...state,
        list: list.map((item) => {
          if (item.id === payload.id) {
            return { ...item, check: !item.check };
          } else return item;
        }),
      };
    case DELETE_TASK:
      return { ...state, list: list.filter(({ id }) => id !== payload.id) };
    case CHANGE_TASK_FILTER:
      return { ...state, filter: payload.filter };
    case CHANGE_SEARCH_TASKS_INPUT_VALUE:
      return { ...state, searchTasksInputValue: payload.value };
    case CHANGE_ADD_TASK_INPUT_VALUE:
      return { ...state, addTaskInputValue: payload.value };
    case CHECK_ALL_TASKS:
      let check = false;
      list.forEach((el) => {
        if (!el.check) {
          check = true;
        }
      });
      return {
        ...state,
        list: list.map((el) => {
          return { ...el, check: check };
        }),
      };
    case DELETE_COMPLETED_TASKS:
      return {
        ...state,
        list: list.filter(({ check }) => !check),
      };
    case EDIT_TASK:
      return {
        ...state,
        list: list.map((task) => {
          const { id, value } = payload;
          if (task.id === id) {
            task.value = value;
          }
          return task;
        }),
      };
    case SET_ADD_TASK_INPUT_FOCUS:
      if (
        navigator.userAgent.match(
          /Android/i |
            /webOS/i |
            /iPhone/i |
            /iPad/i |
            /iPod/i |
            /BlackBerry/i |
            /Windows Phone/i
        )
      ) {
        return { ...state, addTaskInputFocus: payload.bool };
      } else {
        return state;
      }
    default:
      return state;
  }
}
