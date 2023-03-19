import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { getWeatherFunction } from "../../../constants/weather";
import {
  changeWeatherHeader,
  setCurrentLocation,
  updateLocation,
} from "../../../actions/weather";

import WeatherInfoItemLayout from "./laylout";
import { RootState } from "../../../reducers";
import { CurrentLocation, WeatherInfo } from "../../../reducers/weather";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export type Props = ReduxProps & {
  isActive: boolean;
  city: string;
  id?: number;
  weatherInfo?: WeatherInfo;
  updateWeatherTime?: number;
};

export type State = {
  isPreloader: boolean;
  isError: boolean;
  errorText: string;
  isErrorBannerClosed: boolean;
  isInfoWeatherClosed: boolean;
};

class WeatherInfoItem extends React.PureComponent<Props, State> {
  private infoBlockRef: null | HTMLDivElement;
  private triggerRef: null | HTMLDivElement;
  private backgroundImageRef: null | HTMLImageElement;
  private setInfoBlockRef: (ref: null | HTMLDivElement) => void;
  private setTriggerRef: (ref: null | HTMLDivElement) => void;
  private setBackgroundImageRef: (ref: null | HTMLImageElement) => void;

  constructor(props: Props) {
    super(props);
    this.state = {
      isPreloader: false,
      isError: false,
      errorText: "",
      isErrorBannerClosed: true,
      isInfoWeatherClosed: true,
    };
    this.infoBlockRef = null;
    this.triggerRef = null;
    this.backgroundImageRef = null;
    this.setInfoBlockRef = (ref) => {
      if (ref && !this.infoBlockRef) {
        gsap.registerPlugin(ScrollTrigger);
        gsap.to(this.backgroundImageRef, {
          scrollTrigger: {
            trigger: this.triggerRef,
            scrub: true,
            start: "top top",
            end: "bottom bottom",
            scroller: ref,
          },
          top: "0%",
        });
      }
      this.infoBlockRef = ref;
    };
    this.setTriggerRef = (ref) => {
      this.triggerRef = ref;
    };
    this.setBackgroundImageRef = (ref) => {
      this.backgroundImageRef = ref;
    };
  }

  componentWillUnmount = () => {
    ScrollTrigger.getAll().forEach((trigger) => {
      const currentTrigger = trigger.vars.trigger;

      if (this.triggerRef === currentTrigger) {
        trigger.kill();
      }
    });

    const { isActiveHeader, changeWeatherHeader } = this.props;
    if (isActiveHeader) {
      changeWeatherHeader(false);
    }
  };

  handleScrollInfoBlock = () => {
    const { changeWeatherHeader, isActiveHeader } = this.props;
    const infoBlock = this.infoBlockRef;

    if (infoBlock) {
      const currentScrollPosition = infoBlock.scrollTop;

      if (currentScrollPosition && !isActiveHeader) {
        changeWeatherHeader(true);
      } else if (!currentScrollPosition && isActiveHeader) {
        changeWeatherHeader(false);
      }
    }
  };

  componentDidUpdate(prevProps: Props) {
    const { isActive: isActivePrev } = prevProps;
    const { isActive } = this.props;
    const infoBlock = this.infoBlockRef;

    if (isActive && isActivePrev !== isActive) {
      this.checkUpadate();
    }

    if (!isActive && infoBlock) {
      infoBlock.scrollTop = 0;
    }
  }

  checkUpadate = async () => {
    const {
      city,
      currentId,
      id,
      weatherInfo,
      updateWeatherTime,
      setCurrentLocation,
      updateLocation,
    } = this.props;

    let isWeatherUpdate = false;

    if (updateWeatherTime) {
      const minutes = +((Date.now() - updateWeatherTime) / (1000 * 60)).toFixed(
        1
      );

      if (minutes > 5) {
        isWeatherUpdate = true;
      }
    } else {
      isWeatherUpdate = true;
    }

    if (!weatherInfo || isWeatherUpdate) {
      this.setState({ isPreloader: true });

      try {
        const result = await getWeatherFunction(city);
        if (result) {
          const { weatherInfo } = result;

          this.setState({
            isInfoWeatherClosed: false,
            isErrorBannerClosed: true,
            isError: false,
            errorText: "",
          });

          if (id === currentId) {
            setCurrentLocation({
              weatherInfo,
              updateWeatherTime: Date.now(),
            });
          } else if (id) {
            updateLocation(id, { weatherInfo, updateWeatherTime: Date.now() });
          }
        }
      } catch (error) {
        this.setState({
          isError: true,
          isErrorBannerClosed: false,
          isInfoWeatherClosed: true,
          errorText:
            error instanceof Error
              ? `Error: ${error.message}.`
              : `Error: unexpected error.`,
        });
      }

      this.setState({ isPreloader: false });
    } else {
      this.setState({ isInfoWeatherClosed: false });
    }
  };

  layoutSetState = (stateObj: Partial<State>) => {
    this.setState(stateObj as State);
  };

  render() {
    return (
      <WeatherInfoItemLayout
        setInfoBlockRef={this.setInfoBlockRef}
        setBackgroundImageRef={this.setBackgroundImageRef}
        setTriggerRef={this.setTriggerRef}
        {...Object.assign({}, this.props, this.state)}
        layoutSetState={this.layoutSetState}
        checkUpadate={this.checkUpadate}
        handleScrollInfoBlock={this.handleScrollInfoBlock}
      />
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {
    isActiveHeader,
    currentLocation: { id: currentId },
  } = state.weather;

  return { isActiveHeader, currentId };
};

const mapDispatchToProps = {
  changeWeatherHeader: (bool: boolean) => changeWeatherHeader(bool),
  setCurrentLocation: (location: CurrentLocation) =>
    setCurrentLocation(location),
  updateLocation: (
    id: number,
    info: { weatherInfo: WeatherInfo | undefined; updateWeatherTime: number }
  ) => updateLocation(id, info),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(WeatherInfoItem);
