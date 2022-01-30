import React from "react";
import { connect } from "react-redux";
import { CSSTransition } from "react-transition-group";
import { getWeatherFunction } from "../../constants/weather";
import Preloader from "../Preloader/imdex";
import RequestErrorBanner from "../RequestErrorBanner";
import "./styles.scss";

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
        cityName: "",
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
      cityName,
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
                {!!temp && <span className="temp">{temp}</span>}
                {!!weatherIcon && (
                  <img alt="" src={weatherIcon} className="icon" />
                )}
                {!!weatherDescription && (
                  <div className="description">{weatherDescription}</div>
                )}
                {!!tempFeelsLike && (
                  <div className="temp-feels-like">{`Feels like: ${tempFeelsLike}`}</div>
                )}
                {/* <div className="temp-range"></div> */}
              </div>
            </div>
          </div>
        </CSSTransition>
      </div>
    );
  }
}

export default connect(null)(WeatherInfoItem);
