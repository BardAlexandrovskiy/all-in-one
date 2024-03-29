import "./styles.scss";
import { getWeatherIconById } from "../../../constants/weather";
import { Forecast as ForecastType } from "../../../reducers/weather";
import errorImage from "../../../assets/images/error-image-2.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Scrollbar } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";

type Props = {
  forecast: ForecastType;
};

const Forecast = ({ forecast }: Props) => {
  const { isError, errorText, list } = forecast;
  return (
    <div className="forecast">
      {isError ? (
        <div className="forecast-error">
          <div className="error-inner">
            <img src={errorImage} alt="Error" />
            <span className="text">{errorText}</span>
          </div>
        </div>
      ) : (
        <Swiper
          scrollbar={{
            hide: false,
            draggable: true,
          }}
          spaceBetween={5}
          slidesPerView={3}
          modules={[Scrollbar, FreeMode]}
          freeMode={true}
          nested={true}
          pagination={{
            type: "progressbar",
          }}
          breakpoints={{
            768: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 5,
            },
            1200: {
              slidesPerView: 6,
              spaceBetween: 20,
            },
          }}
          className="forecast-list"
        >
          {list.map((item) => {
            const { time, date, feelsLike, temp, id, hours } = item;
            const icon = getWeatherIconById(id, +hours);

            return (
              <SwiperSlide key={`${time} ${date}`}>
                <div className="forecast-item">
                  <div className="inner">
                    <div className="date">
                      <div className="time">{time}</div>
                      <div className="day">{date}</div>
                    </div>
                    <img src={icon} className="icon" alt="Weather icon" />
                    <div className="temp">
                      <div className="actual">{temp}</div>
                      <div className="feels-like">
                        Feels<span> like</span>: {feelsLike}
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </div>
  );
};

export default Forecast;
