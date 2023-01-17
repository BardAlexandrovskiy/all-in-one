import React from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import Preloader from "../Preloader";
import WidgetErrorBlock from "../WidgetErrorBlock";
import errorImage from "../../assets/images/error-image-1.svg";
import JokesItem from "../JokesItem";
import { Link } from "react-router-dom";
import "./styles.scss";

class JokesWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPreloader: false,
      joke: null,
      isError: false,
      errorText: false,
    };
  }

  getJoke = () => {
    this.setState({ isPreloader: true });
    fetch(
      "https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Pun,Christmas?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single"
    )
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        throw new Error(`Error: ${response.status}.`);
      })
      .then((response) => {
        const { error, joke } = response;
        if (joke && !error) {
          delete response.error;
          delete response.category;

          if (joke.length > 100) {
            this.getJoke();
          } else {
            this.setState({ isPreloader: false });
            this.setState({ joke: response });
          }
        } else throw new Error("Joke not found.");
      })
      .catch((error) => {
        this.setState({ isError: true });
        this.setState({ errorText: error.message });
        this.setState({ isPreloader: false });
      });
  };

  componentDidMount() {
    this.getJoke();
  }

  render() {
    const { joke, isPreloader, isError, errorText } = this.state;
    return (
      <div className="jokes-widget">
        <div className="inner-wrapper">
          <CSSTransition
            in={isPreloader}
            timeout={300}
            mountOnEnter
            unmountOnExit
          >
            <Preloader />
          </CSSTransition>
          <SwitchTransition mode="out-in">
            <CSSTransition key={isError} timeout={500}>
              {isError ? (
                <WidgetErrorBlock errorText={errorText} image={errorImage} />
              ) : (
                <div>
                  {!!joke && (
                    <div className="joke-wrapper">
                      <h2>Random joke</h2>
                      <JokesItem jokeInfo={joke} />
                    </div>
                  )}
                </div>
              )}
            </CSSTransition>
          </SwitchTransition>
          <Link to="/fun">Find your own jokes</Link>
        </div>
      </div>
    );
  }
}

export default JokesWidget;
