import "./styles.scss";
import moment from "moment";
import HolidaysWidget from "./HolidaysWidget";
import WeatherWidget from "./WeatherWidget";
import TasksWidget from "./TasksWidget";
import JokesWidget from "./JokesWidget";
import { useState, useEffect } from "react";

// Images
import eveningImage from "../../assets/images/home/evening.webp";
import dayImage from "../../assets/images/home/day.webp";
import nightImage from "../../assets/images/home/night.webp";
import morningImage from "../../assets/images/home/morning.webp";
import LazyLoadImage from "../../components/LazyLoadImage";

const MainScreen = () => {
  const currentTimeHours = +moment().format("H");
  let helloMessage = "";
  let backgroundImage = null;

  switch (true) {
    case currentTimeHours < 6:
      helloMessage = "Good night";
      backgroundImage = nightImage;
      break;
    case currentTimeHours < 12:
      helloMessage = "Good morning";
      backgroundImage = morningImage;
      break;
    case currentTimeHours < 18:
      helloMessage = "Have a nice day";
      backgroundImage = dayImage;
      break;
    default:
      helloMessage = "Have a good evening";
      backgroundImage = eveningImage;
  }

  const [isWidgetsActive, setWidgetsActive] = useState(false);

  useEffect(() => {
    setWidgetsActive(true);
  }, []);

  return (
    <div className="main-screen screen">
      <div className="wrapper">
        <div className="background">
          <LazyLoadImage src={backgroundImage} alt="Weather background" />
        </div>
        <div className="scroll-container custom-chrome-scroller">
          <div className="inner">
            <div
              className={`container widgets-container${isWidgetsActive ? " active-widgets" : ""
                }`}
            >
              <div className="hello-message-widget">
                <h1>{helloMessage}</h1>
              </div>
              <WeatherWidget />
              <HolidaysWidget />
              <TasksWidget />
              <JokesWidget />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainScreen;
