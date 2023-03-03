import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { CSSTransition } from "react-transition-group";
import {
  addNewLocation,
  setAddLocationInputFocus,
  showWeatherSettingsPreloader,
} from "../../../actions/weather";
import { getWeatherFunction } from "../../../constants/weather";
import TextBanner from "../../../components/TextBanner";
import "./styles.scss";
import errorImage from "../../../assets/images/error-image-3.svg";
import { Location } from "../../../reducers/weather";

type State = {
  inputValue: string;
  redInputBorder: boolean;
  isError: boolean;
  errorText: string;
};

class WeatherSettingsFooter extends React.PureComponent<Props, State> {
  private inputRef: React.RefObject<HTMLInputElement>;

  constructor(props: Props) {
    super(props);
    this.state = {
      inputValue: "",
      redInputBorder: false,
      isError: false,
      errorText: "",
    };
    this.inputRef = React.createRef();
  }

  handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s+/g, " ").trimStart();

    if (value.length <= 140) {
      this.setState({ inputValue: value });
    }
  };

  handlePressInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      this.handleClickButton();
    }
  };

  componentWillUnmount = () => {
    const { setAddLocationInputFocus } = this.props;
    setAddLocationInputFocus(false);
  };

  handleClickButton = async () => {
    const { inputValue } = this.state;
    const { addNewLocation, showPreloader } = this.props;

    const cityName = inputValue;

    if (inputValue.length && inputValue.trim()) {
      this.setState({ redInputBorder: false });
      showPreloader(true);

      try {
        const response = await getWeatherFunction(cityName);
        if (response) {
          const { weatherInfo, cityName } = response;
          if (cityName) {
            addNewLocation({
              city: cityName,
              weatherInfo,
              id: Date.now(),
              updateWeatherTime: Date.now(),
            });
          }
        }
      } catch (error) {
        this.setState({ isError: true });
        if (error instanceof Error) {
          if (error.message === "404") {
            this.setState({ errorText: "City not found." });
          } else {
            this.setState({ errorText: `Error: ${error.message}.` });
          }
        }
      }
      showPreloader(false);
      this.setState({ inputValue: "" });
    } else {
      this.setState({ redInputBorder: true });
    }

    if (this.inputRef.current) {
      this.inputRef.current.blur();
    }
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
            deleteFunction={() =>
              this.setState({ isError: false, errorText: "" })
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
                onKeyDown={this.handlePressInput}
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
  addNewLocation: (location: Location) => addNewLocation(location),
  showPreloader: (bool: boolean) => showWeatherSettingsPreloader(bool),
  setAddLocationInputFocus: (bool: boolean) => setAddLocationInputFocus(bool),
};

const connector = connect(null, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export default connector(WeatherSettingsFooter);
