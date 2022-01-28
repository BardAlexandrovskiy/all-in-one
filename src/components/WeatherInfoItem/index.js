import React from "react";
import { connect } from "react-redux";
import { CSSTransition } from "react-transition-group";
import { getWeatherFunction } from "../../constants/weather";
import Preloader from "../Preloader/imdex";
import RequestErrorBanner from "../RequestErrorBanner";
import "./styles.scss";

class WeatherInfoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: null,
      isPreloader: false,
      isError: false,
      errorText: "",
    };
  }

  componentDidMount() {
    const { currentCity } = this.props;

    if (currentCity) {
      this.setState({ isPreloader: true });
      getWeatherFunction(null)
        .then((result) => this.setState({ weather: result }))
        .catch((error) =>
          this.setState({
            isError: true,
            errorText: `Error: ${error.message}.`,
          })
        )
        .finally(() => this.setState({ isPreloader: false }));
    }
  }

  render() {
    const { isPreloader, errorText, isError } = this.state;

    console.log(this.state);
    return (
      <div className="weather-info-item">
        <CSSTransition
          in={isPreloader}
          timeout={300}
          mountOnEnter
          unmountOnExit
        >
          <Preloader />
        </CSSTransition>
        <CSSTransition in={isError} timeout={300} mountOnEnter unmountOnExit>
          <RequestErrorBanner
            text={`Oops, something went wrong. ${errorText}`}
          />
        </CSSTransition>
      </div>
    );
  }
}

export default connect(null)(WeatherInfoItem);
