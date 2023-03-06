import "./styles.scss";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect, ConnectedProps } from "react-redux";
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
import { RootState } from "../../../reducers";

type State = {
  redInputBorder: boolean;
};

class TasksFooter extends React.PureComponent<Props, State> {
  private inputRef: React.RefObject<HTMLInputElement>;
  private isButtonMouseDown: boolean;

  constructor(props: Props) {
    super(props);
    this.state = {
      redInputBorder: false,
    };
    this.inputRef = React.createRef();
    this.isButtonMouseDown = false;
  }

  handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { changeAddTaskInputValue } = this.props;
    const value = e.target.value.replace(/\s+/g, " ").trimLeft();

    if (value.length <= 140) {
      changeAddTaskInputValue(value);
    }
  };

  addTask = () => {
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
    if (this.inputRef.current) {
      this.inputRef.current.focus();
    }
  };

  handlePressInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      this.addTask();
    }
  };

  handleClickButton = () => {
    this.addTask();
  };

  handleBlurInput = () => {
    if (!this.isButtonMouseDown) {
      setTimeout(() => {
        const { setAddTaskInputFocus } = this.props;
        this.setState({ redInputBorder: false });
        setAddTaskInputFocus(false);
      });
    } else {
      this.isButtonMouseDown = false;
    }
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
                tabIndex={-1}
              />
              <CSSTransition
                in={!!addTaskInputValue}
                timeout={300}
                unmountOnExit
                mountOnEnter
              >
                <button
                  onMouseDown={() => (this.isButtonMouseDown = true)}
                  onClick={this.handleClickButton}
                  className="button add-button"
                >
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

const mapStateToProps = (store: RootState) => {
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
  addNewTask: (value: string) => addNewTask(value),
  changeAddTaskInputValue: (value: string) => changeAddTaskInputValue(value),
  setAddTaskInputFocus: (bool: boolean) => setAddTaskInputFocus(bool),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export default connector(TasksFooter);
