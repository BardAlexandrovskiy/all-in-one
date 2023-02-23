import { connect, ConnectedProps } from "react-redux";
import { changeTaskFilter } from "../../../actions/tasks";
import { RootState } from "../../../reducers";
import "./styles.scss";

const TasksFilterButton = ({
  name,
  title,
  changeTaskFilter,
  filter,
}: Props) => {
  const className = `${
    name === filter ? name + " current" : name
  } button tasks-filter-button`;

  return (
    <button onClick={() => changeTaskFilter(name)} className={className}>
      {title}
    </button>
  );
};

const mapStateToProps = (store: RootState) => {
  return {
    filter: store.tasks.filter,
  };
};

const mapDispatchToProps = {
  changeTaskFilter: (filter: string) => changeTaskFilter(filter),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector> & {
  name: string;
  title: string;
};

export default connector(TasksFilterButton);
