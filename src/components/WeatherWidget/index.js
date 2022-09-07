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
} from "../../constants/weather";
import "./styles.scss";

class WeatherWidget extends React.Component {
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
      getWeatherFunction(city)
        .then((result) => {
          const { weatherInfo } = result;

          setCurrentLocation({
            weatherInfo,
            updateWeatherTime: Date.now(),
          });
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {});
    }
  };

  render() {
    const { weatherInfo, city } = this.props;

    const { icon, temp, id, date } = weatherInfo;

    const backgroundImage = getWeatherBackgroundById(id);

    return (
      <Link to="/weather" className="weather-widget">
        <img className="background" src={backgroundImage} alt="" />
        <div className="info">
          {!!city && <h2 className="city">{city}</h2>}
          {!!temp && <span className="current-temp">{temp}</span>}
          {!!icon && <img src={icon} alt="" />}
          {!!date && <div className="current-date">{date}</div>}
        </div>
      </Link>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    weather: {
      currentLocation: { city, weatherInfo, updateWeatherTime },
    },
  } = state;

  return {
    city,
    weatherInfo,
    updateWeatherTime,
  };
};

const mapDispatchToProps = {
  getCurrentLocationByGeo: () => getCurrentLocationByGeo(),
  setCurrentLocation: (location) => setCurrentLocation(location),
};

export default connect(mapStateToProps, mapDispatchToProps)(WeatherWidget);
