import LazyLoadImage from "../LazyLoadImage";
import "./styles.scss";

type Props = {
  text: string;
  image?: string;
  deleteFunction?: () => void;
};

const TextBanner = ({ text, image, deleteFunction }: Props) => {
  return (
    <div className="text-banner">
      <div className="text-banner-container container">
        <div className="text">
          {!!image && <LazyLoadImage src={image} alt={"Error image"} />}
          <span>{text}</span>
          {!!deleteFunction && <button onClick={deleteFunction}>Ok</button>}
        </div>
      </div>
    </div>
  );
};

export default TextBanner;
