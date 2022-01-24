import React from "react";
import { connect } from "react-redux";
import { getLocationByIp, getWeatherByCity } from "../../actions/weather";
import WeatherHeader from "../../components/WeatherHeader";
import WeatherMain from "../../components/WeatherMain";
import "./styles.scss";

class WeatherScreen extends React.Component {
  componentDidMount() {
    const { getLocationByIp } = this.props;
    getLocationByIp();
  }

  render() {
    return (
      <div className="weather-screen screen">
        <WeatherHeader />
        <WeatherMain />
      </div>
    );
  }
}

const mapDispatchToProps = {
  getLocationByIp: () => getLocationByIp(),
  getWeatherByCity: (cityName) => getWeatherByCity(cityName),
};

export default connect(null, mapDispatchToProps)(WeatherScreen);
