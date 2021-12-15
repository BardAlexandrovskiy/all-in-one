import "./styles.scss";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import { addNewTask, changeAddTaskInputValue } from "../../actions/toDo";
import React from "react";
import {
  filterActive,
  filterCompleted,
  filterAll,
} from "../../constants/tasks";
import TasksFilterButton from "../TasksFilterButton";

class TasksFooter extends React.Component {
  handleChangeInput = (e) => {
    const { changeAddTaskInputValue } = this.props;
    changeAddTaskInputValue(e.target.value);
  };

  handlePressInput = (e) => {
    const { addTaskInputValue, changeAddTaskInputValue } = this.props;

    if (e.key === "Enter" && addTaskInputValue.trim()) {
      const { addNewTask } = this.props;
      addNewTask(addTaskInputValue);
      changeAddTaskInputValue("");
    }
  };

  handleClickButton = () => {
    const { changeAddTaskInputValue, addTaskInputValue } = this.props;
    if (addTaskInputValue.trim()) {
      const { addNewTask } = this.props;
      addNewTask(addTaskInputValue);
      changeAddTaskInputValue("");
    }
  };

  render() {
    const { addTaskInputValue, tasksList } = this.props;
    return (
      <footer className="tasks-footer">
        {!!tasksList.length && (
          <div className="filters">
            <div className="filters-container container">
              <TasksFilterButton
                name={filterAll.name}
                title={filterAll.title}
              />
              <TasksFilterButton
                name={filterActive.name}
                title={filterActive.title}
              />
              <TasksFilterButton
                name={filterCompleted.name}
                title={filterCompleted.title}
              />
            </div>
          </div>
        )}
        <div className="add-task-input">
          <div className="container input-container">
            <div className="input-wrapper">
              <input
                onKeyPress={this.handlePressInput}
                onChange={this.handleChangeInput}
                value={addTaskInputValue}
                type="text"
                placeholder="Добавить задачу"
              />
              {addTaskInputValue && (
                <button onClick={this.handleClickButton} className="button">
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              )}
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

const mapStateToProps = (store) => {
  const {
    toDo: { list, searchTasksInputValue, addTaskInputValue },
  } = store;

  return {
    tasksList: list,
    searchTasksInputValue: searchTasksInputValue,
    addTaskInputValue: addTaskInputValue,
  };
};

const mapDispatchToProps = {
  addNewTask: (value) => addNewTask(value),
  changeAddTaskInputValue: (value) => changeAddTaskInputValue(value),
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksFooter);
