import "./styles.scss";

const HolidaysItem = ({ holiday, firstPartOfTitle, isShowDate }) => {
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
      <div className="wrapper">
        {isShowDate && date && <div className="date">Date: {date}</div>}
      </div>
    </div>
  );
};

export default HolidaysItem;
