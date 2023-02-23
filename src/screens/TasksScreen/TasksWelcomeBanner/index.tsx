import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../../reducers";
import "./styles.scss";

const TasksWelcomeBanner = ({ addTaskInputFocus }: Props) => {
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

const mapStateToProps = (store: RootState) => {
  const {
    tasks: { addTaskInputFocus },
  } = store;

  return {
    addTaskInputFocus: addTaskInputFocus,
  };
};

const connector = connect(mapStateToProps);

type Props = ConnectedProps<typeof connector>;

export default connector(TasksWelcomeBanner);
