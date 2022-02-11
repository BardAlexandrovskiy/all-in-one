import React from "react";
import { connect } from "react-redux";
import { CSSTransition } from "react-transition-group";
import {
  getCurrentLocationByGeo,
  showWeatherSettings,
} from "../../actions/weather";
import WeatherHeader from "../../components/WeatherHeader";
import WeatherMain from "../../components/WeatherMain";
import WeatherSettings from "../../components/WeatherSettings";
import "./styles.scss";

class WeatherScreen extends React.Component {
  componentDidMount() {
    const { getCurrentLocationByGeo, currentCity, showWeatherSettings } =
      this.props;

    showWeatherSettings(false);

    if (!currentCity) {
      getCurrentLocationByGeo();
    }
  }

  render() {
    const { isShowSettings } = this.props;
    return (
      <>
        <div className="weather-screen screen">
          <CSSTransition
            in={isShowSettings}
            timeout={300}
            unmountOnExit
            mountOnEnter
          >
            <WeatherSettings />
          </CSSTransition>
          <WeatherHeader />
          <WeatherMain />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    weather: {
      currentLocation: { city: currentCity },
      isShowSettings,
    },
  } = state;

  return {
    currentCity: currentCity,
    isShowSettings,
  };
};

const mapDispatchToProps = {
  getCurrentLocationByGeo: () => getCurrentLocationByGeo(),
  showWeatherSettings: (bool) => showWeatherSettings(bool),
};

export default connect(mapStateToProps, mapDispatchToProps)(WeatherScreen);
