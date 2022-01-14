import TasksHeader from "../../components/TasksHeader";
import TasksMain from "../../components/TasksMain";
import TasksFooter from "../../components/TasksFooter";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { connect } from "react-redux";
import "./styles.scss";
import TasksWelcomeBanner from "../../components/TasksWelcomeBanner";

const TasksScreen = ({ tasksList }) => {
  return (
    <div className="screen tasks-screen">
      <SwitchTransition>
        <CSSTransition timeout={300} key={!tasksList.length}>
          {!tasksList.length ? (
            <TasksWelcomeBanner />
          ) : (
            <>
              <TasksHeader />
              <TasksMain />
            </>
          )}
        </CSSTransition>
      </SwitchTransition>
      <TasksFooter />
    </div>
  );
};

const mapStateToProps = (store) => {
  const {
    toDo: { list },
  } = store;

  return {
    tasksList: list,
  };
};

export default connect(mapStateToProps)(TasksScreen);
