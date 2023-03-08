import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { Link } from "react-router-dom";
import {
  getCurrentLocationByGeo,
  setCurrentLocation,
} from "../../../actions/weather";
import {
  getWeatherBackgroundById,
  getWeatherFunction,
  getWeatherIconById,
} from "../../../constants/weather";
import Preloader from "../../../components/Preloader";
import "./styles.scss";
import { CSSTransition } from "react-transition-group";
import errorImage from "../../../assets/images/error-image-1.svg";
import noGeoImage from "../../../assets/images/error-image-3.svg";
import WidgetErrorBlock from "../../../components/WidgetErrorBlock";

import { RootState } from "../../../reducers";
import { CurrentLocation } from "../../../reducers/weather";
import LazyLoadImage from "../../../components/LazyLoadImage";

type State = {
  isPreloader: boolean;
  isError: boolean;
  errorText: string;
};

class WeatherWidget extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isPreloader: false,
      isError: false,
      errorText: "",
    };
  }

  componentDidMount = async () => {
    const { getCurrentLocationByGeo, city } = this.props;

    if (!city) {
      getCurrentLocationByGeo();
    } else {
      this.checkUpadate();
    }
  };

  checkUpadate = async () => {
    const { city, weatherInfo, updateWeatherTime, setCurrentLocation } =
      this.props;

    let isWeatherUpdate = false;

    if (updateWeatherTime) {
      const minutes = +((Date.now() - updateWeatherTime) / (1000 * 60)).toFixed(
        1
      );

      if (minutes > 0) {
        isWeatherUpdate = true;
      }
    } else {
      isWeatherUpdate = true;
    }

    if (!weatherInfo || isWeatherUpdate) {
      this.setState({ isPreloader: true });
      try {
        const result = await getWeatherFunction(city);
        if (result) {
          const { weatherInfo } = result;
          setCurrentLocation({
            weatherInfo,
            updateWeatherTime: Date.now(),
          });
        }
      } catch (error) {
        this.setState({
          isError: true,
          errorText:
            error instanceof Error
              ? `Error: ${error.message}.`
              : `Error: unexpected error.`,
        });
      }
    }
    this.setState({ isPreloader: false });
  };

  render() {
    const { weatherInfo, city, isGeoAccess, isShowCurrentLocationPreloader } =
      this.props;
    const { isPreloader, errorText, isError } = this.state;

    const { temp, id, date, time } = weatherInfo || {};

    let backgroundImage: string | undefined = undefined;
    let icon: string | undefined = undefined;

    if (typeof id === "number" && typeof time === "number") {
      backgroundImage = getWeatherBackgroundById(id, time);
      icon = getWeatherIconById(id, time);
    }

    return (
      <Link to="/weather" className="weather-widget">
        <CSSTransition
          in={isPreloader}
          timeout={300}
          mountOnEnter
          unmountOnExit
        >
          <Preloader />
        </CSSTransition>

        <CSSTransition
          in={isError || (!city && !isShowCurrentLocationPreloader)}
          timeout={{
            enter: 500,
            exit: 0,
          }}
          mountOnEnter
          unmountOnExit
        >
          <WidgetErrorBlock
            text={
              !isGeoAccess
                ? " Oops, no access to geolocation."
                : "Oops, something went wrong, no weather yet."
            }
            errorText={errorText}
            image={!isGeoAccess ? errorImage : noGeoImage}
          />
        </CSSTransition>
        <CSSTransition
          in={!!weatherInfo && !isError && !!backgroundImage}
          timeout={{
            enter: 500,
            exit: 0,
          }}
          mountOnEnter
          unmountOnExit
        >
          <div className="weather-background">
            <LazyLoadImage
              src={backgroundImage ? backgroundImage : ""}
              alt="Weather background"
            />
          </div>
        </CSSTransition>
        <CSSTransition
          in={!!weatherInfo && !isError}
          timeout={{
            enter: 500,
            exit: 0,
          }}
          mountOnEnter
          unmountOnExit
        >
          <div className="info">
            {!!city && <h2 className="city">{city}</h2>}
            {!!temp && <span className="current-temp">{temp}</span>}
            {!!icon && (
              <div className="weather-icon">
                <LazyLoadImage src={icon} alt="Weather icon" />
              </div>
            )}
            {!!date && <div className="current-date">{date}</div>}
          </div>
        </CSSTransition>
      </Link>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {
    weather: {
      currentLocation: { city, weatherInfo, updateWeatherTime },
      isGeoAccess,
      isShowCurrentLocationPreloader,
    },
  } = state;

  return {
    city,
    weatherInfo,
    updateWeatherTime,
    isGeoAccess,
    isShowCurrentLocationPreloader,
  };
};

const mapDispatchToProps = {
  getCurrentLocationByGeo: () => getCurrentLocationByGeo(),
  setCurrentLocation: (location: CurrentLocation) =>
    setCurrentLocation(location),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export default connector(WeatherWidget);
