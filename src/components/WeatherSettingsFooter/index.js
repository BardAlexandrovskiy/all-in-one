import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { connect } from "react-redux";
import { CSSTransition } from "react-transition-group";
import {
  addNewLocation,
  showWeatherSettingsPreloader,
} from "../../actions/weather";
import { getWeatherFunction } from "../../constants/weather";
import "./styles.scss";

class WeatherSettingsFooter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      redInputBorder: false,
    };
    this.inputRef = React.createRef();
  }

  handleChangeInput = (e) => {
    const value = e.target.value;

    if (value.length <= 140) {
      this.setState({ inputValue: value });
    }
  };

  handlePressInput = (e) => {
    if (e.key === "Enter") {
      this.handleClickButton();
    }
  };

  handleClickButton = () => {
    const { inputValue } = this.state;
    const { addNewLocation, showPreloader } = this.props;

    const cityName = inputValue;

    if (inputValue.length && inputValue.trim()) {
      this.setState({ redInputBorder: false });
      showPreloader(true);
      getWeatherFunction(cityName)
        .then((location) => {
          const { weatherInfo, cityName } = location;
          addNewLocation({
            city: cityName,
            weatherInfo,
            id: Date.now(),
            updateWeatherTime: Date.now(),
          });
        })
        .catch(() => {
          this.setState({ redInputBorder: true });
        })
        .finally(() => {
          showPreloader(false);
          this.setState({ inputValue: "", isPreloader: false });
        });
    } else {
      this.setState({ redInputBorder: true });
    }

    this.inputRef.current.focus();
  };

  handleBlurInput = () => {
    this.setState({ redInputBorder: false });
  };

  render() {
    const { inputValue, redInputBorder } = this.state;

    return (
      <div className="add-location-input">
        <div className="container input-container">
          <div className={`input-wrapper${redInputBorder ? " red" : ""}`}>
            <input
              ref={this.inputRef}
              type="text"
              placeholder="Add location"
              onChange={this.handleChangeInput}
              onKeyPress={this.handlePressInput}
              value={inputValue}
              onBlur={this.handleBlurInput}
            />
            <CSSTransition
              in={!!inputValue}
              timeout={300}
              unmountOnExit
              mountOnEnter
            >
              <button className="button" onClick={this.handleClickButton}>
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </CSSTransition>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  addNewLocation: (location) => addNewLocation(location),
  showPreloader: (bool) => showWeatherSettingsPreloader(bool),
};

export default connect(null, mapDispatchToProps)(WeatherSettingsFooter);
