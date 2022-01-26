import React from "react";
import { connect } from "react-redux";
import { getWeatherFunction } from "../../constants/weather";
import "./styles.scss";

class WeatherInfoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: null,
    };
  }

  componentDidMount() {
    const { currentCity } = this.props;

    getWeatherFunction(currentCity).then((result) =>
      this.setState({ weather: result })
    );
  }

  render() {
    const { weather } = this.state;
    return (
      <div className="weather-info-item">{weather ? weather.temp : ""}</div>
    );
  }
}

export default connect(null)(WeatherInfoItem);
