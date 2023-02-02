import moment from "moment";
import React from "react";
import { connect } from "react-redux";
import { getHolidays } from "../../../actions/holidays";
import HolidaysItem from "../HolidaysItem";
import Preloader from "../../../components/Preloader";
import { CSSTransition } from "react-transition-group";
import "./styles.scss";
import errorImage from "../../../assets/images/error-image-1.svg";
import WidgetErrorBlock from "../../../components/WidgetErrorBlock";
import { HolidayItem } from "../../../reducers/holidays";
import { RootState } from "../../../reducers";

type Props = {
  getHolidays: () => void;
  lastUpdateDate: string | null;
  isError: boolean;
  errorText: string;
  holidaysList: HolidayItem[];
  isShowHolidaysPreloader: boolean;
};

class HolidaysWidget extends React.Component<Props> {
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

    let todayHolidays: HolidayItem[] = [];
    let nextHolidays: HolidayItem[] = [];
    const currentDate: string = moment().format("yyyyMMDD");

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
        <CSSTransition
          in={!!isError}
          timeout={{
            enter: 500,
            exit: 0,
          }}
          mountOnEnter
          unmountOnExit
        >
          <WidgetErrorBlock
            text="Oops, something went wrong, no holidays yet."
            errorText={errorText}
            image={errorImage}
          />
        </CSSTransition>
        <CSSTransition
          in={!!todayHolidays.length || !!nextHolidays.length}
          timeout={{
            enter: 500,
            exit: 0,
          }}
          mountOnEnter
          unmountOnExit
        >
          <div className="holidays-list">
            {todayHolidays.map((holiday) => (
              <HolidaysItem
                key={holiday.name}
                holiday={holiday}
                firstPartOfTitle="Today is "
                isDateNow={true}
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
        </CSSTransition>
      </div>
    );
  }
}

const mapStateToProps = (store: RootState) => {
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
