import { useLayoutEffect, useRef } from "react";
import { isEmptyObject } from "../../../constants";
import { changeWeatherHeader } from "../../../actions/weather";
import { connect } from "react-redux";

// Weather icons
import { ReactComponent as SunriseIcon } from "../../../assets/images/weather/icons/sunrise-icon.svg";
import { ReactComponent as SunsetIcon } from "../../../assets/images/weather/icons/sunset-icon.svg";
import { ReactComponent as HumidityIcon } from "../../../assets/images/weather/icons/humidity-icon.svg";
import { ReactComponent as CloudinessIcon } from "../../../assets/images/weather/icons/cloudiness-icon.svg";
import { ReactComponent as WindSpeedIcon } from "../../../assets/images/weather/icons/wind-speed-icon.svg";
import { ReactComponent as WindDirectionIcon } from "../../../assets/images/weather/icons/wind-direction-icon.svg";
import { ReactComponent as WindGustIcon } from "../../../assets/images/weather/icons/wind-gust-icon.svg";
import { ReactComponent as VisibilityIcon } from "../../../assets/images/weather/icons/visibility-icon.svg";
import { ReactComponent as PressureIcon } from "../../../assets/images/weather/icons/pressure-icon.svg";

// Error image
import errorImage from "../../../assets/images/error-image-3.svg";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import {
  getWeatherBackgroundById,
  getWeatherIconById,
} from "../../../constants/weather";
import { CSSTransition } from "react-transition-group";
import Preloader from "../../../components/Preloader";
import TextBanner from "../../../components/TextBanner";
import LazyLoad from "react-lazy-load";
import "./styles.scss";

const WeatherInfoItemLayout = (props) => {
  const infoBlockRef = useRef();
  const triggerRef = useRef();
  let backgroundImageRef = null;

  const setBackgroundRef = (ref) => {
    if (ref && !backgroundImageRef && triggerRef) {
      gsap.registerPlugin(ScrollTrigger);
      gsap.to(ref, {
        scrollTrigger: {
          trigger: triggerRef.current,
          scrub: true,
          start: "top top",
          end: "bottom bottom",
          scroller: infoBlockRef.current,
        },
        top: "0%",
      });
    }

    backgroundImageRef = ref;
  };

  useLayoutEffect(() => {
    const { isActive } = props;
    if (!isActive && infoBlockRef.current) {
      infoBlockRef.current.scrollTop = 0;
    }

    return () => {
      const { isActiveHeader, changeWeatherHeader } = props;
      if (isActiveHeader) {
        changeWeatherHeader(false);
      }
    };
  });

  const handleScrollInfoBlock = () => {
    const { changeWeatherHeader, isActiveHeader } = props;

    const currentScrollPosition = infoBlockRef.current.scrollTop;

    if (currentScrollPosition && !isActiveHeader) {
      changeWeatherHeader(true);
    } else if (!currentScrollPosition && isActiveHeader) {
      changeWeatherHeader(false);
    }
  };

  const {
    weatherInfo,
    isActiveHeader,
    isPreloader,
    errorText,
    isError,
    isErrorBannerClosed,
    isInfoWeatherClosed,
    layoutSetState,
    checkUpadate,
  } = props;

  const {
    weatherDescription,
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
    time,
  } = weatherInfo;

  // Set background by weather id
  const backgroundImageSrc = getWeatherBackgroundById(id, time);
  const icon = getWeatherIconById(id, time);

  return (
    <div
      className={`weather-info-item${isActiveHeader ? " header-active" : ""}`}
    >
      <CSSTransition in={isPreloader} timeout={300} mountOnEnter unmountOnExit>
        <Preloader />
      </CSSTransition>
      <CSSTransition
        in={isError && isInfoWeatherClosed && !isErrorBannerClosed}
        timeout={300}
        mountOnEnter
        unmountOnExit
        onExit={() => layoutSetState({ isPreloader: true })}
        onExited={() => {
          layoutSetState({ isInfoWeatherClosed: false });
          checkUpadate();
        }}
      >
        <TextBanner
          image={errorImage}
          text={`Oops, something went wrong. ${errorText}`}
          deleteFunction={() => {
            layoutSetState({ isError: false });
          }}
        />
      </CSSTransition>
      <CSSTransition
        in={
          !isEmptyObject(weatherInfo) &&
          isErrorBannerClosed &&
          !isInfoWeatherClosed
        }
        timeout={300}
        mountOnEnter
        unmountOnExit
        onExited={() => {
          layoutSetState({ isErrorBannerClosed: false });
        }}
      >
        <div
          className="info"
          ref={infoBlockRef}
          onScroll={handleScrollInfoBlock}
        >
          <LazyLoad className="background-image">
            <img ref={setBackgroundRef} src={backgroundImageSrc} alt="" />
          </LazyLoad>
          <div className="trigger-wrapper" ref={triggerRef}>
            <div className="container info-container">
              <div className="main">
                {!!temp && <span className="current-temp">{temp}</span>}
                {!!weatherDescription && (
                  <div className="description">
                    {weatherDescription}
                    {!!icon && (
                      <LazyLoad>
                        <img src={icon} alt="" />
                      </LazyLoad>
                    )}
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
};

const mapStateToProps = (state) => {
  return { isActiveHeader: state.weather.isActiveHeader };
};

const mapDispatchToProps = {
  changeWeatherHeader: (bool) => changeWeatherHeader(bool),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WeatherInfoItemLayout);
