import React from "react";
import { connect } from "react-redux";
import { isEmptyObject } from "../../../constants";
import { getWeatherFunction } from "../../../constants/weather";
import { setCurrentLocation, updateLocation } from "../../../actions/weather";

import WeatherInfoItemLayout from "./laylout";

class WeatherInfoItem extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isPreloader: false,
      isError: false,
      errorText: "",
      isErrorBannerClosed: true,
      isInfoWeatherClosed: true,
    };
  }

  componentDidUpdate(prevProps) {
    const { isActive: isActivePrev } = prevProps;
    const { isActive } = this.props;

    if (isActive && isActivePrev !== isActive) {
      this.checkUpadate();
    }
  }

  checkUpadate = async () => {
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

      try {
        const result = await getWeatherFunction(city);
        const { weatherInfo } = result;
        this.setState({
          isInfoWeatherClosed: false,
          isErrorBannerClosed: true,
          isError: false,
          errorText: "",
        });

        if (id === currentId) {
          setCurrentLocation({
            weatherInfo,
            updateWeatherTime: Date.now(),
          });
        } else {
          updateLocation(id, { weatherInfo, updateWeatherTime: Date.now() });
        }
      } catch (error) {
        this.setState({
          isError: true,
          errorText: `Error: ${error.message}.`,
          isErrorBannerClosed: false,
          isInfoWeatherClosed: true,
        });
      }

      this.setState({ isPreloader: false });
    } else {
      this.setState({ isInfoWeatherClosed: false });
    }
  };

  layoutSetState = (stateObj) => {
    this.setState(stateObj);
  };

  render() {
    return (
      <WeatherInfoItemLayout
        {...Object.assign({}, this.props, this.state)}
        layoutSetState={this.layoutSetState}
        checkUpadate={this.checkUpadate}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return { currentId: state.weather.currentLocation.id };
};

const mapDispatchToProps = {
  setCurrentLocation: (location) => setCurrentLocation(location),
  updateLocation: (id, info) => updateLocation(id, info),
};

export default connect(mapStateToProps, mapDispatchToProps)(WeatherInfoItem);
