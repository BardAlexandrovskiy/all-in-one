import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteTask, editTask, toggleTask } from "../../../actions/tasks";
import { connect, ConnectedProps } from "react-redux";
import "./styles.scss";
import { useState } from "react";
import { CSSTransition } from "react-transition-group";
import { RootState } from "../../../reducers";
import Hightlight from "./hightlight";

type Props = PropsFromRedux & {
  check: boolean;
  value: string;
  id: number;
  isNoHightlight?: boolean;
};

const TasksItem = (props: Props) => {
  const [isEditorOpen, setEditorIsOpen] = useState(false);
  const [editorValue, setEditorValue] = useState("");

  const handleClickValue = () => {
    const { value } = props;
    setEditorIsOpen(true);
    setEditorValue(value);
  };

  const handleChangeEditor = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s+/g, " ").trimStart();
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

  const handlePressEditor = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addNewValue();
    }
  };

  const handleBlurEditor = () => {
    addNewValue();
  };

  const handleFocusEditor = (event: React.FocusEvent<HTMLInputElement>) => {
    const value = event.target.value;
    event.target.value = "";
    event.target.value = value;
  };

  const changedValue = (searchValue: string, string: string) => {
    if (searchValue) {
      const regExp = new RegExp(searchValue.trim(), "gi");
      const matchValue = string.match(regExp);

      if (matchValue) {
        return string.split(regExp).map((otherValue, index, array) => {
          if (index < array.length - 1) {
            const hightlightValue = matchValue.shift();
            if (hightlightValue) {
              return (
                <Hightlight
                  hightlightValue={hightlightValue}
                  otherValue={otherValue}
                  key={index + string}
                />
              );
            }
          }
          return otherValue;
        });
      }
      return string;
    }
    return string;
  };

  const {
    value,
    check,
    id,
    toggleTask,
    deleteTask,
    searchInputValue,
    isNoHightlight,
  } = props;

  return (
    <li className={`tasks-item${check ? " checked" : ""}`}>
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
            onKeyDown={handlePressEditor}
            className="inner editor"
            onBlur={handleBlurEditor}
            value={editorValue}
            type="text"
          />
        ) : (
          <div className="inner notranslate" onClick={handleClickValue}>
            {isNoHightlight ? value : changedValue(searchInputValue, value)}
          </div>
        )}
      </div>
      <div className="delete-button" onClick={() => deleteTask(id)}>
        <FontAwesomeIcon icon={faTimes} />
      </div>
    </li>
  );
};

const mapStateToProps = (store: RootState) => {
  return {
    searchInputValue: store.tasks.searchTasksInputValue,
  };
};

const mapDispatchToProps = {
  deleteTask: (id: number) => deleteTask(id),
  toggleTask: (id: number) => toggleTask(id),
  editTask: (data: { id: number; value: string }) => editTask(data),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(TasksItem);
