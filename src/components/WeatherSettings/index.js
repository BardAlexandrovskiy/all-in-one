import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { connect } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { showWeatherSettings } from "../../actions/weather";
import Preloader from "../Preloader";
import WeatherLocationItem from "../WeatherLocationItem";
import WeatherSettingsFooter from "../WeatherSettingsFooter";
import "./styles.scss";

class WeatherSettings extends React.Component {
  render() {
    const {
      showWeatherSettings,
      currentCity,
      currentId,
      locations,
      isPreloader,
    } = this.props;

    return (
      <div className="weather-settings">
        <header className="header">
          <div className="header-container container">
            <div
              className="close-button"
              onClick={() => showWeatherSettings(false)}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              Back to the weather
            </div>
          </div>
        </header>
        <div className="weather-settings-main">
          <CSSTransition
            timeout={300}
            unmountOnExit
            mountOnEnter
            in={isPreloader}
          >
            <Preloader />
          </CSSTransition>
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
              <TransitionGroup component={null}>
                {locations.map((location) => {
                  const { city, id } = location;

                  return (
                    <CSSTransition key={id} timeout={300}>
                      <WeatherLocationItem city={city} id={id} />
                    </CSSTransition>
                  );
                })}
              </TransitionGroup>
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
      locations,
      isShowSettingsPreloader: isPreloader,
    },
  } = state;

  return {
    currentCity,
    currentId,
    locations,
    isPreloader,
  };
};

const mapDispatchToProps = {
  showWeatherSettings: (bool) => showWeatherSettings(bool),
};

export default connect(mapStateToProps, mapDispatchToProps)(WeatherSettings);
