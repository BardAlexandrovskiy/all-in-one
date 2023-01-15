import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { connect } from "react-redux";
import { CSSTransition } from "react-transition-group";
import {
  addNewLocation,
  setAddLocationInputFocus,
  showWeatherSettingsPreloader,
} from "../../actions/weather";
import { getWeatherFunction } from "../../constants/weather";
import TextBanner from "../TextBanner";
import "./styles.scss";
import errorImage from "../../assets/images/error-image-3.svg";

class WeatherSettingsFooter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      redInputBorder: false,
      isError: false,
      errorText: "",
    };
    this.inputRef = React.createRef();
  }

  handleChangeInput = (e) => {
    const value = e.target.value.replace(/\s+/g, " ").trimLeft();

    if (value.length <= 140) {
      this.setState({ inputValue: value });
    }
  };

  handlePressInput = (e) => {
    if (e.key === "Enter") {
      this.handleClickButton();
    }
  };

  componentWillUnmount = () => {
    const { setAddLocationInputFocus } = this.props;
    setAddLocationInputFocus(false);
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
        .catch((error) => {
          this.setState({ isError: true });
          this.inputRef.current.blur();
          if (error.message === "404") {
            this.setState({ errorText: "City not found." });
          } else {
            this.setState({ errorText: `Error: ${error.message}.` });
          }
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
    const { setAddLocationInputFocus } = this.props;
    setAddLocationInputFocus(false);
    this.setState({ redInputBorder: false });
  };

  handleFocusInput = () => {
    const { setAddLocationInputFocus } = this.props;
    setAddLocationInputFocus(true);
  };

  render() {
    const { inputValue, redInputBorder, isError, errorText } = this.state;

    return (
      <>
        <CSSTransition in={!!isError} timeout={300} mountOnEnter unmountOnExit>
          <TextBanner
            image={errorImage}
            text={errorText}
            deleteFuncion={() =>
              this.setState({ isError: false, textError: "" })
            }
          />
        </CSSTransition>
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
                onFocus={this.handleFocusInput}
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
      </>
    );
  }
}

const mapDispatchToProps = {
  addNewLocation: (location) => addNewLocation(location),
  showPreloader: (bool) => showWeatherSettingsPreloader(bool),
  setAddLocationInputFocus: (bool) => setAddLocationInputFocus(bool),
};

export default connect(null, mapDispatchToProps)(WeatherSettingsFooter);
