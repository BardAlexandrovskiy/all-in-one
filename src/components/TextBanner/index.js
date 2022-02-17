import "./styles.scss";

const TextBanner = ({ text }) => {
  return (
    <div className="text-banner">
      <div className="container">
        <div className="text">{text}</div>
      </div>
    </div>
  );
};

export default TextBanner;
