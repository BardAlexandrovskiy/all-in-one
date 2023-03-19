import { faMapMarkerAlt, faSlidersH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect, ConnectedProps } from "react-redux";
import { Link } from "react-router-dom";
import "./styles.scss";
import { type Swiper as SwiperRef } from "swiper";
import { useState, useEffect } from "react";

// Core modules imports are same as usual
import { Controller, EffectFade, Pagination } from "swiper";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/controller";
import { RootState } from "../../../reducers";

interface Props extends ReactProps {
  secondSwiper: SwiperRef | undefined;
  setFirstSwiper: React.Dispatch<React.SetStateAction<SwiperRef | undefined>>;
}

const WeatherHeader = (props: Props) => {
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    currentCity,
    isActiveHeader,
    locations,
    setFirstSwiper,
    secondSwiper,
    isGeoAccess,
  } = props;

  return (
    <header
      className={`weather-header${isActiveHeader ? " active" : ""}${
        isMounted ? " mounted" : ""
      }`}
    >
      <div className="header-container container">
        {!currentCity && !locations.length ? (
          <div className="current-city city no-swiper">
            {isGeoAccess ? "Not defined" : "No geo access"}
            <FontAwesomeIcon icon={faMapMarkerAlt} />
          </div>
        ) : (
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
            {!!currentCity && (
              <SwiperSlide key={currentCity}>
                <div className="current-city city">
                  <span>{currentCity}</span>
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
        )}
        <Link className="settings" to="/weather/settings">
          <FontAwesomeIcon icon={faSlidersH} />
        </Link>
      </div>
    </header>
  );
};

const mapStateToProps = (store: RootState) => {
  const {
    weather: {
      currentLocation: { city: currentCity },
      isActiveHeader,
      locations,
      isGeoAccess,
    },
  } = store;

  return {
    currentCity,
    isActiveHeader,
    locations,
    isGeoAccess,
  };
};

const connector = connect(mapStateToProps);

type ReactProps = ConnectedProps<typeof connector>;

export default connector(WeatherHeader);
