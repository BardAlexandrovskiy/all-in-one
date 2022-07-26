import { useEffect } from "react";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import MainScreen from "../screens/MainScreen";
import JokesScreen from "../screens/JokesScreen";
import WeatherScreen from "../screens/WeatherScreen";
import TasksScreen from "../screens/TasksScreen";
import { connect } from "react-redux";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import WeatherSettingsScreen from "../screens/WeatherSettingsScreen";

const Router = ({ store }) => {
  useEffect(() => {
    localStorage.setItem("all-in-one", JSON.stringify(store));
  });

  return (
    <HashRouter>
      <RouterAnimation />
    </HashRouter>
  );
};

const RouterAnimation = () => {
  let location = useLocation();

  return (
    <>
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
      <Footer />
    </>
  );
};

const mapStateToProps = (store) => {
  return { store: store };
};

export default connect(mapStateToProps)(Router);
