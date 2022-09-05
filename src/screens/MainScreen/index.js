import React from "react";
import Holidays from "../../components/Holidays";
import "./styles.scss";

class MainScreen extends React.Component {
  render() {
    return (
      <div className="main-screen screen">
        <div className="scroll-container">
          <Holidays />
        </div>
      </div>
    );
  }
}

export default MainScreen;
