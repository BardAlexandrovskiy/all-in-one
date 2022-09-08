import moment from "moment";
import React from "react";
import { connect } from "react-redux";
import { getHolidays } from "../../actions/holidays";
import HolidaysItem from "../HolidaysItem";
import Preloader from "../Preloader";
import { CSSTransition } from "react-transition-group";
import "./styles.scss";
import errorImage from "../../assets/images/error-image-1.svg";
import WidgetErrorBlock from "../WidgetErrorBlock";

class HolidaysWidget extends React.Component {
  componentDidMount = () => {
    const { getHolidays, lastUpdateDate, isError } = this.props;
    const currentDate = moment().format("yyyyMMDD");

    if (lastUpdateDate !== currentDate || isError) {
      getHolidays();
    }
  };

  render() {
    const { isError, errorText, holidaysList, isShowHolidaysPreloader } =
      this.props;

    let todayHolidays = [];
    let nextHolidays = [];
    const currentDate = 'moment().format("yyyyMMDD");';

    if (holidaysList.length) {
      holidaysList.forEach((holiday) => {
        const { date } = holiday;

        if (date.replaceAll("-", "") === currentDate) {
          todayHolidays.push(holiday);
        } else if (nextHolidays.length < 2) {
          nextHolidays.push(holiday);
        }
      });
    }

    if (todayHolidays.length === 1 && nextHolidays.length) {
      nextHolidays = nextHolidays.slice(0, 1);
    } else if (todayHolidays.length === 2 && nextHolidays.length) {
      todayHolidays = [];
    }

    return (
      <div className="holidays-widget">
        <CSSTransition
          in={isShowHolidaysPreloader}
          timeout={300}
          mountOnEnter
          unmountOnExit
        >
          <Preloader />
        </CSSTransition>
        {!!isError && (
          <WidgetErrorBlock
            text="Oops, something went wrong, no holidays yet."
            errorText={errorText}
            image={errorImage}
          />
        )}
        {(!!todayHolidays.length || !!nextHolidays.length) && (
          <div className="holidays-list">
            {todayHolidays.map((holiday) => (
              <HolidaysItem
                key={holiday.name}
                holiday={holiday}
                firstPartOfTitle="Today is "
              />
            ))}
            {nextHolidays.map((holiday, index) => {
              let isNextMessage = false;

              if (!index) {
                isNextMessage = true;
              } else {
                const { date } = holiday;
                const firstHolidayDate = nextHolidays[0].date;

                if (date === firstHolidayDate) {
                  isNextMessage = true;
                }
              }

              return (
                <HolidaysItem
                  key={holiday.name}
                  holiday={holiday}
                  firstPartOfTitle={
                    isNextMessage ? "The next holiday is " : "Then we'll have "
                  }
                />
              );
            })}
          </div>
        )}
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
