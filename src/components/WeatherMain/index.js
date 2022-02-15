import React from "react";
import { connect } from "react-redux";
import WeatherInfoItem from "../WeatherInfoItem";
import "./styles.scss";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

class WeatherMain extends React.Component {
  render() {
    const {
      currentCity,
      currentId,
      currentWeatherInfo,
      currentUpdateWeatherTime,
      locations,
    } = this.props;

    return (
      <div className="weather-main">
        {(!!currentCity || !!locations.length) && (
          <Swiper slidesPerView={1} className="weather-info-list">
            {!!currentCity && (
              <SwiperSlide>
                <WeatherInfoItem
                  city={currentCity}
                  id={currentId}
                  weatherInfo={currentWeatherInfo}
                  updateWeatherTime={currentUpdateWeatherTime}
                />
              </SwiperSlide>
            )}
            {!!locations.length &&
              locations.map((location) => {
                const { city, id, updateWeatherTime, weatherInfo } = location;

                return (
                  <SwiperSlide>
                    <WeatherInfoItem
                      city={city}
                      id={id}
                      weatherInfo={weatherInfo}
                      updateWeatherTime={updateWeatherTime}
                    />
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

export default connect(mapStateToProps)(WeatherMain);
