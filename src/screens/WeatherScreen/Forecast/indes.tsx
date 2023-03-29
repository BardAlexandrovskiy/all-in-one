import "./styles.scss";
import { useState } from "react";
import { CSSTransition } from "react-transition-group";
import moment from "moment";
import { getWeatherIconById } from "../../../constants/weather";

const Forecast = () => {
  return (
    <div className="forecast">
      {/* <CSSTransition
        in={!forecastList.length}
        mountOnEnter
        unmountOnExit
        timeout={300}
      >
        <button
          onClick={handleClickLoadButton}
          className="load-forecast-button"
        >
          {!isError ? "View the forecast" : "Try to get it again"}
        </button>
      </CSSTransition>
      <CSSTransition
        in={!!forecastList.length}
        mountOnEnter
        unmountOnExit
        timeout={300}
      >
        <div className="forecast-list">
          {forecastList.map((item) => {
            const {
              dt: time,
              main: { feels_like: feelsLike, temp },
              weather: [{ id }],
            } = item;

            const formatTime = moment(time * 1000).format("HH:mm");
            const formatDate = moment(time * 1000).format("MMMM Do");
            const formatTimeHours = +moment(time + 1000).format("H");
            const weatherIcon = getWeatherIconById(id, formatTimeHours);

            console.log(feelsLike, temp);

            return (
              <div key={time} className="forecast-item">
                <div className="data">
                  <div className="time">{formatTime}</div>
                  <div className="date">{formatDate}</div>
                  <img src={weatherIcon} className="icon" alt="Weather icon" />
                  <div></div>
                </div>
                <div></div>
              </div>
            );
          })}
        </div>
      </CSSTransition> */}
    </div>
  );
};

export default Forecast;
