import "./styles.scss";

const TextBanner = ({ text, image, deleteFuncion }) => {
  return (
    <div className="text-banner">
      <div className="container">
        <div className="text">
          {image ? <img src={image} alt="" /> : ""}
          <span>{text}</span>
          {!!deleteFuncion && <button onClick={deleteFuncion}>Ok</button>}
        </div>
      </div>
    </div>
  );
};

export default TextBanner;
