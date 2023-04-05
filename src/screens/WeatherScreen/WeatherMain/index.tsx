import { connect, ConnectedProps } from "react-redux";
import WeatherInfoItem from "../WeatherInfoItem";
import "./styles.scss";
import { type Swiper as SwiperRef } from "swiper";

// Core modules imports are same as usual
import { Controller } from "swiper";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";

import {
  changeWeatherHeader,
  setLastWeatherSlide,
} from "../../../actions/weather";
import TextBanner from "../../../components/TextBanner";

// Error image
import errorImage from "../../../assets/images/error-image-3.svg";
import { RootState } from "../../../reducers";
import { CSSTransition } from "react-transition-group";
import Preloader from "../../../components/Preloader";

interface Props extends ReduxProps {
  firstSwiper: SwiperRef | undefined;
  setSecondSwiper: React.Dispatch<React.SetStateAction<SwiperRef | undefined>>;
}

const WeatherMain = (props: Props) => {
  const handleChangeSlide = (swiper: SwiperRef) => {
    const { changeWeatherHeader, setLastWeatherSlide } = props;
    setLastWeatherSlide(swiper.activeIndex);
    changeWeatherHeader(false);
  };

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
    currentForecast,
  } = props;

  return (
    <div className="weather-main">
      {(!!currentCity || !!locations.length) && (
        <Swiper
          modules={[Controller]}
          onSwiper={setSecondSwiper}
          controller={{ control: firstSwiper }}
          onSlideChange={handleChangeSlide}
          slidesPerView={1}
          grabCursor={true}
          className="weather-info-list"
        >
          {!!currentCity && (
            <SwiperSlide key={currentId}>
              {({ isActive }) => (
                <WeatherInfoItem
                  isActive={isActive}
                  city={currentCity}
                  id={currentId}
                  forecast={currentForecast}
                  weatherInfo={currentWeatherInfo}
                  updateWeatherTime={currentUpdateWeatherTime}
                />
              )}
            </SwiperSlide>
          )}
          {!!locations.length &&
            locations.map((location) => {
              const { city, id, updateWeatherTime, weatherInfo, forecast } =
                location;

              return (
                <SwiperSlide key={id}>
                  {({ isActive }) => (
                    <WeatherInfoItem
                      isActive={isActive}
                      city={city}
                      id={id}
                      forecast={forecast}
                      weatherInfo={weatherInfo}
                      updateWeatherTime={updateWeatherTime}
                    />
                  )}
                </SwiperSlide>
              );
            })}
        </Swiper>
      )}
      <CSSTransition
        in={isShowCurrentLocationPreloader}
        timeout={300}
        mountOnEnter
        unmountOnExit
      >
        <Preloader />
      </CSSTransition>
      {!locations.length && !currentCity && !isShowCurrentLocationPreloader && (
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
};

const mapStateToProps = (state: RootState) => {
  const {
    weather: {
      currentLocation: {
        city: currentCity,
        id: currentId,
        weatherInfo: currentWeatherInfo,
        updateWeatherTime: currentUpdateWeatherTime,
        forecast: currentForecast,
      },
      isGeoAccess,
      locations,
      isShowCurrentLocationPreloader,
      initialSlide,
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
    currentForecast,
  };
};

const mapDispatchToProps = {
  changeWeatherHeader: (bool: boolean) => changeWeatherHeader(bool),
  setLastWeatherSlide: (number: number) => setLastWeatherSlide(number),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(WeatherMain);
