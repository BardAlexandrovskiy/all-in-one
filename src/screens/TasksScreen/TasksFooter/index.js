import "./styles.scss";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import {
  addNewTask,
  changeAddTaskInputValue,
  setAddTaskInputFocus,
} from "../../../actions/tasks";
import React from "react";
import { CSSTransition } from "react-transition-group";
import {
  filterActive,
  filterCompleted,
  filterAll,
} from "../../../constants/tasks";
import TasksFilterButton from "../TasksFilterButton";

class TasksFooter extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      redInputBorder: false,
    };
    this.inputRef = React.createRef();
  }

  handleChangeInput = (e) => {
    const { changeAddTaskInputValue } = this.props;
    const value = e.target.value.replace(/\s+/g, " ").trimLeft();

    if (value.length <= 140) {
      changeAddTaskInputValue(value);
    }
  };

  handlePressInput = (e) => {
    if (e.key === "Enter") {
      this.handleClickButton();
    }
  };

  handleClickButton = () => {
    const { changeAddTaskInputValue, addTaskInputValue } = this.props;
    const value = addTaskInputValue.trim();
    if (addTaskInputValue.length && value) {
      const { addNewTask } = this.props;
      addNewTask(value);
      changeAddTaskInputValue("");
      this.setState({ redInputBorder: false });
    } else {
      this.setState({ redInputBorder: true });
    }

    this.inputRef.current.focus();
  };

  handleBlurInput = () => {
    const { setAddTaskInputFocus } = this.props;
    setAddTaskInputFocus(false);
    this.setState({ redInputBorder: false });
  };

  handleFocusInput = () => {
    const { setAddTaskInputFocus } = this.props;
    setAddTaskInputFocus(true);
  };

  render() {
    const { addTaskInputValue, tasksList } = this.props;
    const { redInputBorder } = this.state;
    return (
      <footer className="tasks-footer">
        <CSSTransition
          in={!!tasksList.length}
          timeout={300}
          mountOnEnter
          unmountOnExit
        >
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
        </CSSTransition>
        <div className="add-task-input">
          <div className="container input-container">
            <div className={`input-wrapper${redInputBorder ? " red" : ""}`}>
              <input
                ref={this.inputRef}
                onKeyDown={this.handlePressInput}
                onBlur={this.handleBlurInput}
                onFocus={this.handleFocusInput}
                onChange={this.handleChangeInput}
                value={addTaskInputValue}
                type="text"
                placeholder="Add Task"
              />
              <CSSTransition
                in={!!addTaskInputValue}
                timeout={300}
                unmountOnExit
                mountOnEnter
              >
                <button onClick={this.handleClickButton} className="button">
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </CSSTransition>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

const mapStateToProps = (store) => {
  const {
    tasks: { list, searchTasksInputValue, addTaskInputValue },
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
  setAddTaskInputFocus: (bool) => setAddTaskInputFocus(bool),
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksFooter);
