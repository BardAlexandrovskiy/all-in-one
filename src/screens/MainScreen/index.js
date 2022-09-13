import React from "react";
import "./styles.scss";
import moment from "moment";
import HolidaysWidget from "../../components/HolidaysWidget";

// Images
import eveningImage from "../../assets/images/home/evening.jpg";
import dayImage from "../../assets/images/home/day.jpg";
import nightImage from "../../assets/images/home/night.jpg";
import morningImage from "../../assets/images/home/morning.jpg";
import WeatherWidget from "../../components/WeatherWidget";
import TasksWidget from "../../components/TasksWidget";

class MainScreen extends React.Component {
  render() {
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
          <img className="background" src={backgroundImage} alt="" />
          <div className="scroll-container">
            <div className="inner">
              <div className="container widgets-container">
                <div className="hello-message-widget">
                  <h1>{helloMessage}</h1>
                </div>
                <WeatherWidget />
                <HolidaysWidget />
                <TasksWidget />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MainScreen;
