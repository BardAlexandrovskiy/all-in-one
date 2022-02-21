import {
  faMapMarkerAlt,
  faRedo,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { connect } from "react-redux";
import {
  deleteLocation,
  getCurrentLocationByGeo,
  setCurrentLocation,
} from "../../actions/weather";
import "./style.scss";

class WeatherLocationItem extends React.Component {
  deleteCity = () => {
    const { currentId, id, setCurrentLocation, deleteLocation } = this.props;

    if (currentId === id) {
      setCurrentLocation();
    } else {
      deleteLocation(id);
    }
  };

  render() {
    const { city, id, currentId, getCurrentLocationByGeo, isGeoAccess } =
      this.props;

    const isCurrentLocation = id === currentId;

    return (
      <div className="weather-location-item">
        <div className="name">
          {city || (isGeoAccess ? "Not defined" : "No geo access")}
          {isCurrentLocation && <FontAwesomeIcon icon={faMapMarkerAlt} />}
        </div>
        {isCurrentLocation && !city && (
          <div
            className={`update-button`}
            onClick={() => getCurrentLocationByGeo()}
          >
            <FontAwesomeIcon icon={faRedo} />
          </div>
        )}
        {city && (
          <div className="delete-button" onClick={this.deleteCity}>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    weather: {
      currentLocation: { id: currentId },
      isGeoAccess,
    },
  } = state;

  return {
    currentId,
    isGeoAccess,
  };
};

const mapDispatchToProps = {
  setCurrentLocation: (location) => setCurrentLocation(location),
  deleteLocation: (id) => deleteLocation(id),
  getCurrentLocationByGeo: () => getCurrentLocationByGeo(),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WeatherLocationItem);
