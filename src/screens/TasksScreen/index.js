import TasksHeader from "../../components/TasksHeader";
import TasksMain from "../../components/TasksMain";
import TasksFooter from "../../components/TasksFooter";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { connect } from "react-redux";
import "./styles.scss";
import TasksWelcomeBanner from "../../components/TasksWelcomeBanner";
import React from "react";
import {
  changeAddTaskInputValue,
  changeSearchTasksInputValue,
  changeTaskFilter,
} from "../../actions/tasks";
import { filterAll } from "../../constants/tasks";

class TasksScreen extends React.Component {
  componentDidUpdate(prevProps) {
    const {
      tasksList: currentTasksList,
      changeAddTaskInputValue,
      changeTaskFilter,
      changeSearchTasksInputValue,
    } = this.props;

    const { tasksList: prevTasksList } = prevProps;

    if (!currentTasksList.length && prevTasksList.length) {
      changeAddTaskInputValue("");
      changeTaskFilter(filterAll.name);
      changeSearchTasksInputValue("");
    }
  }

  render() {
    const { tasksList } = this.props;
    return (
      <div className="screen tasks-screen">
        <SwitchTransition mode="out-in">
          <CSSTransition timeout={300} key={!tasksList.length}>
            {!tasksList.length ? (
              <TasksWelcomeBanner />
            ) : (
              <div className="header-and-tasks-wrapper">
                <TasksHeader />
                <TasksMain />
              </div>
            )}
          </CSSTransition>
        </SwitchTransition>
        <TasksFooter />
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  const {
    tasks: { list },
  } = store;

  return {
    tasksList: list,
  };
};

const mapDispatchToProps = {
  changeAddTaskInputValue: (value) => changeAddTaskInputValue(value),
  changeTaskFilter: (filter) => changeTaskFilter(filter),
  changeSearchTasksInputValue: (value) => changeSearchTasksInputValue(value),
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksScreen);
