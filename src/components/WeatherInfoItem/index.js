// Weather icons
import { ReactComponent as SunriseIcon } from "../../assets/images/weather/icons/sunrise-icon.svg";
import { ReactComponent as SunsetIcon } from "../../assets/images/weather/icons/sunset-icon.svg";
import { ReactComponent as HumidityIcon } from "../../assets/images/weather/icons/humidity-icon.svg";
import { ReactComponent as CloudinessIcon } from "../../assets/images/weather/icons/cloudiness-icon.svg";
import { ReactComponent as WindSpeedIcon } from "../../assets/images/weather/icons/wind-speed-icon.svg";
import { ReactComponent as WindDirectionIcon } from "../../assets/images/weather/icons/wind-direction-icon.svg";
import { ReactComponent as WindGustIcon } from "../../assets/images/weather/icons/wind-gust-icon.svg";
import { ReactComponent as VisibilityIcon } from "../../assets/images/weather/icons/visibility-icon.svg";
import { ReactComponent as PressureIcon } from "../../assets/images/weather/icons/pressure-icon.svg";

// Weather backgrounds
import clearSkyImg from "../../assets/images/weather/backgrounds/clear-sky.jpg";
import fewCloudsImg from "../../assets/images/weather/backgrounds/few-clouds.jpg";
import scatteredCloudsImg from "../../assets/images/weather/backgrounds/scattered-clouds.jpg";
import brokenCloudsImg from "../../assets/images/weather/backgrounds/broken-clouds.jpg";
import rainImg from "../../assets/images/weather/backgrounds/rain.jpg";
import thunderstormImg from "../../assets/images/weather/backgrounds/thunderstorm.jpg";
import snowImg from "../../assets/images/weather/backgrounds/snow.jpg";
import mistImg from "../../assets/images/weather/backgrounds/mist.jpg";
import drizzleImg from "../../assets/images/weather/backgrounds/drizzle.jpg";

import React from "react";
import { connect } from "react-redux";
import { isEmptyObject } from "../../constants";
import { getWeatherFunction } from "../../constants/weather";
import { CSSTransition } from "react-transition-group";
import Preloader from "../Preloader";
import TextBanner from "../TextBanner";
import "./styles.scss";
import {
  changeWeatherHeader,
  setCurrentLocation,
  updateLocation,
} from "../../actions/weather";

class WeatherInfoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPreloader: false,
      isError: false,
      errorText: "",
    };
    this.infoBlockRef = React.createRef();
  }

  componentDidUpdate(prevProps) {
    const { isActive: isActivePrev } = prevProps;
    const { isActive } = this.props;

    if (isActive && isActivePrev !== isActive) {
      this.checkUpadate();

      if (this.infoBlockRef.current) {
        this.infoBlockRef.current.scrollTo(0, 0);
      }
    }
  }

  componentDidMount() {
    const { changeWeatherHeader } = this.props;
    changeWeatherHeader(false);
  }

  checkUpadate = () => {
    const {
      city,
      currentId,
      id,
      weatherInfo,
      updateWeatherTime,
      setCurrentLocation,
      updateLocation,
    } = this.props;

    let isWeatherUpdate = false;

    if (updateWeatherTime) {
      const minutes = ((Date.now() - updateWeatherTime) / (1000 * 60)).toFixed(
        1
      );

      if (minutes > 0) {
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

          if (id === currentId) {
            setCurrentLocation({
              weatherInfo,
              updateWeatherTime: Date.now(),
            });
          } else {
            updateLocation(id, { weatherInfo, updateWeatherTime: Date.now() });
          }
        })
        .catch((error) =>
          this.setState({
            isError: true,
            errorText: `Error: ${error.message}.`,
          })
        )
        .finally(() => this.setState({ isPreloader: false }));
    }
  };

  handleScrollInfoBlock = () => {
    const { changeWeatherHeader, isActiveHeader } = this.props;
    const currentScrollPosition = this.infoBlockRef.current.scrollTop;

    if (currentScrollPosition && !isActiveHeader) {
      changeWeatherHeader(true);
    } else if (!currentScrollPosition && isActiveHeader) {
      changeWeatherHeader(false);
    }
  };

  render() {
    const { isPreloader, errorText, isError } = this.state;
    let { weatherInfo } = this.props;

    const {
      weatherDescription,
      icon,
      temp,
      tempFeelsLike,
      humidity,
      windSpeed,
      windDeg,
      windGust,
      cloudiness,
      pressure,
      visibility,
      sunrise,
      sunset,
      id,
      date,
    } = weatherInfo;

    // Set background by weather id
    let backgroundImageSrc = "";

    switch (true) {
      case id >= 200 && id <= 232:
        backgroundImageSrc = thunderstormImg;
        break;
      case id >= 300 && id <= 321:
        backgroundImageSrc = drizzleImg;
        break;
      case id >= 500 && id <= 531:
        backgroundImageSrc = rainImg;
        break;
      case id >= 600 && id <= 622:
        backgroundImageSrc = snowImg;
        break;
      case id >= 700 && id <= 781:
        backgroundImageSrc = mistImg;
        break;
      case id === 800:
        backgroundImageSrc = clearSkyImg;
        break;
      case id === 801:
        backgroundImageSrc = fewCloudsImg;
        break;
      case id === 802:
        backgroundImageSrc = scatteredCloudsImg;
        break;
      default:
        backgroundImageSrc = brokenCloudsImg;
        break;
    }

    return (
      <div className="weather-info-item">
        <CSSTransition
          in={isPreloader}
          timeout={300}
          mountOnEnter
          unmountOnExit
          appera
        >
          <Preloader />
        </CSSTransition>
        <CSSTransition in={isError} timeout={300} mountOnEnter unmountOnExit>
          <TextBanner text={`Oops, something went wrong. ${errorText}`} />
        </CSSTransition>
        <CSSTransition
          in={!isEmptyObject(weatherInfo)}
          timeout={300}
          mountOnEnter
          unmountOnExit
        >
          <div
            className="info"
            ref={this.infoBlockRef}
            onScroll={this.handleScrollInfoBlock}
          >
            <img className="background-image" src={backgroundImageSrc} alt="" />
            <div className="container info-container">
              <div className="main">
                {!!temp && <span className="current-temp">{temp}</span>}
                {!!weatherDescription && (
                  <div className="description">
                    {weatherDescription}
                    {!!icon && <img src={icon} alt="" />}
                  </div>
                )}
                {!!date && <div className="current-date">{date}</div>}
                {!!tempFeelsLike && (
                  <div className="temp-feels-like">{`Feels like: ${tempFeelsLike}`}</div>
                )}
              </div>
              <div className="other-info">
                {!!cloudiness && (
                  <div className="info-item">
                    <CloudinessIcon />
                    {`Cloudiness: ${cloudiness}`}
                  </div>
                )}
                {!!humidity && (
                  <div className="info-item">
                    <HumidityIcon />
                    {`Humidity: ${humidity}`}
                  </div>
                )}
                <div className="info-item full">
                  {!!windSpeed && (
                    <div className="inner">
                      <WindSpeedIcon />
                      {`Wind speed: ${windSpeed}`}
                    </div>
                  )}
                  {!!windGust && (
                    <div className="inner">
                      <WindGustIcon />
                      {`Wind gust: ${windGust}`}
                    </div>
                  )}
                  {!!windDeg && (
                    <div className="inner long">
                      <WindDirectionIcon />
                      {`Wind direction: ${windDeg}`}
                    </div>
                  )}
                </div>
                {!!visibility && (
                  <div className="info-item">
                    <VisibilityIcon />
                    <span>{`Visibility: ${visibility}`}</span>
                  </div>
                )}
                {!!pressure && (
                  <div className="info-item">
                    <PressureIcon />
                    <span>{`Pressure: ${pressure}`}</span>
                  </div>
                )}
                <div className="info-item full">
                  {!!sunrise && (
                    <div className="inner">
                      <SunriseIcon />
                      <span>{`Sunrise: ${sunrise}`}</span>
                    </div>
                  )}
                  {!!sunset && (
                    <div className="inner">
                      <SunsetIcon />
                      <span>{`Sunset: ${sunset}`}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CSSTransition>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    weather: {
      currentLocation: { id: currentId },
      isActiveHeader,
    },
  } = state;

  return {
    isActiveHeader,
    currentId,
  };
};

const mapDispatchToProps = {
  changeWeatherHeader: (bool) => changeWeatherHeader(bool),
  setCurrentLocation: (location) => setCurrentLocation(location),
  updateLocation: (id, info) => updateLocation(id, info),
};

export default connect(mapStateToProps, mapDispatchToProps)(WeatherInfoItem);
