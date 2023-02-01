import "./styles.scss";

type Props = {
  holiday: { name: string; localName: string; date: string };
  firstPartOfTitle: string;
  isDateNow?: boolean;
};

const HolidaysItem = ({ holiday, firstPartOfTitle, isDateNow }: Props) => {
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
          {isDateNow ? "Today:" : "Holiday date:"} <span>{date}</span>
        </div>
      )}
    </div>
  );
};

export default HolidaysItem;
