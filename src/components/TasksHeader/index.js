import { faBackspace, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";

import React from "react";
import "./styles.scss";
import {
  changeSearchTasksInputValue,
  checkAllTasks,
  deleteCompletedTasks,
} from "../../actions/toDo";

class TasksHeader extends React.Component {
  handleChangeInput = (e) => {
    const { changeSearchTasksInputValue } = this.props;
    changeSearchTasksInputValue(e.target.value);
  };

  handleClickClearButton = () => {
    const { changeSearchTasksInputValue } = this.props;
    changeSearchTasksInputValue("");
  };

  render() {
    const {
      tasksList,
      searchTasksInputValue,
      checkAllTasks,
      deleteCompletedTasks,
    } = this.props;

    let check = false;
    let counter = 0;

    tasksList.forEach((el) => {
      if (el.check) {
        check = true;
      } else counter += 1;
    });

    return (
      <header className={`tasks-header${tasksList.length ? " show" : ""}`}>
        <div className="search">
          <div className="container search-container">
            <div className="input-wrapper">
              <div
                onClick={this.handleClickClearButton}
                className={`clear-input${searchTasksInputValue ? " show" : ""}`}
              >
                <FontAwesomeIcon icon={faBackspace} />
              </div>
              <input
                onChange={this.handleChangeInput}
                type="text"
                placeholder="Поиск"
                value={searchTasksInputValue}
              />
            </div>
          </div>
        </div>
        <div className="bottom-side">
          <div className="container bottom-container">
            <div className="column left-column">
              <div
                onClick={checkAllTasks}
                className={`button check-all-button${
                  tasksList.length && !counter ? " green" : ""
                }`}
              >
                <FontAwesomeIcon icon={faChevronDown} />
              </div>
              <div className="counter">Активные: {counter}</div>
            </div>
            <div className="column right-column">
              {check && (
                <div
                  onClick={deleteCompletedTasks}
                  className="button delete-completed-button"
                >
                  Удалить выполненные
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (store) => {
  const {
    toDo: { list, searchTasksInputValue },
  } = store;

  return {
    tasksList: list,
    searchTasksInputValue: searchTasksInputValue,
  };
};

const mapDispatchToProps = {
  changeSearchTasksInputValue: (value) => changeSearchTasksInputValue(value),
  checkAllTasks: () => checkAllTasks(),
  deleteCompletedTasks: () => deleteCompletedTasks(),
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksHeader);
