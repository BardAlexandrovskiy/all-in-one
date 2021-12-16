import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Footer from "../components/Footer";
import MainScreen from "../screens/MainScreen";
import NewsScreen from "../screens/NewsScreen";
import WeatherScreen from "../screens/WeatherScreen";
import TasksScreen from "../screens/TasksScreen";
import { connect } from "react-redux";
class Router extends React.Component {
  componentDidUpdate = () => {
    const { store } = this.props;
    localStorage.setItem("all-in-one", JSON.stringify(store));
  };

  render() {
    return (
      <HashRouter>
        <Routes>
          <Route path="/" element={<MainScreen />} />
          <Route path="/news" element={<NewsScreen />} />
          <Route path="/weather" element={<WeatherScreen />} />
          <Route path="/tasks" element={<TasksScreen />} />
        </Routes>
        <Footer />
      </HashRouter>
    );
  }
}

const mapStateToProps = (store) => {
  return { store: store };
};

export default connect(mapStateToProps)(Router);
