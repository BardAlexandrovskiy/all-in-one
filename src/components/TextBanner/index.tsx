import "./styles.scss";
import LazyLoad from "react-lazy-load";

const TextBanner = ({ text, image, deleteFunction }: Props) => {
  return (
    <div className="text-banner">
      <div className="text-banner-container container">
        <div className="text">
          {!!image && (
            <LazyLoad height={150}>
              <img src={image} alt="" />
            </LazyLoad>
          )}
          <span>{text}</span>
          {!!deleteFunction && <button onClick={deleteFunction}>Ok</button>}
        </div>
      </div>
    </div>
  );
};

type Props = {
  text: string;
  image?: string;
  deleteFunction?: () => void;
};

export default TextBanner;
