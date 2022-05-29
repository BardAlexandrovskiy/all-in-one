import React from "react";
import TextBanner from "../../components/TextBanner";
import "./styles.scss";

class JokesScreen extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div className="jokes-screen screen">
        <TextBanner text={"Jokes will be here. Coming soon."} />
      </div>
    );
  }
}

export default JokesScreen;
