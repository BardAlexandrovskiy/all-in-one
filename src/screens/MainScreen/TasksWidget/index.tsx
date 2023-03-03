import "./styles.scss";
import TasksItem from "../../TasksScreen/TasksItem";
import { connect, ConnectedProps } from "react-redux";
import { Link } from "react-router-dom";
import {
  TransitionGroup,
  CSSTransition,
  SwitchTransition,
} from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { RootState } from "../../../reducers";

const TasksWidget = ({ tasksList }: Props) => {
  const latestActiveTasks = tasksList
    .filter((task) => {
      return !task.check;
    })
    .reverse()
    .slice(0, 5);

  return (
    <div className="tasks-widget">
      <SwitchTransition mode="out-in">
        <CSSTransition
          timeout={300}
          key={(!latestActiveTasks.length).toString()}
        >
          {!latestActiveTasks.length ? (
            <div className="no-active-tasks-banner">
              <h2>You have no active tasks</h2>
              <Link to="/tasks" className="no-active-tasks-link">
                <FontAwesomeIcon icon={faPlus} />
                <span>Add tasks</span>
              </Link>
            </div>
          ) : (
            <div className="tasks-wrapper">
              <h2>Latest active tasks</h2>
              <div className="tasks-list">
                <TransitionGroup component={null}>
                  {latestActiveTasks.map((task) => {
                    const { check, value, id } = task;
                    return (
                      <CSSTransition key={id} timeout={300}>
                        <TasksItem
                          isNoHightlight={true}
                          check={check}
                          value={value}
                          id={id}
                        />
                      </CSSTransition>
                    );
                  })}
                </TransitionGroup>
              </div>
              <Link to="/tasks" className="tasks-link">
                See all tasks
              </Link>
            </div>
          )}
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
};

const mapStateToProps = (store: RootState) => {
  const {
    tasks: { list },
  } = store;

  return {
    tasksList: list,
  };
};

const connector = connect(mapStateToProps);

type Props = ConnectedProps<typeof connector>;

export default connector(TasksWidget);
