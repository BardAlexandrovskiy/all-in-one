import moment from "moment";
import React from "react";
import { connect } from "react-redux";
import { getHolidays } from "../../actions/holidays";
import HolidaysItem from "../HolidaysItem";
import "./styles.scss";

class HolidaysWidget extends React.Component {
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

    let todayHoliday = null;
    let nextHoliday = null;
    let todayHolidayMessage = "Today is ";
    let nextHolidayMessage = "The next holiday is ";
    const currentDate = moment().format("yyyyMMDD");

    if (holidaysList.length > 1) {
      const { date } = holidaysList[0];

      if (date.replaceAll("-", "") === currentDate) {
        todayHoliday = holidaysList[0];
        nextHoliday = holidaysList[1];
      } else if (date.replaceAll("-", "") > currentDate) {
        nextHoliday = holidaysList[0];
      }
    }

    return (
      <div className="holidays-widget">
        <div className="holidays-list">
          {!!todayHoliday && (
            <HolidaysItem
              holiday={todayHoliday}
              firstPartOfTitle={todayHolidayMessage}
              isShowDate={true}
            />
          )}
          {!!nextHoliday && (
            <HolidaysItem
              holiday={nextHoliday}
              firstPartOfTitle={todayHolidayMessage}
              isDateNow={true}
            />
          )}
          {!!nextHoliday && (
            <HolidaysItem
              holiday={nextHoliday}
              firstPartOfTitle={nextHolidayMessage}
              isDateNow={false}
            />
          )}
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

export default connect(mapStateToProps, mapDispatchToProps)(HolidaysWidget);
