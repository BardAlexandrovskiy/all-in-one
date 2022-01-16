// Types
export const ADD_NEW_TASK = "ADD_NEW_TASK";
export const TOGGLE_TASK = "TOGGLE_TASK";
export const DELETE_TASK = "DELETE_TASK";
export const CHANGE_TASK_FILTER = "CHANGE_TASK_FILTER";
export const CHANGE_SEARCH_TASKS_INPUT_VALUE =
  "CHANGE_SEARCH_TASKS_INPUT_VALUE";
export const CHANGE_ADD_TASK_INPUT_VALUE = "CHANGE_ADD_TASK_INPUT_VALUE";
export const CHECK_ALL_TASKS = "CHECK_ALL_TASKS";
export const DELETE_COMPLETED_TASKS = "DELETE_COMPLETED_TASKS";
export const EDIT_TASK = "EDIT_TASK";

// Actions
export const addNewTask = (value) => {
  return {
    type: ADD_NEW_TASK,
    payload: { value },
  };
};

export const changeAddTaskInputValue = (value) => {
  return {
    type: CHANGE_ADD_TASK_INPUT_VALUE,
    payload: { value },
  };
};

export const toggleTask = (id) => {
  return {
    type: TOGGLE_TASK,
    payload: { id },
  };
};

export const deleteTask = (id) => {
  return {
    type: DELETE_TASK,
    payload: { id },
  };
};

export const changeTaskFilter = (filter) => {
  return {
    type: CHANGE_TASK_FILTER,
    payload: { filter },
  };
};

export const changeSearchTasksInputValue = (value) => {
  return {
    type: CHANGE_SEARCH_TASKS_INPUT_VALUE,
    payload: { value },
  };
};

export const checkAllTasks = () => {
  return {
    type: CHECK_ALL_TASKS,
  };
};

export const deleteCompletedTasks = () => {
  return {
    type: DELETE_COMPLETED_TASKS,
  };
};

export const editTask = (data) => {
  return {
    type: EDIT_TASK,
    payload: data,
  };
};

export const getLocationByIp = () => {
  return () => {
    fetch("https://api.ipify.org?format=json")
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        throw new Error(response.status);
      })
      .then((objectIp) => objectIp.ip)
      .then((id) => {
        fetch(`https://api.sypexgeo.net/json/${id}`)
          .then((response) => {
            if (response.status === 200) {
              return response.json();
            }
            throw new Error(response.status);
          })
          .then((location) => console.log(location.city));
      });
  };
};
