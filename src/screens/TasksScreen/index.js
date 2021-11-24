import TasksHeader from "../../components/TasksHeader";
import TasksMain from "../../components/TasksMain";
import TasksFooter from "../../components/TasksFooter";
import "./styles.scss";

const TasksScreen = () => {
  return (
    <div className="screen tasks-screen">
      <TasksHeader />
      <TasksMain />
      <TasksFooter />
    </div>
  );
};

export default TasksScreen;
