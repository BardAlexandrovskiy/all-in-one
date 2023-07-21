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

import {
  getWeatherBackgroundById,
  getWeatherIconById,
} from "../../../constants/weather";
import { CSSTransition } from "react-transition-group";
import Preloader from "../../../components/Preloader";
import TextBanner from "../../../components/TextBanner";
import "./styles.scss";
import { Props as WeatherInfoProps, State as WeatherInfoState } from "./index";
import LazyLoadImage from "../../../components/LazyLoadImage";
import Forecast from "../Forecast/indes";

type Props = WeatherInfoProps &
  WeatherInfoState & {
    layoutSetState: (stateObj: Partial<WeatherInfoState>) => void;
    checkUpadate: () => Promise<void>;
    handleScrollInfoBlock: () => void;
    setInfoBlockRef: (ref: null | HTMLDivElement) => void;
    setTriggerRef: (ref: null | HTMLDivElement) => void;
    setBackgroundImageRef: (ref: null | HTMLImageElement) => void;
  };

const WeatherInfoItemLayout = (props: Props) => {
  const {
    weatherInfo,
    isPreloader,
    errorText,
    isError,
    isErrorBannerClosed,
    isInfoWeatherClosed,
    layoutSetState,
    checkUpadate,
    setInfoBlockRef,
    setTriggerRef,
    setBackgroundImageRef,
    handleScrollInfoBlock,
    forecast,
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
  } = weatherInfo || {};

  // Set background by weather id
  let backgroundImageSrc: string | undefined = undefined;
  let icon: string | undefined = undefined;

  if (typeof id === "number" && typeof time === "number") {
    backgroundImageSrc = getWeatherBackgroundById(id, time);
    icon = getWeatherIconById(id, time);
  }

  return (
    <div className={'weather-info-item'}>
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
        in={!!weatherInfo && isErrorBannerClosed && !isInfoWeatherClosed}
        timeout={300}
        mountOnEnter
        unmountOnExit
        onExited={() => {
          layoutSetState({ isErrorBannerClosed: false });
        }}
      >
        <div
          className="info custom-chrome-scroller"
          ref={setInfoBlockRef}
          onScroll={handleScrollInfoBlock}
        >
          {!!backgroundImageSrc && (
            <div className="background-image">
              <LazyLoadImage
                className="image"
                callbackRef={setBackgroundImageRef}
                src={backgroundImageSrc}
                alt="Weather background"
              />
            </div>
          )}
          <div className="trigger-wrapper" ref={setTriggerRef}>
            <div className="container info-container">
              <div className="main">
                {!!temp && <span className="current-temp">{temp}</span>}
                {!!weatherDescription && (
                  <div className="description">
                    {weatherDescription}
                    {!!icon && (
                      <div className="icon">
                        <LazyLoadImage src={icon} alt="Weather icon" />
                      </div>
                    )}
                  </div>
                )}
                {!!date && <div className="current-date">{date}</div>}
                {!!tempFeelsLike && (
                  <div className="temp-feels-like">{`Feels like: ${tempFeelsLike}`}</div>
                )}
              </div>
              <Forecast forecast={forecast} />
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

export default WeatherInfoItemLayout;
