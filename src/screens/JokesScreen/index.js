import React from "react";
import JokesFilters from "../../components/JokesFilters";
import "./styles.scss";

class JokesScreen extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div className="jokes-screen screen">
        <div className="scroll-container">
        <JokesFilters />
        </div>
      </div>
    );
  }
}

export default JokesScreen;
