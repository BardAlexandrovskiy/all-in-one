import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { filterActive, filterCompleted } from "../../../constants/tasks";
import { RootState } from "../../../reducers";
import TasksItem from "../TasksItem";
import "./styles.scss";

class TasksMain extends React.PureComponent<Props> {
  private setTasksMainRef: (ref: HTMLDivElement | null) => void;
  private tasksMainRef: HTMLDivElement | null;
  private tasksContainerRef: React.RefObject<HTMLDivElement>;
  private resizeObserver: ResizeObserver | null;

  constructor(props: Props) {
    super(props);
    this.tasksMainRef = null;
    this.tasksContainerRef = React.createRef();
    this.resizeObserver = null;
    this.setTasksMainRef = (ref) => {
      if (ref && !this.tasksMainRef) {
        const tasksList = ref;
        const tasksListContainer = this.tasksContainerRef.current;
        this.resizeObserver = new ResizeObserver(() => {
          if (tasksList && tasksListContainer) {
            tasksListContainer.removeAttribute("style");
            if (tasksList.offsetWidth > tasksList.scrollWidth) {
              const currentContainerStyles =
                getComputedStyle(tasksListContainer);
              const offset = tasksList.offsetWidth - tasksList.scrollWidth;
              const newMaxWidth =
                +currentContainerStyles.maxWidth.replace("px", "") - offset;
              const newPaddingRight =
                +currentContainerStyles.paddingRight.replace("px", "") - offset;
              tasksListContainer.style.maxWidth = newMaxWidth + "px";
              tasksListContainer.style.paddingRight = newPaddingRight + "px";
            }
          }
        });

        this.resizeObserver.observe(tasksList);
      }

      this.tasksMainRef = ref;
    };
  }

  componentDidUpdate = (prevProps: Props) => {
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
      (prevTasksList.length < currentTasksList.length ||
        prevFilter !== currentFilter ||
        prevSearchValue !== currentSearchValue) &&
      this.tasksMainRef
    ) {
      this.tasksMainRef.scrollTo(0, 0);
    }
  };

  componentWillUnmount = () => {
    if (this.resizeObserver && this.tasksMainRef) {
      this.resizeObserver.unobserve(this.tasksMainRef);
    }
  };

  render() {
    const { tasksList, filter, searchInputValue, addTaskInputFocus } =
      this.props;

    return (
      <main
        className={`tasks-main${
          addTaskInputFocus ? " add-tasks-input-active" : ""
        }`}
        ref={this.setTasksMainRef}
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
                      const matchValue = searchInputValue.toLowerCase().trim();
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
                      <CSSTransition
                        appear
                        key={id}
                        timeout={{ enter: 300, exit: 300, appear: 0 }}
                      >
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

const mapStateToProps = (store: RootState) => {
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

const connector = connect(mapStateToProps);

type Props = ConnectedProps<typeof connector>;

export default connector(TasksMain);
