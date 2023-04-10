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
import { setLastLocationUrl } from "../actions/other";
import { useEffect } from "react";

// Types

const Router = ({ store, setLastLocationUrl, lastLocation }: ReduxProps) => {
  useEffect(() => {
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
  });

  return (
    <HashRouter>
      <RouterAnimation
        setLastLocationUrl={setLastLocationUrl}
        lastLocation={lastLocation}
        store={store}
      />
    </HashRouter>
  );
};

const RouterAnimation = ({ lastLocation, setLastLocationUrl }: ReduxProps) => {
  const location = useLocation();

  useEffect(() => {
    const currentLocation = location.pathname;

    if (currentLocation !== lastLocation) {
      setLastLocationUrl(currentLocation);
    }
  });

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
  const { lastLocation } = store.other;

  return { store, lastLocation };
};

const mapDispatchToProps = {
  setLastLocationUrl: (location: string) => setLastLocationUrl(location),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(Router);
