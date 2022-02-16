import React from "react";
import { connect } from "react-redux";
import WeatherInfoItem from "../WeatherInfoItem";
import "./styles.scss";

// Core modules imports are same as usual
import { Controller } from "swiper";
// Direct React component imports
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";

// Styles must use direct files imports
import "swiper/swiper.scss"; // core Swiper
import { changeWeatherHeader } from "../../actions/weather";

class WeatherMain extends React.Component {
  handleChangeSlide = () => {
    const { changeWeatherHeader } = this.props;
    changeWeatherHeader(false);
  };

  render() {
    const {
      currentCity,
      currentId,
      currentWeatherInfo,
      currentUpdateWeatherTime,
      locations,
      setSecondSwiper,
      firstSwiper,
    } = this.props;

    return (
      <div className="weather-main">
        {(!!currentCity || !!locations.length) && (
          <Swiper
            modules={[Controller]}
            onSwiper={setSecondSwiper}
            controller={{ control: firstSwiper }}
            onSlideChange={this.handleChangeSlide}
            slidesPerView={1}
            className="weather-info-list"
          >
            {!!currentCity && (
              <SwiperSlide key={currentId}>
                {({ isActive }) => (
                  <WeatherInfoItem
                    resetScrollPosition={isActive}
                    city={currentCity}
                    id={currentId}
                    weatherInfo={currentWeatherInfo}
                    updateWeatherTime={currentUpdateWeatherTime}
                  />
                )}
              </SwiperSlide>
            )}
            {!!locations.length &&
              locations.map((location) => {
                const { city, id, updateWeatherTime, weatherInfo } = location;

                return (
                  <SwiperSlide key={id}>
                    {({ isActive }) => (
                      <WeatherInfoItem
                        resetScrollPosition={isActive}
                        city={city}
                        id={id}
                        weatherInfo={weatherInfo}
                        updateWeatherTime={updateWeatherTime}
                      />
                    )}
                  </SwiperSlide>
                );
              })}
          </Swiper>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    weather: {
      currentLocation: {
        city: currentCity,
        id: currentId,
        weatherInfo: currentWeatherInfo,
        updateWeatherTime: currentUpdateWeatherTime,
      },
      locations,
    },
  } = state;

  return {
    currentCity,
    currentId,
    currentWeatherInfo,
    currentUpdateWeatherTime,
    locations,
  };
};

const mapDispatchToProps = {
  changeWeatherHeader: (bool) => changeWeatherHeader(bool),
};

export default connect(mapStateToProps, mapDispatchToProps)(WeatherMain);
