import React from "react";
import { connect } from "react-redux";
import { getWeatherByCity } from "../../actions/weather";

class WeatherMain extends React.Component {
  componentDidUpdate() {}

  render() {
    return <div className="weather-main"></div>;
  }
}

const mapDispatchToProps = {
  getWeatherByCity: (cityName) => getWeatherByCity(cityName),
};

export default connect(null, mapDispatchToProps)(WeatherMain);
