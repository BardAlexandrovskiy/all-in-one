import "./styles.scss";
import LazyLoad from "react-lazy-load";

const TextBanner = ({ text, image, deleteFuncion }) => {
  return (
    <div className="text-banner">
      <div className="container">
        <div className="text">
          {image ? (
            <LazyLoad>
              <img src={image} alt="" />
            </LazyLoad>
          ) : (
            ""
          )}
          <span>{text}</span>
          {!!deleteFuncion && <button onClick={deleteFuncion}>Ok</button>}
        </div>
      </div>
    </div>
  );
};

export default TextBanner;
