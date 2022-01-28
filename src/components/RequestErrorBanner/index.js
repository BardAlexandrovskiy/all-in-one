import "./styles.scss";

const RequestErrorBanner = ({ text }) => {
  return (
    <div className="request-error-banner">
      <div className="container">
        <div className="text">{text}</div>
      </div>
    </div>
  );
};

export default RequestErrorBanner;
