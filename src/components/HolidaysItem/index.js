import "./styles.scss";

const HolidaysItem = ({ holiday, firstPartOfTitle, isDateNow }) => {
  const { name, localName, date } = holiday;

  let holidayName = "";

  if (localName && name) {
    holidayName = `${name} / ${localName}`;
  } else if (name) {
    holidayName = name;
  } else if (localName) {
    holidayName = localName;
  }

  return (
    <div className="holidays-item">
      <h2>
        {firstPartOfTitle}
        <span>{holidayName}</span>
      </h2>
      {!!date && (
        <div className="date">
          {isDateNow ? "Today:" : "Holiday date:"} {date}
        </div>
      )}
    </div>
  );
};

export default HolidaysItem;
