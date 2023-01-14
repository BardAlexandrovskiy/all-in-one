import React from "react";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import MainScreen from "../screens/MainScreen";
import JokesScreen from "../screens/JokesScreen";
import WeatherScreen from "../screens/WeatherScreen";
import TasksScreen from "../screens/TasksScreen";
import { connect } from "react-redux";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import WeatherSettingsScreen from "../screens/WeatherSettingsScreen";

class Router extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prevActiveElement: null,
    };
  }

  componentDidUpdate = () => {
    const { store } = this.props;
    localStorage.setItem("all-in-one", JSON.stringify(store));
  };

  componentDidMount() {
    window.addEventListener("resize", this.windowResize);
  }

  windowResize = () => {
    const { prevActiveElement } = this.state;
    if (
      navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/webOS/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/iPod/i) ||
      navigator.userAgent.match(/BlackBerry/i) ||
      navigator.userAgent.match(/Windows Phone/i)
    ) {
      if (prevActiveElement === document.activeElement) {
        document.activeElement.blur();
        this.setState({ prevActiveElement: null });
      } else {
        this.setState({ prevActiveElement: document.activeElement });
      }
    }
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

const mapStateToProps = (store) => {
  return { store: store };
};

export default connect(mapStateToProps)(Router);
