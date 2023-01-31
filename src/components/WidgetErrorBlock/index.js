import "./styles.scss";
import LazyLoad from "react-lazy-load";

const WidgetErrorBlock = ({ text, errorText, image }) => {
  return (
    <div className="widget-error">
      {!!image && (
        <LazyLoad className="img-wrapper">
          <img src={image} alt="" />
        </LazyLoad>
      )}
      {!!text && <p>{text}</p>}
      {!!errorText && <p>{errorText}</p>}
    </div>
  );
};

export default WidgetErrorBlock;
