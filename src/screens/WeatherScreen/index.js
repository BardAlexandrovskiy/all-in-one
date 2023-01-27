import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getCurrentLocationByGeo } from "../../actions/weather";
import WeatherHeader from "../../components/WeatherHeader";
import WeatherMain from "../../components/WeatherMain";
import "./styles.scss";

const WeatherScreen = ({ getCurrentLocationByGeo, currentCity, locations }) => {
  useEffect(() => {
    if (!currentCity && !locations.length) {
      getCurrentLocationByGeo();
    }
  }, [getCurrentLocationByGeo, currentCity, locations]);

  const [firstSwiper, setFirstSwiper] = useState(null);
  const [secondSwiper, setSecondSwiper] = useState(null);

  return (
    <>
      <div className="weather-screen screen">
        <WeatherHeader
          setFirstSwiper={setFirstSwiper}
          secondSwiper={secondSwiper}
        />
        <WeatherMain
          setSecondSwiper={setSecondSwiper}
          firstSwiper={firstSwiper}
        />
      </div>
    </>
  );
};

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
};

export default connect(mapStateToProps, mapDispatchToProps)(WeatherScreen);
