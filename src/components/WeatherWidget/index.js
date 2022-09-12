import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  getCurrentLocationByGeo,
  setCurrentLocation,
} from "../../actions/weather";
import { isEmptyObject } from "../../constants";
import {
  getWeatherBackgroundById,
  getWeatherFunction,
  getWeatherIconById,
} from "../../constants/weather";
import Preloader from "../Preloader";
import "./styles.scss";
import { CSSTransition } from "react-transition-group";
import errorImage from "../../assets/images/error-image-1.svg";
import noGeoImage from "../../assets/images/error-image-3.svg";
import WidgetErrorBlock from "../WidgetErrorBlock";

class WeatherWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPreloader: false,
      isError: false,
      errorText: "",
    };
  }

  componentDidMount = () => {
    const { getCurrentLocationByGeo, city } = this.props;

    if (!city) {
      getCurrentLocationByGeo();
    } else {
      this.checkUpadate();
    }
  };

  checkUpadate = () => {
    const { city, weatherInfo, updateWeatherTime, setCurrentLocation } =
      this.props;

    let isWeatherUpdate = false;

    if (updateWeatherTime) {
      const minutes = ((Date.now() - updateWeatherTime) / (1000 * 60)).toFixed(
        1
      );

      if (minutes > 5) {
        isWeatherUpdate = true;
      }
    } else {
      isWeatherUpdate = true;
    }

    if (isEmptyObject(weatherInfo) || isWeatherUpdate) {
      this.setState({ isPreloader: true });
      getWeatherFunction(city)
        .then((result) => {
          const { weatherInfo } = result;

          setCurrentLocation({
            weatherInfo,
            updateWeatherTime: Date.now(),
          });
        })
        .catch((error) => {
          this.setState({
            isError: true,
            errorText: `Error: ${error.message}.`,
          });
        })
        .finally(() => {
          this.setState({ isPreloader: false });
        });
    }
  };

  render() {
    const { weatherInfo, city } = this.props;
    const { isPreloader, errorText, isError, isGeoAccess } = this.state;

    const { temp, id, date, time } = weatherInfo;

    const backgroundImage = getWeatherBackgroundById(id, time);
    const icon = getWeatherIconById(id, time);

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
        {!!isError && (
          <WidgetErrorBlock
            text="Oops, something went wrong, no weather yet."
            errorText={errorText}
            image={errorImage}
          />
        )}
        {!city && !isGeoAccess && !isPreloader && (
          <WidgetErrorBlock
            text="Oops, no access to geolocation."
            image={noGeoImage}
          />
        )}
        {!isEmptyObject(weatherInfo) && !isError && (
          <div className="info">
            <img className="background" src={backgroundImage} alt="" />
            {!!city && <h2 className="city">{city}</h2>}
            {!!temp && <span className="current-temp">{temp}</span>}
            {!!icon && <img src={icon} alt="" />}
            {!!date && <div className="current-date">{date}</div>}
          </div>
        )}
      </Link>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    weather: {
      currentLocation: { city, weatherInfo, updateWeatherTime },
      isGeoAccess,
    },
  } = state;

  return {
    city,
    weatherInfo,
    updateWeatherTime,
    isGeoAccess,
  };
};

const mapDispatchToProps = {
  getCurrentLocationByGeo: () => getCurrentLocationByGeo(),
  setCurrentLocation: (location) => setCurrentLocation(location),
};

export default connect(mapStateToProps, mapDispatchToProps)(WeatherWidget);
