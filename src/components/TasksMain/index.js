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
    this.tasksContainerRef = React.createRef();
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

  componentDidMount = () => {
    new ResizeObserver(() => {
      const tasksList = this.tasksMainRef.current;
      const tasksListContainer = this.tasksContainerRef.current;
      if (tasksList && tasksListContainer) {
        tasksListContainer.style = null;
        if (tasksList.offsetWidth > tasksList.scrollWidth) {
          const currentContainerStyles = getComputedStyle(tasksListContainer);
          const offset = tasksList.offsetWidth - tasksList.scrollWidth;
          const newMaxWidth =
            +currentContainerStyles.maxWidth.replace("px", "") - offset;
          const newPaddingRight =
            +currentContainerStyles.paddingRight.replace("px", "") - offset;
          tasksListContainer.style.maxWidth = newMaxWidth + "px";
          tasksListContainer.style.paddingRight = newPaddingRight + "px";
        }
      }
    }).observe(this.tasksMainRef.current);
  };

  render() {
    const { tasksList, filter, searchInputValue, addTaskInputFocus } =
      this.props;

    return (
      <main
        className={`tasks-main${
          addTaskInputFocus ? " add-tasks-input-active" : ""
        }`}
        ref={this.tasksMainRef}
      >
        <div className="tasks-list">
          <div className="container" ref={this.tasksContainerRef}>
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
    tasks: { list, filter, searchTasksInputValue, addTaskInputFocus },
  } = store;

  return {
    tasksList: list,
    filter: filter,
    searchInputValue: searchTasksInputValue,
    addTaskInputFocus: addTaskInputFocus,
  };
};

export default connect(mapStateToProps)(TasksMain);
