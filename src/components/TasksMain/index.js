import React from "react";
import { connect } from "react-redux";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { filterActive, filterCompleted } from "../../constants/tasks";
import TasksItem from "../TasksItem";
import "./styles.scss";

class TasksMain extends React.Component {
  constructor(props) {
    super(props);
    this.tasksMainRef = React.createRef();
  }

  componentDidUpdate = (prevProps) => {
    const {
      tasksList: prevTasksList,
      filter: prevFilter,
      searchInputValue: prevSearchValue,
    } = prevProps;
    const {
      tasksList: currentTasksList,
      filter: currentFilter,
      searchInputValue: currentSearchValue,
    } = this.props;

    if (
      prevTasksList.length < currentTasksList.length ||
      prevFilter !== currentFilter ||
      prevSearchValue !== currentSearchValue
    ) {
      this.tasksMainRef.current.scrollTo(0, 0);
    }
  };

  render() {
    const { tasksList, filter, searchInputValue, isAddNewTaskInputInFocus } =
      this.props;
    return (
      <main
        className={`tasks-main${
          isAddNewTaskInputInFocus ? " add-tasks-input-active" : ""
        }`}
        ref={this.tasksMainRef}
      >
        <div className="tasks-list">
          <div className="container">
            <ul>
              <TransitionGroup component={null}>
                {tasksList
                  .filter((task) => {
                    switch (filter) {
                      case filterActive.name:
                        return !task.check;
                      case filterCompleted.name:
                        return task.check;
                      default:
                        return task;
                    }
                  })
                  .filter((task) => {
                    if (searchInputValue) {
                      const matchValue = searchInputValue.toLowerCase();
                      if (task.value.toLowerCase().includes(matchValue))
                        return true;
                      return false;
                    } else {
                      return task;
                    }
                  })
                  .reverse()
                  .map((task) => {
                    const { check, value, id } = task;
                    return (
                      <CSSTransition key={id} timeout={300}>
                        <TasksItem check={check} value={value} id={id} />
                      </CSSTransition>
                    );
                  })}
              </TransitionGroup>
            </ul>
          </div>
        </div>
      </main>
    );
  }
}

const mapStateToProps = (store) => {
  const {
    tasks: { list, filter, searchTasksInputValue, isAddNewTaskInputInFocus },
  } = store;

  return {
    tasksList: list,
    filter: filter,
    searchInputValue: searchTasksInputValue,
    isAddNewTaskInputInFocus: isAddNewTaskInputInFocus,
  };
};

export default connect(mapStateToProps)(TasksMain);
