import React from "react";
import { connect } from "react-redux";
import { CSSTransition } from "react-transition-group";
import { getWeatherFunction } from "../../constants/weather";
import Preloader from "../Preloader/imdex";
import RequestErrorBanner from "../RequestErrorBanner";
import "./styles.scss";
import { ReactComponent as SunriseIcon } from "../../assets/images/weather/sunrise-icon.svg";
import { ReactComponent as SunsetIcon } from "../../assets/images/weather/sunset-icon.svg";

class WeatherInfoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: {
        weatherDescription: "",
        weatherIcon: "",
        temp: "",
        tempFeelsLike: "",
        tempMin: "",
        tempMax: "",
        humidity: "",
        windSpeed: "",
        windDeg: "",
        cloudiness: "",
        sunrise: "",
        sunset: "",
      },
      isPreloader: false,
      isError: false,
      errorText: "",
    };
  }

  componentDidMount() {
    const { currentCity } = this.props;

    if (currentCity) {
      this.setState({ isPreloader: true });
      getWeatherFunction(currentCity)
        .then((result) => this.setState({ weather: result }))
        .catch((error) =>
          this.setState({
            isError: true,
            errorText: `Error: ${error.message}.`,
          })
        )
        .finally(() => this.setState({ isPreloader: false }));
    }
  }

  render() {
    const { isPreloader, errorText, isError, weather } = this.state;

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
    } = this.state.weather;

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
        <CSSTransition in={!!weather} timeout={300} mountOnEnter unmountOnExit>
          <div className="info">
            <div className="container info-container">
              <div className="main">
                <div className="top-side">
                  {!!temp && <span className="temp">{temp}</span>}
                  {!!weatherIcon && (
                    <img alt="" src={weatherIcon} className="icon" />
                  )}
                  {!!weatherDescription && (
                    <div className="description">{weatherDescription}</div>
                  )}
                </div>
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
                  <div className="info-item">{`humidity: ${humidity}`}</div>
                )}
                {!!cloudiness && (
                  <div className="info-item">{`cloudiness: ${cloudiness}`}</div>
                )}
                {!!windSpeed && (
                  <div className="info-item">{`wind speed: ${windSpeed}`}</div>
                )}
                {!!windDeg && (
                  <div className="info-item">{`win deg: ${windDeg}`}</div>
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

export default connect(null)(WeatherInfoItem);
