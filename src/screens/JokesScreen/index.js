import React from "react";
import JokesFilters from "../../components/JokesFilters";
import "./styles.scss";

class JokesScreen extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div className="jokes-screen screen">
        <JokesFilters />
      </div>
    );
  }
}

export default JokesScreen;
