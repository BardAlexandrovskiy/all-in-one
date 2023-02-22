import { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { getCurrentLocationByGeo } from "../../actions/weather";
import WeatherHeader from "./WeatherHeader";
import WeatherMain from "./WeatherMain";
import "./styles.scss";
import { RootState } from "../../reducers";
import { type Swiper as SwiperRef } from "swiper";

const WeatherScreen = ({
  getCurrentLocationByGeo,
  currentCity,
  locations,
}: Props) => {
  useEffect(() => {
    if (!currentCity && !locations.length) {
      getCurrentLocationByGeo();
    }
  }, [getCurrentLocationByGeo, currentCity, locations]);

  const [firstSwiper, setFirstSwiper] = useState<SwiperRef>();
  const [secondSwiper, setSecondSwiper] = useState<SwiperRef>();

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

const mapStateToProps = (state: RootState) => {
  const {
    weather: {
      currentLocation: { city: currentCity },
      locations,
    },
  } = state;

  return {
    currentCity: currentCity,
    locations,
  };
};

const mapDispatchToProps = {
  getCurrentLocationByGeo: () => getCurrentLocationByGeo(),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export default connector(WeatherScreen);
