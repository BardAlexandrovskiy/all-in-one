import React from "react";
import { connect } from "react-redux";
import { getLocationByIp } from "../../actions/weather";
import WeatherHeader from "../../components/WeatherHeader";
import WeatherMain from "../../components/WeatherMain";
import "./styles.scss";

class WeatherScreen extends React.Component {
  componentDidMount() {
    const { getCurrentLocation, currentCity } = this.props;

    if (!currentCity) {
      getCurrentLocation();
    }
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

const mapStateToProps = (state) => {
  const {
    weather: {
      currentLocation: { city: currentCity },
    },
  } = state;

  return {
    currentCity: currentCity,
  };
};

const mapDispatchToProps = {
  getCurrentLocation: () => getLocationByIp(),
};

export default connect(mapStateToProps, mapDispatchToProps)(WeatherScreen);
