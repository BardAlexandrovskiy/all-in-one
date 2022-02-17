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
      isActiveHeader,
      locations,
      setFirstSwiper,
      secondSwiper,
    } = this.props;

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
            {!currentCity && !locations.length && (
              <div className="current-city city">
                Not found
                <FontAwesomeIcon icon={faMapMarkerAlt} />
              </div>
            )}
            {!!currentCity && (
              <SwiperSlide key={currentCity}>
                <div className="current-city city">
                  {currentCity}
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
      currentLocation: { city: currentCity },
      isActiveHeader,
      locations,
    },
  } = store;

  return {
    currentCity,
    isActiveHeader,
    locations,
  };
};

export default connect(mapStateToProps, null)(WeatherHeader);
