import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Preloader from "../../components/Preloader";
import WeatherLocationItem from "../../components/WeatherLocationItem";
import WeatherSettingsFooter from "../../components/WeatherSettingsFooter";
import "./styles.scss";

class WeatherSettingsScreen extends React.Component {
  render() {
    const { currentCity, currentId, locations, isPreloader } = this.props;

    return (
      <div className="weather-settings-screen screen">
        <header className="header">
          <div className="header-container container">
            <Link to="/weather" className="close-button">
              <FontAwesomeIcon icon={faArrowLeft} />
              Back to the weather
            </Link>
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

export default connect(mapStateToProps, null)(WeatherSettingsScreen);
