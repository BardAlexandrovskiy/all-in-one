import moment from "moment";
import React from "react";
import { connect } from "react-redux";
import { getHolidays } from "../../actions/holidays";
import HolidaysItem from "../HolidaysItem";
import "./styles.scss";

// Images
import background from "../../assets/images/holidays/holidays-1.jpg";

class Holidays extends React.Component {
  componentDidMount = () => {
    const { getHolidays, lastUpdateDate } = this.props;
    const currentDate = moment().format("yyyyMMDD");

    if (lastUpdateDate !== currentDate) {
      getHolidays();
    }
  };

  render() {
    const { isError, errorText, holidaysList, isShowHolidaysPreloader } =
      this.props;

    console.log(holidaysList);

    let todayHoliday = null;
    let nextHoliday = null;
    let todayHolidayMessage = "Today is ";
    let nextHolidayMessage = "The next holiday is ";
    const currentDate = moment().format("yyyyMMDD");

    const { date } = holidaysList[0];

    if (date.replaceAll("-", "") === currentDate) {
      todayHoliday = holidaysList[0];
      nextHoliday = holidaysList[1];
    } else if (date.replaceAll("-", "") > currentDate) {
      nextHoliday = holidaysList[0];
    }

    const currentTimeHours = +moment().format("H");
    let helloMessage = "";

    switch (true) {
      case currentTimeHours < 6:
        helloMessage = "Good night";
        break;
      case currentTimeHours < 12:
        helloMessage = "Good morning";
        break;
      case currentTimeHours < 18:
        helloMessage = "Have a nice day";
        break;
      default:
        helloMessage = "Have a good evening";
    }

    return (
      <div className="holidays">
        <img className="background" src={background} alt="" />
        <div className="container holidays-container">
          <h1 className="title">{helloMessage}</h1>
          <div className="holidays-list">
            {!!todayHoliday && (
              <HolidaysItem
                holiday={todayHoliday}
                firstPartOfTitle={todayHolidayMessage}
                isShowDate={false}
              />
            )}
            {!!nextHoliday && (
              <HolidaysItem
                holiday={nextHoliday}
                firstPartOfTitle={nextHolidayMessage}
                isShowDate={true}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  const {
    isError,
    errorText,
    holidaysList,
    isShowHolidaysPreloader,
    lastUpdateDate,
  } = store.holidays;

  return {
    isError,
    errorText,
    holidaysList,
    isShowHolidaysPreloader,
    lastUpdateDate,
  };
};

const mapDispatchToProps = {
  getHolidays: () => getHolidays(),
};

export default connect(mapStateToProps, mapDispatchToProps)(Holidays);
