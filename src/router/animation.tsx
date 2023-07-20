import { Routes, Route, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import MainScreen from "../screens/MainScreen";
import JokesScreen from "../screens/JokesScreen";
import WeatherScreen from "../screens/WeatherScreen";
import TasksScreen from "../screens/TasksScreen";
import { connect, ConnectedProps } from "react-redux";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import WeatherSettingsScreen from "../screens/WeatherSettingsScreen";
import { RootState } from "../reducers";
import { useEffect } from "react";
import { setLastWeatherSlide } from "../actions/weather";

const RouterAnimation = ({ lastWeatherSlide, setLastWeatherSlide }: Partial<ReduxProps>) => {
    const location = useLocation();
    useEffect(() => {
        const currentLocation = location.pathname;

        if (
            (currentLocation !== "/weather" &&
                currentLocation !== "/weather/settings") &&
            lastWeatherSlide !== 0
        ) {
            if (setLastWeatherSlide) {
                setLastWeatherSlide(0);
            }
        }
    });

    return (
        <>
            <div className="screens-wrapper">
                <TransitionGroup component={null}>
                    <CSSTransition key={location.key} timeout={300}>
                        <Routes location={location}>
                            <Route path="/" element={<MainScreen />} />
                            <Route path="/fun" element={<JokesScreen />} />
                            <Route path="/weather" element={<WeatherScreen />} />
                            <Route
                                path="/weather/settings"
                                element={<WeatherSettingsScreen />}
                            />
                            <Route path="/tasks" element={<TasksScreen />} />
                        </Routes>
                    </CSSTransition>
                </TransitionGroup>
            </div>
            <Footer />
        </>
    );
};

const mapStateToProps = (store: RootState) => {
    const {
        weather: {
            lastSlide: lastWeatherSlide,
        },
    } = store;

    return {
        lastWeatherSlide,
    };
};

const mapDispatchToProps = {
    setLastWeatherSlide: (number: number) => setLastWeatherSlide(number),

};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(RouterAnimation);