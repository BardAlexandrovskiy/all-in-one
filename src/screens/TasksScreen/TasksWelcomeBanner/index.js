import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import "./styles.scss";

const TasksWelcomeBanner = ({ addTaskInputFocus }) => {
  return (
    <div
      className={`tasks-welcome-banner${
        addTaskInputFocus ? " add-task-input-active" : ""
      }`}
    >
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

const mapStateToProps = (store) => {
  const {
    tasks: { addTaskInputFocus },
  } = store;

  return {
    addTaskInputFocus: addTaskInputFocus,
  };
};

export default connect(mapStateToProps)(TasksWelcomeBanner);
