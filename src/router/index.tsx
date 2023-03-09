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
  private lastBodyHeight: number;
  private lastBodyWidth: number;
  private isMobile: boolean;
  private lastVisualViewportHeight: number | undefined;

  constructor(props: Props) {
    super(props);
    this.lastBodyHeight = document.body.offsetHeight;
    this.lastBodyWidth = document.body.offsetWidth;
    this.isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(
        navigator.userAgent
      );
    this.lastVisualViewportHeight = window.visualViewport?.height;
  }

  componentDidUpdate = () => {
    const { store } = this.props;
    localStorage.setItem("all-in-one", JSON.stringify(store));
  };

  handleWindowResize = () => {
    const currentHeight = document.body.offsetHeight;
    const currentWidth = document.body.offsetWidth;
    const currentVisualViewportHeight = window.visualViewport?.height;

    switch (true) {
      case document.activeElement?.tagName !== "INPUT":
        break;
      case this.lastBodyWidth !== currentWidth:
        (document.activeElement as HTMLElement).blur();
        break;
      case currentHeight === this.lastBodyHeight:
        if (window.visualViewport?.height === currentHeight) {
          (document.activeElement as HTMLElement).blur();
        }
        break;
      default:
        if (
          typeof this.lastVisualViewportHeight === "number" &&
          typeof currentVisualViewportHeight === "number"
        ) {
          if (
            this.lastVisualViewportHeight < currentVisualViewportHeight &&
            Math.abs(
              (this.lastVisualViewportHeight - currentVisualViewportHeight) * -1
            ) > 60
          ) {
            (document.activeElement as HTMLElement).blur();
          }
        }
        break;
    }

    this.lastBodyHeight = currentHeight;
    this.lastBodyWidth = currentWidth;
    this.lastVisualViewportHeight = currentVisualViewportHeight;
  };

  componentDidMount = () => {
    if (this.isMobile) {
      window.addEventListener("resize", this.handleWindowResize);
    }
  };

  componentWillUnmount = () => {
    if (this.isMobile) {
      window.removeEventListener("resize", this.handleWindowResize);
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
          <CSSTransition
            appear
            key={location.key}
            timeout={{ enter: 300, exit: 300, appear: 0 }}
          >
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
