import React from "react";
import { connect } from "react-redux";
import WeatherInfoItem from "../WeatherInfoItem";
import "./styles.scss";

// Core modules imports are same as usual
import { Controller } from "swiper";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";

import { changeWeatherHeader } from "../../actions/weather";
import TextBanner from "../TextBanner";

// Error image
import errorImage from "../../assets/images/error-image-3.svg";

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
      isGeoAccess,
      isShowCurrentLocationPreloader,
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
                    isActive={isActive}
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
                        isActive={isActive}
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
        {!locations.length &&
          !currentCity &&
          !isShowCurrentLocationPreloader && (
            <TextBanner
              image={errorImage}
              text={
                !isGeoAccess
                  ? "No access to geolocation. Turn on geolocation and reload the page or add the desired location In the location settings."
                  : "Oops, something went wrong. Try again later."
              }
            />
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
      isGeoAccess,
      locations,
      isShowCurrentLocationPreloader,
    },
  } = state;

  return {
    currentCity,
    currentId,
    currentWeatherInfo,
    currentUpdateWeatherTime,
    locations,
    isGeoAccess,
    isShowCurrentLocationPreloader,
  };
};

const mapDispatchToProps = {
  changeWeatherHeader: (bool) => changeWeatherHeader(bool),
};

export default connect(mapStateToProps, mapDispatchToProps)(WeatherMain);
