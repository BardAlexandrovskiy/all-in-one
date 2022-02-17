import React from "react";
import TextBanner from "../../components/TextBanner";
import "./styles.scss";

class NewsScreen extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div className="news-screen screen">
        <TextBanner text={"News will be here. Coming soon."} />
      </div>
    );
  }
}

export default NewsScreen;
