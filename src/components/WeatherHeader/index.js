import { faMapMarkerAlt, faSlidersH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./styles.scss";

// Core modules imports are same as usual
import { Controller, EffectFade, Pagination } from "swiper";
// Direct React component imports
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";

// Styles must use direct files imports
import "swiper/swiper.scss";
import "swiper/modules/pagination/pagination.scss";
import "swiper/modules/effect-fade/effect-fade.scss";
import "swiper/modules/controller/controller.scss";

class WeatherHeader extends React.Component {
  render() {
    const {
      currentCity,
      isCurrentCitySearchError,
      isActiveHeader,
      locations,
      setFirstSwiper,
      secondSwiper,
    } = this.props;

    let currentCityOutput = "";

    if (currentCity) {
      currentCityOutput = currentCity;
    } else if (!currentCity && isCurrentCitySearchError && !locations.length) {
      currentCityOutput = "City not found";
    } else if (!locations.length) {
      currentCityOutput = "Locating...";
    }

    return (
      <header className={`weather-header${isActiveHeader ? " active" : ""}`}>
        <div className="header-container container">
          <Swiper
            effect="fade"
            modules={[Controller, EffectFade, Pagination]}
            onSwiper={setFirstSwiper}
            controller={{ control: secondSwiper }}
            navigation={true}
            pagination={{
              clickable: false,
            }}
          >
            {!!currentCityOutput && (
              <SwiperSlide key={currentCity}>
                <div className="current-city city">
                  {currentCityOutput}
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                </div>
              </SwiperSlide>
            )}
            {!!locations.length &&
              locations.map((location) => {
                const { city } = location;

                return (
                  <SwiperSlide key={city}>
                    <div className="city">{city}</div>
                  </SwiperSlide>
                );
              })}
          </Swiper>
          <Link className="settings" to="/weather/settings">
            <FontAwesomeIcon icon={faSlidersH} />
          </Link>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (store) => {
  const {
    weather: {
      currentLocation: {
        city: currentCity,
        isSearchError: isCurrentCitySearchError,
      },
      isActiveHeader,
      locations,
    },
  } = store;

  return {
    currentCity,
    isCurrentCitySearchError,
    isActiveHeader,
    locations,
  };
};

export default connect(mapStateToProps, null)(WeatherHeader);
