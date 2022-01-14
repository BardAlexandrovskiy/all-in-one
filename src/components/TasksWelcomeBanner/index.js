import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./styles.scss";

const TasksWelcomeBanner = () => {
  return (
    <div className="tasks-welcome-banner">
      <div className="container">
        <div className="text">
          Здесь будут ваши задачи. Добавить свою первую задачу вы можете в поле
          ввода внизу экрана.
        </div>
        <FontAwesomeIcon icon={faAngleDown} />
      </div>
    </div>
  );
};

export default TasksWelcomeBanner;
