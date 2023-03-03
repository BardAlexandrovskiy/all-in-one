import { connect, ConnectedProps } from "react-redux";
import { changeTaskFilter } from "../../../actions/tasks";
import { RootState } from "../../../reducers";
import "./styles.scss";

type Props = PropsFromRedux & {
  name: string;
  title: string;
};

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

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(TasksFilterButton);
