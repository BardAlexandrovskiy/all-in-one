import React from "react";
import { connect } from "react-redux";
import { CSSTransition } from "react-transition-group";
import { getWeatherFunction } from "../../constants/weather";
import Preloader from "../Preloader/imdex";
import RequestErrorBanner from "../RequestErrorBanner";
import "./styles.scss";
import { ReactComponent as SunriseIcon } from "../../assets/images/weather/sunrise-icon.svg";
import { ReactComponent as SunsetIcon } from "../../assets/images/weather/sunset-icon.svg";
import { changeWeatherHeader, setCurrentLocation } from "../../actions/weather";

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
    } = this.props;

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

    this.handleScrollInfoBlock();

    if (id === currentId) {
      if (!weatherInfo || isWeatherUpdate) {
        this.setState({ isPreloader: true });
        getWeatherFunction(city)
          .then((result) =>
            setCurrentLocation({
              weatherInfo: result,
              updateWeatherTime: Date.now(),
            })
          )
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
    const { weatherInfo } = this.props;

    const {
      weatherDescription,
      weatherIcon,
      temp,
      tempFeelsLike,
      tempMin,
      tempMax,
      humidity,
      windSpeed,
      windDeg,
      cloudiness,
      sunrise,
      sunset,
    } = weatherInfo;

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
        <CSSTransition in={isError} timeout={300} mountOnEnter unmountOnExit>
          <RequestErrorBanner
            text={`Oops, something went wrong. ${errorText}`}
          />
        </CSSTransition>
        <CSSTransition
          in={!!weatherInfo}
          timeout={300}
          mountOnEnter
          unmountOnExit
        >
          <div
            className="info"
            ref={this.infoBlockRef}
            onScroll={this.handleScrollInfoBlock}
          >
            <div className="container info-container">
              <div className="main">
                {!!temp && <span className="current-temp">{temp}</span>}
                {!!weatherDescription && (
                  <div className="description">
                    {weatherDescription}
                    {!!weatherIcon && (
                      <img alt="" src={weatherIcon} className="icon" />
                    )}
                  </div>
                )}
                <div className="bottom-side">
                  {!!tempFeelsLike && (
                    <div className="temp-feels-like">{`Feels like: ${tempFeelsLike}`}</div>
                  )}
                  {!!tempMin && !!tempMax && (
                    <div className="temp-range">{`${tempMax}/${tempMin}`}</div>
                  )}
                </div>
              </div>
              <div className="other-info">
                {!!humidity && (
                  <div className="info-item">{`Humidity: ${humidity}`}</div>
                )}
                {!!cloudiness && (
                  <div className="info-item">{`Cloudiness: ${cloudiness}`}</div>
                )}
                {!!windSpeed && (
                  <div className="info-item">{`Wind speed: ${windSpeed}`}</div>
                )}
                {!!windDeg && (
                  <div className="info-item">{`Win deg: ${windDeg}`}</div>
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
      currentLocation: { id: currentId, weatherInfo },
      isActiveHeader,
    },
  } = state;

  return {
    isActiveHeader,
    currentId,
    weatherInfo,
  };
};

const mapDispatchToProps = {
  changeWeatherHeader: (bool) => changeWeatherHeader(bool),
  setCurrentLocation: (location) => setCurrentLocation(location),
};

export default connect(mapStateToProps, mapDispatchToProps)(WeatherInfoItem);
