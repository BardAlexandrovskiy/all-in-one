import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteTask, editTask, toggleTask } from "../../actions/toDo";
import { connect } from "react-redux";
import "./styles.scss";
import React from "react";

const Hightlight = ({ otherValue, hightlightValue }) => {
  return (
    <>
      {otherValue}
      <span className={"hightlight"}>{hightlightValue}</span>
    </>
  );
};

const ChangedValue = ({ searchValue, string }) => {
  if (searchValue) {
    const newSearchValue = searchValue.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regExp = new RegExp(newSearchValue, "gi");
    const matchValue = string.match(regExp);

    if (matchValue) {
      return string.split(regExp).map((otherValue, index, array) => {
        if (index < array.length - 1) {
          const hightlightValue = matchValue.shift();
          return (
            <Hightlight
              hightlightValue={hightlightValue}
              otherValue={otherValue}
              key={index + string}
            />
          );
        }
        return otherValue;
      });
    }
  } else {
    return string;
  }
};

class TasksItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowEditValue: false,
      editorValue: "",
    };
  }

  handleClickValue = () => {
    const { value } = this.props;
    this.setState({ isShowEditValue: true, editorValue: value });
  };

  handleChangeEditor = (e) => {
    console.log(e.target.value);
    this.setState({ editorValue: e.target.value });
  };

  addNewValue = () => {
    const { editTask, id } = this.props;
    const { editorValue } = this.state; 

    if (editorValue.trim()) {
      editTask({ id: id, value: editorValue });
      this.setState({ isShowEditValue: false });
    } else {
      this.setState({ isShowEditValue: false, editorValue: "" });
    }
  };

  handlePressEditor = (e) => {
    if (e.key === "Enter") {
      this.addNewValue();
    }
  };

  handleBlurEditor = () => {
    this.addNewValue();
  };

  handleFocusEditor = (event) => {
    const value = event.target.value;
    event.target.value = "";
    event.target.value = value;
  };

  render() {
    const { value, check, id, toggleTask, deleteTask, searchInputValue } =
      this.props;

    const { isShowEditValue, editorValue } = this.state;

    return (
      <li className={`tasks-item${check ? " checked" : ""}`} id={id}>
        <div className="check-button" onClick={() => toggleTask(id)}>
          <FontAwesomeIcon icon={faCheck} />
        </div>
        <div className="value">
          {isShowEditValue ? (
            <input
              placeholder={"Введите отредактированную задачу"}
              onFocus={this.handleFocusEditor}
              autoFocus 
              onChange={this.handleChangeEditor}
              onKeyPress={this.handlePressEditor}
              className="inner editor"
              onBlur={this.handleBlurEditor}
              value={editorValue} 
              type='text'
            />
          ) : (
            <div className="inner" onClick={() => this.handleClickValue()}>
              <ChangedValue searchValue={searchInputValue} string={value} />
            </div>
          )}
        </div>
        <div className="delete-button" onClick={() => deleteTask(id)}>
          <FontAwesomeIcon icon={faTimes} />
        </div>
      </li>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    searchInputValue: store.toDo.searchTasksInputValue,
  };
};

const mapDispatchToProps = {
  deleteTask: (id) => deleteTask(id),
  toggleTask: (id) => toggleTask(id),
  editTask: (data) => editTask(data),
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksItem);
