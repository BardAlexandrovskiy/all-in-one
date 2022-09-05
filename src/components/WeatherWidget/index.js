const WeatherWidget = ({ getCurrentLocationByGeo, currentCity }) => {
  useEffect(() => {
    if (!currentCity) {
      getCurrentLocationByGeo();
    }
  });

  return (
    <div className="weather-widget">
      <div className="info"></div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const {
    weather: {
      currentLocation: { city: currentCity, weatherInfo, updateWeatherTime },
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

export default connect(mapStateToProps, mapDispatchToProps)(WeatherWidget);
