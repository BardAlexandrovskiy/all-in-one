import "./styles.scss";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import { addNewTask, changeAddTaskInputValue } from "../../actions/toDo";
import React from "react";

class TasksFooter extends React.Component {
  handleChangeInput = (e) => {
    const { changeAddTaskInputValue } = this.props;
    changeAddTaskInputValue(e.target.value);
  };

  handlePressInput = (e) => {
    const { addTaskInputValue, changeAddTaskInputValue } = this.props;

    if (e.key === "Enter" && addTaskInputValue.trim()) {
      const { addNewTask } = this.props;
      addNewTask(addTaskInputValue);
      changeAddTaskInputValue("");
    }
  };

  handleClickButton = () => {
    const { changeAddTaskInputValue, addTaskInputValue } = this.props;
    if (addTaskInputValue.trim()) {
      const { addNewTask } = this.props;
      addNewTask(addTaskInputValue);
      changeAddTaskInputValue("");
    }
  };

  render() {
    const { addTaskInputValue } = this.props;
    return (
      <footer className="tasks-footer">
        <div className="container">
          <div className="input-wrapper">
            <input
              onKeyPress={this.handlePressInput}
              onChange={this.handleChangeInput}
              value={addTaskInputValue}
              type="text"
              placeholder="Добавить задачу"
            />
            {addTaskInputValue && (
              <button onClick={this.handleClickButton} className="button">
                <FontAwesomeIcon icon={faPlus} />
              </button>
            )}
          </div>
        </div>
      </footer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    addTaskInputValue: state.toDo.addTaskInputValue,
  };
};

const mapDispatchToProps = {
  addNewTask: (value) => addNewTask(value),
  changeAddTaskInputValue: (value) => changeAddTaskInputValue(value),
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksFooter);
