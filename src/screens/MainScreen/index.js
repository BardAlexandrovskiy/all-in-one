import React from "react";
import TextBanner from "../../components/TextBanner";
import "./styles.scss";

class MainScreen extends React.Component {
  render() {
    return (
      <div className="main-screen screen">
        <TextBanner text="Here will be a home page with widgets and other abbreviated information. Coming soon." />
      </div>
    );
  }
}

export default MainScreen;
