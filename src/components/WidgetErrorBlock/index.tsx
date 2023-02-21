import "./styles.scss";
import LazyLoad from "react-lazy-load";

type Props = {
  text?: string;
  errorText: string;
  image: string;
};

const WidgetErrorBlock = ({ text, errorText, image }: Props) => {
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
