import "./styles.scss";
import LazyLoadImage from "../LazyLoadImage";

type Props = {
  text?: string;
  errorText?: string;
  image: string;
};

const WidgetErrorBlock = ({ text, errorText, image }: Props) => {
  return (
    <div className="widget-error">
      {!!image && <LazyLoadImage src={image} alt="Error image" />}
      {!!text && <p>{text}</p>}
      {!!errorText && <p>{errorText}</p>}
    </div>
  );
};

export default WidgetErrorBlock;
