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

// Error image
import errorImage from "../../assets/images/error-image-3.svg";

import React from "react";
import { connect } from "react-redux";
import { isEmptyObject } from "../../constants";
import {
  getWeatherBackgroundById,
  getWeatherFunction,
} from "../../constants/weather";
import { CSSTransition } from "react-transition-group";
import Preloader from "../Preloader";
import TextBanner from "../TextBanner";
import "./styles.scss";
import {
  changeWeatherHeader,
  setCurrentLocation,
  updateLocation,
} from "../../actions/weather";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

class WeatherInfoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPreloader: false,
      isError: false,
      errorText: "",
      isTransitionWeatherInfo: true,
      isTransitionError: true,
    };
    this.infoBlockRef = React.createRef();
    this.backgroundImageRef = React.createRef();
    this.triggerRef = React.createRef();
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

    gsap.registerPlugin(ScrollTrigger);
    gsap.to(this.backgroundImageRef.current, {
      scrollTrigger: {
        trigger: this.triggerRef.current,
        scrub: true,
        start: "top top",
        end: "bottom bottom",
        scroller: this.infoBlockRef.current,
      },
      top: "0%",
    });
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

          if (id === currentId) {
            setCurrentLocation({
              weatherInfo,
              updateWeatherTime: Date.now(),
            });
          } else {
            updateLocation(id, { weatherInfo, updateWeatherTime: Date.now() });
          }
        })
        .catch((error) => {
          console.log(error);
          this.setState({
            isError: true,
            errorText: `Error: ${error.message}.`,
          });
        })
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
    const {
      isPreloader,
      errorText,
      isError,
      isTransitionWeatherInfo,
      isTransitionError,
    } = this.state;
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
    const backgroundImageSrc = getWeatherBackgroundById(id);

    return (
      <div className="weather-info-item">
        <CSSTransition
          in={isPreloader}
          timeout={300}
          mountOnEnter
          unmountOnExit
        >
          <Preloader />
        </CSSTransition>
        <CSSTransition
          in={isError && isTransitionError}
          timeout={150}
          mountOnEnter
          unmountOnExit
          onEnter={() => this.setState({ isTransitionWeatherInfo: false })}
          onExited={() => this.setState({ isTransitionWeatherInfo: true })}
        >
          <TextBanner
            image={errorImage}
            text={`Oops, something went wrong. ${errorText}`}
          />
        </CSSTransition>
        <CSSTransition
          in={!isEmptyObject(weatherInfo) && isTransitionWeatherInfo}
          timeout={300}
          mountOnEnter
          unmountOnExit
          onEnter={() => this.setState({ isTransitionError: false })}
          onExited={() => this.setState({ isTransitionError: true })}
        >
          <div
            className="info"
            ref={this.infoBlockRef}
            onScroll={this.handleScrollInfoBlock}
          >
            <img
              ref={this.backgroundImageRef}
              className="background-image"
              src={backgroundImageSrc}
              alt=""
            />
            <div className="trigger-wrapper" ref={this.triggerRef}>
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
                    {!!windDeg && (
                      <div className="inner">
                        <WindDirectionIcon />
                        {`Wind direction: ${windDeg}`}
                      </div>
                    )}
                    {!!windGust && (
                      <div className="inner long">
                        <WindGustIcon />
                        {`Wind gust: ${windGust}`}
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
