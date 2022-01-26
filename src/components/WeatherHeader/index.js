import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { connect } from "react-redux";
import "./styles.scss";

class WeatherHeader extends React.Component {
  render() {
    const { currentCity } = this.props;

    return (
      <header className="weather-header">
        <div className="header-container container">
          <div className="current-city">
            {currentCity ? currentCity : "Locating..."}
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
      currentLocation: { city: currentCity },
    },
  } = store;

  return {
    currentCity: currentCity,
  };
};

export default connect(mapStateToProps)(WeatherHeader);
