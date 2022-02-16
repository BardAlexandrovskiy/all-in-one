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
  render() {
    const { city, id, currentId, deleteLocation, getCurrentLocationByGeo } =
      this.props;

    const isCurrentLocation = id === currentId;

    return (
      <div className="weather-location-item">
        <div className="name">
          {city || "Not found"}
          {isCurrentLocation && <FontAwesomeIcon icon={faMapMarkerAlt} />}
        </div>
        {isCurrentLocation ? (
          <div
            className="update-button"
            onClick={() => getCurrentLocationByGeo()}
          >
            <FontAwesomeIcon icon={faRedo} />
          </div>
        ) : (
          <div className="delete-button" onClick={() => deleteLocation(id)}>
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
    },
  } = state;

  return {
    currentId,
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
