import { faBackspace, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import { CSSTransition } from "react-transition-group";
import "./styles.scss";
import {
  changeSearchTasksInputValue,
  checkAllTasks,
  deleteCompletedTasks,
} from "../../../actions/tasks";

const TasksHeader = (props) => {
  const handleChangeInput = (e) => {
    const { changeSearchTasksInputValue } = props;
    const value = e.target.value.replace(/\s+/g, " ").trimLeft();
    if (value.length <= 140) {
      changeSearchTasksInputValue(value);
    }
  };

  const handleClickClearButton = () => {
    const { changeSearchTasksInputValue } = props;
    changeSearchTasksInputValue("");
  };

  const {
    tasksList,
    searchTasksInputValue,
    checkAllTasks,
    deleteCompletedTasks,
  } = props;

  let check = false;
  let counter = 0;

  tasksList.forEach((el) => {
    if (el.check) {
      check = true;
    } else counter += 1;
  });

  return (
    <header className="tasks-header">
      <div className="search">
        <div className="container search-container">
          <div className="input-wrapper">
            <CSSTransition
              in={!!searchTasksInputValue}
              timeout={300}
              unmountOnExit
              mountOnEnter
            >
              <div onClick={handleClickClearButton} className="clear-input">
                <FontAwesomeIcon icon={faBackspace} />
              </div>
            </CSSTransition>
            <input
              onChange={handleChangeInput}
              type="text"
              placeholder="Search"
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
            <div className="counter">
              Active: {counter}/{tasksList.length}
            </div>
          </div>
          <div className="column right-column">
            <CSSTransition
              in={!!check}
              timeout={300}
              unmountOnExit
              mountOnEnter
            >
              <div
                onClick={deleteCompletedTasks}
                className="button delete-completed-button"
              >
                Delete completed
              </div>
            </CSSTransition>
          </div>
        </div>
      </div>
    </header>
  );
};

const mapStateToProps = (store) => {
  const {
    tasks: { list, searchTasksInputValue },
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
