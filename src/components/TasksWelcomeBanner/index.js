import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./styles.scss";

const TasksWelcomeBanner = () => {
  return (
    <div className="tasks-welcome-banner">
      <div className="container">
        <div className="text">
          This is where your tasks will be. You can add your first task in the
          field below.
        </div>
        <FontAwesomeIcon icon={faAngleDown} />
      </div>
    </div>
  );
};

export default TasksWelcomeBanner;
