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
  private timeoutId: ReturnType<typeof setTimeout> | undefined;
  private isMobile: boolean;
  private isKeyboardActive: boolean;

  constructor(props: Props) {
    super(props);
    this.lastBodyHeight = document.body.offsetHeight;
    this.lastBodyWidth = document.body.offsetWidth;
    this.timeoutId = undefined;
    this.isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(
        navigator.userAgent
      );
    this.isKeyboardActive = true;
  }

  componentDidUpdate = () => {
    const { store } = this.props;
    localStorage.setItem("all-in-one", JSON.stringify(store));
  };

  handleWindowResizeEnd = () => {
    console.log(document.body.offsetHeight);
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => {
      const currentHeight = document.body.offsetHeight;
      const currentWidth = document.body.offsetWidth;
      if (
        document.activeElement?.tagName === "INPUT" &&
        document.activeElement.getAttribute("type") === "text"
      ) {
        if (this.lastBodyWidth !== currentWidth) {
          (document.activeElement as HTMLElement).blur();
          console.log("orientaion");
        } else if (currentHeight === this.lastBodyHeight) {
          if (window.visualViewport?.height === currentHeight) {
            (document.activeElement as HTMLElement).blur();
            console.log("v1");
            console.log(currentHeight, this.lastBodyHeight);
          }
        } else if (currentHeight <= this.lastBodyHeight) {
          (document.activeElement as HTMLElement).blur();
          console.log(currentHeight, this.lastBodyHeight);
          console.log("v2");
        }
      }
      this.lastBodyHeight = currentHeight;
      this.lastBodyWidth = currentWidth;

      // const currentHeight = document.body.offsetHeight;
      // const currentWidth = document.body.offsetWidth;
      // if (this.lastBodyWidth !== currentWidth) {
      //   (document.activeElement as HTMLElement).blur();
      // } else {
      //   this.isKeyboardActive = !this.isKeyboardActive;
      // }
      // if (!this.isKeyboardActive) {
      //   (document.activeElement as HTMLElement).blur();
      // }
      // this.lastBodyHeight = currentHeight;
      // this.lastBodyWidth = currentWidth;
    }, 300);
  };

  componentDidMount = () => {
    console.log(this.lastBodyHeight);
    if (this.isMobile) {
      window.addEventListener("resize", this.handleWindowResizeEnd);
    }
  };

  componentWillUnmount = () => {
    if (this.isMobile) {
      window.removeEventListener("resize", this.handleWindowResizeEnd);
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

const mapStateToProps = (store: RootState) => {
  return { store };
};

const connector = connect(mapStateToProps);

type Props = ConnectedProps<typeof connector>;

export default connector(Router);
