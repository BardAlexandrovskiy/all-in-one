import { HashRouter } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../reducers";
import { useEffect } from "react";
import RouterAnimation from './animation';


const Router = ({ store }: ReduxProps) => {
  useEffect(() => {
    const storeCopy = JSON.parse(JSON.stringify(store));

    // Dump unnecessary data that is not needed in the store
    storeCopy.holidays.isShowHolidaysPreloader = false;
    storeCopy.jokes.isCategoriesRedBorder = false;
    storeCopy.jokes.isShowJokesPreloader = false;
    storeCopy.tasks.addTaskInputFocus = false;
    storeCopy.weather.addLocationInputFocus = false;
    storeCopy.weather.isActiveHeader = false;
    storeCopy.weather.isShowCurrentLocationPreloader = false;
    storeCopy.weather.isShowSettingsPreloader = false;

    localStorage.setItem("all-in-one", JSON.stringify(storeCopy));
  });

  return (
    <HashRouter>
      <RouterAnimation />
    </HashRouter>
  );
};

const mapStateToProps = (store: RootState) => {
  return {
    store
  };
};

const connector = connect(mapStateToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(Router);
