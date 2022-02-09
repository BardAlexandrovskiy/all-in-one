import React from "react";
import { connect } from "react-redux";
import { getCurrentLocationByGeo } from "../../actions/weather";
import WeatherHeader from "../../components/WeatherHeader";
import WeatherMain from "../../components/WeatherMain";
import WeatherSettings from "../../components/WeatherSettings";
import "./styles.scss";

class WeatherScreen extends React.Component {
  componentDidMount() {
    const { getCurrentLocationByGeo, currentCity } = this.props;

    if (!currentCity) {
      getCurrentLocationByGeo();
    }
  }

  render() {
    return (
      <>
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
    },
  } = state;

  return {
    currentCity: currentCity,
  };
};

const mapDispatchToProps = {
  getCurrentLocationByGeo: () => getCurrentLocationByGeo(),
};

export default connect(mapStateToProps, mapDispatchToProps)(WeatherScreen);
