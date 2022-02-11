import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { connect } from "react-redux";
import { showWeatherSettings } from "../../actions/weather";
import { WeatherLocationItem } from "../WeatherLocationItem";
import "./styles.scss";

class WeatherSettings extends React.Component {
  render() {
    const { showWeatherSettings, currentCity, currentId } = this.props;

    return (
      <div className="weather-settings">
        <div className="container settings-container">
          <div
            className="close-button"
            onClick={() => showWeatherSettings(false)}
          >
            <FontAwesomeIcon icon={faArrowLeft} /> Back to the weather
          </div>
          <div className="locations-list">
            {!!currentCity && (
              <WeatherLocationItem city={currentCity} id={currentId} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    weather: {
      currentLocation: { city: currentCity, id: currentId },
    },
  } = state;

  return {
    currentCity,
    currentId,
  };
};

const mapDispatchToProps = {
  showWeatherSettings: (bool) => showWeatherSettings(bool),
};

export default connect(mapStateToProps, mapDispatchToProps)(WeatherSettings);
