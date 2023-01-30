import "./styles.scss";
import moment from "moment";
import HolidaysWidget from "./HolidaysWidget";
import WeatherWidget from "./WeatherWidget";
import TasksWidget from "./TasksWidget";
import JokesWidget from "./JokesWidget";

import LazyLoad from "react-lazy-load";

// Images
import eveningImage from "../../assets/images/home/evening.jpg";
import dayImage from "../../assets/images/home/day.jpg";
import nightImage from "../../assets/images/home/night.jpg";
import morningImage from "../../assets/images/home/morning.jpg";

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

  return (
    <div className="main-screen screen">
      <div className="wrapper">
        <LazyLoad className="background">
          <img src={backgroundImage} alt="" />
        </LazyLoad>
        <div className="scroll-container">
          <div className="inner">
            <div className="container widgets-container">
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
