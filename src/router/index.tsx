import React from "react";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import MainScreen from "../screens/MainScreen";
import JokesScreen from "../screens/JokesScreen";
import WeatherScreen from "../screens/WeatherScreen";
import TasksScreen from "../screens/TasksScreen";
import { connect, ConnectedProps } from "react-redux";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import WeatherSettingsScreen from "../screens/WeatherSettingsScreen";
import { RootState } from "../reducers";

class Router extends React.Component<Props> {
  componentDidUpdate = () => {
    const { store } = this.props;
    const storeCopy = JSON.parse(JSON.stringify(store));

    storeCopy.holidays.isShowHolidaysPreloader = false;
    storeCopy.jokes.isCategoriesRedBorder = false;
    storeCopy.jokes.isShowJokesPreloader = false;
    storeCopy.tasks.addTaskInputFocus = false;
    storeCopy.weather.addLocationInputFocus = false;
    storeCopy.weather.isActiveHeader = false;
    storeCopy.weather.isShowCurrentLocationPreloader = false;
    storeCopy.weather.isShowSettingsPreloader = false;

    localStorage.setItem("all-in-one", JSON.stringify(storeCopy));
  };

  render() {
    return (
      <HashRouter>
        <RouterAnimation />
      </HashRouter>
    );
  }
}

const RouterAnimation = () => {
  let location = useLocation();

  return (
    <>
      <div className="screens-wrapper">
        <TransitionGroup component={null}>
          <CSSTransition key={location.key} timeout={300}>
            <Routes location={location}>
              <Route path="/" element={<MainScreen />} />
              <Route path="/fun" element={<JokesScreen />} />
              <Route path="/weather" element={<WeatherScreen />} />
              <Route
                path="/weather/settings"
                element={<WeatherSettingsScreen />}
              />
              <Route path="/tasks" element={<TasksScreen />} />
            </Routes>
          </CSSTransition>
        </TransitionGroup>
      </div>
      <Footer />
    </>
  );
};

const mapStateToProps = (store: RootState) => {
  return { store };
};

const connector = connect(mapStateToProps);

type Props = ConnectedProps<typeof connector>;

export default connector(Router);
