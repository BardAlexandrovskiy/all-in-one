import "./styles.scss";

const TextBanner = ({ text, image }) => {
  return (
    <div className="text-banner">
      <div className="container">
        <div className="text">
          {image ? <img src={image} alt="" /> : ""}
          <span>{text}</span>
        </div>
      </div>
    </div>
  );
};

export default TextBanner;
