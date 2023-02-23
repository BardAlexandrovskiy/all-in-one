import {
  faMapMarkerAlt,
  faRedo,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { connect, ConnectedProps } from "react-redux";
import {
  deleteLocation,
  getCurrentLocationByGeo,
  setCurrentLocation,
} from "../../../actions/weather";
import "./style.scss";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { CurrentLocation } from "../../../reducers/weather";
import { RootState } from "../../../reducers";

class WeatherLocationItem extends React.PureComponent<Props, State> {
  private uploadButtonAnimationInterval:
    | ReturnType<typeof setInterval>
    | undefined;

  constructor(props: Props) {
    super(props);
    this.state = {
      isAnimationUploadButton: false,
    };
    this.uploadButtonAnimationInterval = undefined;
  }

  deleteCity = () => {
    const { currentId, id, setCurrentLocation, deleteLocation } = this.props;

    if (currentId === id) {
      setCurrentLocation();
    } else if (id) {
      deleteLocation(id);
    }
  };

  componentDidUpdate = (prev: Props) => {
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
          {/* @ts-expect-error: Let's ignore a single compiler error like this unreachable code */}
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

const mapStateToProps = (state: RootState) => {
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
  setCurrentLocation: (location?: CurrentLocation) =>
    setCurrentLocation(location),
  deleteLocation: (id: number) => deleteLocation(id),
  getCurrentLocationByGeo: () => getCurrentLocationByGeo(),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

type Props = ReduxProps & {
  id?: number;
  city?: string;
};

type State = {
  isAnimationUploadButton: boolean;
};

export default connector(WeatherLocationItem);
