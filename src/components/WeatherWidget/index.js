import React from "react";
import { connect } from "react-redux";
import {
  getCurrentLocationByGeo,
  setCurrentLocation,
} from "../../actions/weather";
import { isEmptyObject } from "../../constants";
import { getWeatherFunction } from "../../constants/weather";

class WeatherWidget extends React.Component {
  componentDidMount = () => {
    const { getCurrentLocationByGeo, city } = this.props;

    if (!city) {
      console.log("get city by geo");
      getCurrentLocationByGeo();
    } else {
      this.checkUpadate();
    }
  };

  checkUpadate = () => {
    console.log("check");

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
      console.log("updating start");
      getWeatherFunction(city)
        .then((result) => {
          const { weatherInfo } = result;
          console.log(weatherInfo);
          setCurrentLocation({
            weatherInfo,
            updateWeatherTime: Date.now(),
          });
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          console.log("updating end");
        });
    }
  };

  render() {
    const { weatherInfo, city } = this.props;

    const { weatherDescription, icon, temp, tempFeelsLike, id, date } =
      weatherInfo;

    return (
      <div className="weather-widget">
        <div className="info">
          {!!city && <div className="city">{city}</div>}
          {!!date && <div className="current-date">{date}</div>}
          {!!weatherDescription && (
            <div className="description">
              {weatherDescription}
              {!!icon && <img src={icon} alt="" />}
            </div>
          )}
          {!!temp && <span className="current-temp">{temp}</span>}
          {!!tempFeelsLike && (
            <div className="temp-feels-like">{`Feels like: ${tempFeelsLike}`}</div>
          )}
        </div>
      </div>
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
