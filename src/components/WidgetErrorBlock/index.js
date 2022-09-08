import "./styles.scss";

const WidgetErrorBlock = ({ text, errorText, image }) => {
  return (
    <div className="widget-error">
      {!!image && <img src={image} alt="" />}
      {!!text && <p>{text}</p>}
      {!!errorText && <p>{errorText}</p>}
    </div>
  );
};

export default WidgetErrorBlock;
