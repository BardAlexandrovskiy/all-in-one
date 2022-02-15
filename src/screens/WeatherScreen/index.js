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
    const { showWeatherSettings } = this.props;

    showWeatherSettings(false);
    this.checkLocations();
  }

  componentDidUpdate() {
    this.checkLocations();
  }

  checkLocations = () => {
    const { getCurrentLocationByGeo, currentCity, locations } = this.props;
    if (!currentCity && !locations.length) {
      getCurrentLocationByGeo();
    }
  };

  render() {
    const { isShowSettings } = this.props;
    return (
      <>
        <CSSTransition
          in={isShowSettings}
          timeout={300}
          unmountOnExit
          mountOnEnter
        >
          <WeatherSettings />
        </CSSTransition>
        <div className="weather-screen screen">
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
      locations,
    },
  } = state;

  return {
    currentCity: currentCity,
    isShowSettings,
    locations,
  };
};

const mapDispatchToProps = {
  getCurrentLocationByGeo: () => getCurrentLocationByGeo(),
  showWeatherSettings: (bool) => showWeatherSettings(bool),
};

export default connect(mapStateToProps, mapDispatchToProps)(WeatherScreen);
