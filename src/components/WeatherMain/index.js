import React from "react";
import { connect } from "react-redux";
import WeatherInfoItem from "../WeatherInfoItem";
import "./styles.scss";

class WeatherMain extends React.Component {
  render() {
    const { currentCity } = this.props;

    return (
      <div className="weather-main">
        <div className="weather-info-list">
          {!!currentCity && <WeatherInfoItem currentCity={currentCity} />}
        </div>
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

export default connect(mapStateToProps)(WeatherMain);
