import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { connect } from "react-redux";
import "./styles.scss";

class WeatherHeader extends React.Component {
  render() {
    const { cityByIp } = this.props;

    return (
      <header className="weather-header">
        <div className="header-container container">
          <div className="current-city">
            {cityByIp ? cityByIp : "Locating..."}
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
      locationByIp: { city: cityByIp },
    },
  } = store;

  return {
    cityByIp: cityByIp,
  };
};

export default connect(mapStateToProps)(WeatherHeader);
