import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteTask, editTask, toggleTask } from "../../../actions/tasks";
import { connect } from "react-redux";
import "./styles.scss";
import { useState } from "react";
import { CSSTransition } from "react-transition-group";

const Hightlight = ({ otherValue, hightlightValue }) => {
  return (
    <>
      {otherValue}
      <span className={"hightlight notranslate"}>{hightlightValue}</span>
    </>
  );
};

const ChangedValue = ({ searchValue, string }) => {
  if (searchValue) {
    const regExp = new RegExp(searchValue.trim(), "gi");
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
    return string;
  }
  return string;
};

const TasksItem = (props) => {
  const [isEditorOpen, setEditorIsOpen] = useState(false);
  const [editorValue, setEditorValue] = useState("");

  const handleClickValue = () => {
    const { value } = props;
    setEditorIsOpen(true);
    setEditorValue(value);
  };

  const handleChangeEditor = (e) => {
    const value = e.target.value.replace(/\s+/g, " ").trimLeft();
    if (value.length <= 140) {
      setEditorValue(value);
    }
  };

  const addNewValue = () => {
    const { editTask, id } = props;
    const value = editorValue.trim();

    if (value) {
      editTask({ id: id, value: value });
      setEditorIsOpen(false);
    } else {
      setEditorIsOpen(false);
      setEditorValue("");
    }
  };

  const handlePressEditor = (e) => {
    if (e.key === "Enter") {
      addNewValue();
    }
  };

  const handleBlurEditor = () => {
    addNewValue();
  };

  const handleFocusEditor = (event) => {
    const value = event.target.value;
    event.target.value = "";
    event.target.value = value;
  };

  const { value, check, id, toggleTask, deleteTask, searchInputValue } = props;

  return (
    <li className={`tasks-item${check ? " checked" : ""}`} id={id}>
      <div className="check-button" onClick={() => toggleTask(id)}>
        <CSSTransition in={check} timeout={300} unmountOnExit mountOnEnter>
          <FontAwesomeIcon icon={faCheck} />
        </CSSTransition>
      </div>
      <div className="value notranslate">
        {isEditorOpen ? (
          <input
            onFocus={handleFocusEditor}
            autoFocus
            onChange={handleChangeEditor}
            onKeyPress={handlePressEditor}
            className="inner editor"
            onBlur={handleBlurEditor}
            value={editorValue}
            type="text"
          />
        ) : (
          <div className="inner notranslate" onClick={() => handleClickValue()}>
            {<ChangedValue searchValue={searchInputValue} string={value} />}
          </div>
        )}
      </div>
      <div className="delete-button" onClick={() => deleteTask(id)}>
        <FontAwesomeIcon icon={faTimes} />
      </div>
    </li>
  );
};

const mapStateToProps = (store) => {
  return {
    searchInputValue: store.tasks.searchTasksInputValue,
  };
};

const mapDispatchToProps = {
  deleteTask: (id) => deleteTask(id),
  toggleTask: (id) => toggleTask(id),
  editTask: (data) => editTask(data),
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksItem);
