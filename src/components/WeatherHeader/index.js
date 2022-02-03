import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { connect } from "react-redux";
import "./styles.scss";

class WeatherHeader extends React.Component {
  render() {
    const { currentCity, isCurrentCitySearchError, isActiveHeader } =
      this.props;

    let currentCityOutput = "";

    if (currentCity) {
      currentCityOutput = currentCity;
    } else if (!currentCity && isCurrentCitySearchError) {
      currentCityOutput = "City not found";
    } else {
      currentCityOutput = "Locating...";
    }

    return (
      <header className={`weather-header${isActiveHeader ? " active" : ""}`}>
        <div className="header-container container">
          <div className="current-city">
            {currentCityOutput}
            <FontAwesomeIcon icon={faMapMarkerAlt} />
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (store) => {
  const {
    weather: {
      currentLocation: {
        city: currentCity,
        isSearchError: isCurrentCitySearchError,
      },
      isActiveHeader,
    },
  } = store;

  return {
    currentCity,
    isCurrentCitySearchError,
    isActiveHeader,
  };
};

export default connect(mapStateToProps)(WeatherHeader);
