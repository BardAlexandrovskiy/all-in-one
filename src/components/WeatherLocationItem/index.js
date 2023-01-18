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
import { CSSTransition, SwitchTransition } from "react-transition-group";

class WeatherLocationItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAnimationUploadButton: false,
    };
  }

  deleteCity = () => {
    const { currentId, id, setCurrentLocation, deleteLocation } = this.props;

    if (currentId === id) {
      setCurrentLocation();
    } else {
      deleteLocation(id);
    }
  };

  componentDidUpdate = (prev) => {
    if (
      !prev.isShowCurrentLocationPreloader &&
      this.props.isShowCurrentLocationPreloader
    ) {
      this.uploadButtonAnimation();
    }
  };

  componentWillUnmount = () => {
    clearInterval(this.uploadButtonAnimationInterval);
  };

  uploadButtonAnimation = () => {
    this.setState({ isAnimationUploadButton: true });

    this.uploadButtonAnimationInterval = setInterval(() => {
      const { isShowCurrentLocationPreloader } = this.props;
      if (!isShowCurrentLocationPreloader) {
        this.setState({
          isAnimationUploadButton: false,
          isLastInterval: false,
        });
        clearInterval(this.uploadButtonAnimationInterval);
      }
    }, 1000);
  };

  render() {
    const { city, id, currentId, getCurrentLocationByGeo, isGeoAccess } =
      this.props;
    const { isAnimationUploadButton } = this.state;

    const isCurrentLocation = id === currentId;

    return (
      <div className="weather-location-item">
        <div className="name">
          {city || (isGeoAccess ? "Not defined" : "No geo access")}
          {isCurrentLocation && <FontAwesomeIcon icon={faMapMarkerAlt} />}
        </div>
        <SwitchTransition mode="out-in">
          <CSSTransition timeout={300} key={isCurrentLocation && !city}>
            {isCurrentLocation && !city ? (
              <div
                className={`update-button${
                  isAnimationUploadButton ? " animation-active" : ""
                }`}
                onClick={() => getCurrentLocationByGeo()}
              >
                <FontAwesomeIcon icon={faRedo} />
              </div>
            ) : (
              city && (
                <div className="delete-button" onClick={this.deleteCity}>
                  <FontAwesomeIcon icon={faTimes} />
                </div>
              )
            )}
          </CSSTransition>
        </SwitchTransition>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    weather: {
      currentLocation: { id: currentId },
      isGeoAccess,
      isShowCurrentLocationPreloader,
    },
  } = state;

  return {
    currentId,
    isGeoAccess,
    isShowCurrentLocationPreloader,
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
