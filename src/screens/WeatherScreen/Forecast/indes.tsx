import "./styles.scss";
import { getWeatherIconById } from "../../../constants/weather";
import { Forecast as ForecastType } from "../../../reducers/weather";

type Props = {
  forecast: ForecastType;
};

const Forecast = ({ forecast }: Props) => {
  const { isError, errorText, list } = forecast;
  return (
    <div className="forecast">
      <div className="forecast-list">
        {list.map((item) => {
          const { time, date, feelsLike, temp, id, hours } = item;
          const icon = getWeatherIconById(id, +hours);

          return (
            <div key={time} className="forecast-item">
              <div className="data">
                <div className="time">{time}</div>
                <div className="date">{date}</div>
                <img src={icon} className="icon" alt="Weather icon" />
                <div className="temp">
                  <div className="feels-like">{feelsLike}</div>
                  <div className="actual">{temp}</div>
                </div>
              </div>
              <div></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Forecast;
