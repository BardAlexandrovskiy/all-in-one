import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { connect } from "react-redux";
import { setCurrentLocation } from "../../actions/weather";
import "./style.scss";

class WeatherLocationItem extends React.Component {
  deleteCity = () => {
    const { currentId, id, setCurrentLocation } = this.props;
    console.log(this.props);

    if (currentId === id) {
      setCurrentLocation();
    }
  };

  render() {
    const { city } = this.props;

    return (
      <div className="weather-location-item">
        <div className="name">{city}</div>
        <div className="delete-button" onClick={this.deleteCity}>
          <FontAwesomeIcon icon={faTimes} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    weather: {
      currentLocation: { id: currentId },
    },
  } = state;

  return {
    currentId,
  };
};

const mapDispatchToProps = {
  setCurrentLocation: (location) => setCurrentLocation(location),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WeatherLocationItem);
