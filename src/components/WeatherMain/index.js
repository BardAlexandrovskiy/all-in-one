import React from "react";
import { connect } from "react-redux";
import WeatherInfoItem from "../WeatherInfoItem";
import "./styles.scss";

class WeatherMain extends React.Component {
  render() {
    const {
      currentCity,
      currentId,
      currentWeatherInfo,
      currentUpdateWeatherTime,
    } = this.props;

    return (
      <div className="weather-main">
        <div className="weather-info-list">
          {!!currentCity && (
            <WeatherInfoItem
              city={currentCity}
              id={currentId}
              weatherInfo={currentWeatherInfo}
              updateWeatherTime={currentUpdateWeatherTime}
            />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    weather: {
      currentLocation: {
        city: currentCity,
        id: currentId,
        weatherInfo: currentWeatherInfo,
        updateWeatherTime: currentUpdateWeatherTime,
      },
    },
  } = state;

  return {
    currentCity,
    currentId,
    currentWeatherInfo,
    currentUpdateWeatherTime,
  };
};

export default connect(mapStateToProps)(WeatherMain);
