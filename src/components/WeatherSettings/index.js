import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { connect } from "react-redux";
import { CSSTransition } from "react-transition-group";
import { showWeatherSettings } from "../../actions/weather";
import WeatherLocationItem from "../WeatherLocationItem";
import WeatherSettingsFooter from "../WeatherSettingsFooter";
import "./styles.scss";

class WeatherSettings extends React.Component {
  render() {
    const { showWeatherSettings, currentCity, currentId } = this.props;

    return (
      <div className="weather-settings">
        <header className="header">
          <div className="header-container container">
            <div
              className="close-button"
              onClick={() => showWeatherSettings(false)}
            >
              <FontAwesomeIcon icon={faArrowLeft} /> Back to the weather
            </div>
          </div>
        </header>
        <div className="weather-settings-main">
          <div className="locations-list">
            <div className="container list-container">
              <CSSTransition
                in={!!currentCity}
                timeout={300}
                unmountOnExit
                mountOnEnter
              >
                <WeatherLocationItem city={currentCity} id={currentId} />
              </CSSTransition>
            </div>
          </div>
        </div>
        <WeatherSettingsFooter />
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
