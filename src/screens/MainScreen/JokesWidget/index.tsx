import React from "react";
import { CSSTransition } from "react-transition-group";
import Preloader from "../../../components/Preloader";
import WidgetErrorBlock from "../../../components/WidgetErrorBlock";
import errorImage from "../../../assets/images/error-image-1.svg";
import JokesItem from "../../JokesScreen/JokesItem";
import { Link } from "react-router-dom";
import "./styles.scss";
import { JokesItem as JokesItemType } from "../../../reducers/jokes";

type State = {
  isPreloader: boolean;
  joke: JokesItemType | null;
  isError: boolean;
  errorText: string;
};

class JokesWidget extends React.PureComponent<any, State> {
  constructor(props: object) {
    super(props);
    this.state = {
      isPreloader: false,
      joke: null,
      isError: false,
      errorText: "",
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
          // delete response.category;

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
          <CSSTransition
            in={isError}
            timeout={{
              enter: 500,
              exit: 0,
            }}
            mountOnEnter
            unmountOnExit
          >
            <WidgetErrorBlock errorText={errorText} image={errorImage} />
          </CSSTransition>
          <CSSTransition
            in={!!joke}
            timeout={{
              enter: 500,
              exit: 0,
            }}
            mountOnEnter
            unmountOnExit
          >
            <div className="joke-wrapper">
              <h2>Random joke</h2>
              {!!joke && <JokesItem jokeInfo={joke} />}
            </div>
          </CSSTransition>
          <Link to="/fun">Find your own jokes</Link>
        </div>
      </div>
    );
  }
}

export default JokesWidget;
