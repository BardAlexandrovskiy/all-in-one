import { connect } from "react-redux";
import { changeTaskFilter } from "../../../actions/tasks";
import "./styles.scss";

const TasksFilterButton = ({ name, title, changeTaskFilter, filter }) => {
  const className = `${
    name === filter ? name + " current" : name
  } button tasks-filter-button`;

  return (
    <button onClick={() => changeTaskFilter(name)} className={className}>
      {title}
    </button>
  );
};

const mapStateToProps = (store) => {
  return {
    filter: store.tasks.filter,
  };
};

const mapDispatchToProps = {
  changeTaskFilter: (filter) => changeTaskFilter(filter),
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksFilterButton);
