import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { getWeatherFunction } from "../../../constants/weather";
import { setCurrentLocation, updateLocation } from "../../../actions/weather";

import WeatherInfoItemLayout from "./laylout";
import { RootState } from "../../../reducers";
import { CurrentLocation, WeatherInfo } from "../../../reducers/weather";

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

export type LayoutSetStateArgs =
  | {
      isErrorBannerClosed: boolean;
    }
  | { isError: boolean }
  | { isPreloader: boolean }
  | {
      errorText: string;
      isInfoWeatherClosed: boolean;
    }
  | {
      isInfoWeatherClosed: boolean;
    };

class WeatherInfoItem extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isPreloader: false,
      isError: false,
      errorText: "",
      isErrorBannerClosed: true,
      isInfoWeatherClosed: true,
    };
  }

  componentDidUpdate(prevProps: Props) {
    const { isActive: isActivePrev } = prevProps;
    const { isActive } = this.props;

    if (isActive && isActivePrev !== isActive) {
      this.checkUpadate();
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

  layoutSetState = (stateObj: LayoutSetStateArgs) => {
    this.setState(stateObj as State);
  };

  render() {
    return (
      <WeatherInfoItemLayout
        {...Object.assign({}, this.props, this.state)}
        layoutSetState={this.layoutSetState}
        checkUpadate={this.checkUpadate}
      />
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return { currentId: state.weather.currentLocation.id };
};

const mapDispatchToProps = {
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