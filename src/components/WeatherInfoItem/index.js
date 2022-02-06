import React from "react";
import { connect } from "react-redux";
import { CSSTransition } from "react-transition-group";
import { getWeatherFunction } from "../../constants/weather";
import Preloader from "../Preloader/imdex";
import RequestErrorBanner from "../RequestErrorBanner";
import "./styles.scss";
import { ReactComponent as SunriseIcon } from "../../assets/images/weather/sunrise-icon.svg";
import { ReactComponent as SunsetIcon } from "../../assets/images/weather/sunset-icon.svg";
import { ReactComponent as HumidityIcon } from "../../assets/images/weather/humidity-icon.svg";
import { ReactComponent as CloudinessIcon } from "../../assets/images/weather/cloudiness-icon.svg";
import { ReactComponent as WindSpeedIcon } from "../../assets/images/weather/wind-speed-icon.svg";
import { ReactComponent as WindDirectionIcon } from "../../assets/images/weather/wind-direction-icon.svg";
import { changeWeatherHeader, setCurrentLocation } from "../../actions/weather";
import { isEmptyObject } from "../../constants";
import clearSkyImg from "../../assets/images/weather/clear-sky.jpg";
import fewCloudsImg from "../../assets/images/weather/few-clouds.jpg";
import scatteredCloudsImg from "../../assets/images/weather/scattered-clouds.jpg";
import brokenCloudsImg from "../../assets/images/weather/broken-clouds.jpg";
import showerRainImg from "../../assets/images/weather/shower-rain.jpg";
import rainImg from "../../assets/images/weather/rain.jpg";
import thunderstormImg from "../../assets/images/weather/thunderstorm.jpg";
import snowImg from "../../assets/images/weather/snow.jpg";
import mistImg from "../../assets/images/weather/mist.jpg";
import Moment from "react-moment";

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

  componentDidMount() {
    const {
      city,
      currentId,
      id,
      weatherInfo,
      updateWeatherTime,
      setCurrentLocation,
      changeWeatherHeader,
    } = this.props;

    changeWeatherHeader(false);

    let isWeatherUpdate = false;

    if (updateWeatherTime) {
      const minutes = ((Date.now() - updateWeatherTime) / (1000 * 60)).toFixed(
        1
      );

      if (minutes > 10) {
        isWeatherUpdate = true;
      }
    } else {
      isWeatherUpdate = true;
    }

    if (id === currentId) {
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
          .catch((error) =>
            this.setState({
              isError: true,
              errorText: `Error: ${error.message}.`,
            })
          )
          .finally(() => this.setState({ isPreloader: false }));
      }
    }
  }

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
      temp,
      tempFeelsLike,
      humidity,
      windSpeed,
      windDeg,
      cloudiness,
      sunrise,
      sunset,
    } = weatherInfo;

    let backgroundImageSrc = "";

    switch (weatherDescription) {
      case "few clouds":
        backgroundImageSrc = fewCloudsImg;
        break;
      case "scattered clouds":
        backgroundImageSrc = scatteredCloudsImg;
        break;
      case "broken clouds":
        backgroundImageSrc = brokenCloudsImg;
        break;
      case "shower rain":
        backgroundImageSrc = showerRainImg;
        break;
      case "rain":
        backgroundImageSrc = rainImg;
        break;
      case "thunderstorm":
        backgroundImageSrc = thunderstormImg;
        break;
      case "snow":
        backgroundImageSrc = snowImg;
        break;
      case "mist":
        backgroundImageSrc = mistImg;
        break;
      default:
        backgroundImageSrc = clearSkyImg;
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
          <RequestErrorBanner
            text={`Oops, something went wrong. ${errorText}`}
          />
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
                  <div className="description">{weatherDescription}</div>
                )}
                <div className="current-date">
                  <Moment format="MMMM Do YYYY, h:mm a" interval={1000} />
                </div>
                {!!tempFeelsLike && (
                  <div className="temp-feels-like">{`Feels like: ${tempFeelsLike}`}</div>
                )}
              </div>
              <div className="other-info">
                {!!humidity && (
                  <div className="info-item">
                    <HumidityIcon />
                    {`Humidity: ${humidity}`}
                  </div>
                )}
                {!!cloudiness && (
                  <div className="info-item">
                    <CloudinessIcon />
                    {`Cloudiness: ${cloudiness}`}
                  </div>
                )}
                {!!windSpeed && (
                  <div className="info-item">
                    <WindSpeedIcon />
                    {`Wind speed: ${windSpeed}`}
                  </div>
                )}
                {!!windDeg && (
                  <div className="info-item">
                    <WindDirectionIcon />
                    {`Wind direction: ${windDeg}`}
                  </div>
                )}
                {!!sunrise && (
                  <div className="info-item sun-info">
                    <SunriseIcon />
                    <span>{`Sunrise: ${sunrise}`}</span>
                  </div>
                )}
                {!!sunset && (
                  <div className="info-item sun-info">
                    <SunsetIcon />
                    <span>{`Sunset: ${sunset}`}</span>
                  </div>
                )}
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
};

export default connect(mapStateToProps, mapDispatchToProps)(WeatherInfoItem);
