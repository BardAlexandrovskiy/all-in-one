import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect, ConnectedProps } from "react-redux";
import { Link } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Preloader from "../../components/Preloader";
import WeatherLocationItem from "./WeatherLocationItem";
import WeatherSettingsFooter from "./WeatherSettingsFooter";
import "./styles.scss";
import { RootState } from "../../reducers";

const WeatherSettingsScreen = (props: Props) => {
  const {
    currentCity,
    currentId,
    locations,
    isPreloader,
    addLocationInputFocus,
  } = props;

  return (
    <div className="weather-settings-screen screen">
      <header className="header">
        <div className="header-container container">
          <Link to="/weather" className="close-button">
            <FontAwesomeIcon icon={faArrowLeft} />
            Back to the weather
          </Link>
        </div>
      </header>
      <div
        className={`weather-settings-main custom-chrome-scroller${addLocationInputFocus && /iPhone|iPad|iPod/i.test(navigator.userAgent)
            ? " add-location-input-active"
            : ""
          }`}
      >
        <CSSTransition
          timeout={300}
          unmountOnExit
          mountOnEnter
          in={isPreloader}
        >
          <Preloader />
        </CSSTransition>
        <div className={`locations-list`}>
          <div className="container list-container">
            <WeatherLocationItem city={currentCity} id={currentId} />
            <TransitionGroup component={null}>
              {locations.map((location) => {
                const { city, id } = location;
                return (
                  <CSSTransition key={id} timeout={300}>
                    <WeatherLocationItem city={city} id={id} />
                  </CSSTransition>
                );
              })}
            </TransitionGroup>
          </div>
        </div>
      </div>
      <CSSTransition
        in={locations.length < 5}
        mountOnEnter
        unmountOnExit
        timeout={300}
      >
        <WeatherSettingsFooter />
      </CSSTransition>
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  const {
    weather: {
      currentLocation: { city: currentCity, id: currentId },
      locations,
      isShowSettingsPreloader: isPreloader,
      addLocationInputFocus,
    },
  } = state;

  return {
    currentCity,
    currentId,
    locations,
    isPreloader,
    addLocationInputFocus,
  };
};

const connector = connect(mapStateToProps);

type Props = ConnectedProps<typeof connector>;

export default connector(WeatherSettingsScreen);
