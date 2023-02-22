import TasksHeader from "./TasksHeader";
import TasksMain from "./TasksMain";
import TasksFooter from "./TasksFooter";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { connect, ConnectedProps } from "react-redux";
import "./styles.scss";
import TasksWelcomeBanner from "./TasksWelcomeBanner";
import React from "react";
import {
  changeAddTaskInputValue,
  changeSearchTasksInputValue,
  changeTaskFilter,
} from "../../actions/tasks";
import { filterAll } from "../../constants/tasks";
import { RootState } from "../../reducers";

class TasksScreen extends React.PureComponent<Props> {
  componentDidUpdate(prevProps: Props) {
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
          {/* @ts-expect-error: Let's ignore a single compiler error like this unreachable code */}
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

const mapStateToProps = (store: RootState) => {
  const {
    tasks: { list },
  } = store;

  return {
    tasksList: list,
  };
};

const mapDispatchToProps = {
  changeAddTaskInputValue: (value: string) => changeAddTaskInputValue(value),
  changeTaskFilter: (filter: string) => changeTaskFilter(filter),
  changeSearchTasksInputValue: (value: string) =>
    changeSearchTasksInputValue(value),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export default connector(TasksScreen);
