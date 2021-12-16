import React from "react";
import { connect } from "react-redux";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { filterActive, filterCompleted } from "../../constants/tasks";
import TasksItem from "../TasksItem";
import "./styles.scss";

class TasksMain extends React.Component {
  render() {
    const { tasksList, filter, searchInputValue } = this.props;

    return (
      <main className="tasks-main">
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
  return {
    tasksList: store.toDo.list,
    filter: store.toDo.filter,
    searchInputValue: store.toDo.searchTasksInputValue,
  };
};

export default connect(mapStateToProps)(TasksMain);
