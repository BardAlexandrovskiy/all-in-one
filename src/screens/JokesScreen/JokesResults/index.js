import React from "react";
import { connect } from "react-redux";
import { CSSTransition } from "react-transition-group";
import Preloader from "../../../components/Preloader";
import TextBanner from "../../../components/TextBanner";
import "./styles.scss";
import JokesItem from "../JokesItem";
import { setJokes } from "../../../actions/jokes";
import JokesSubmitButton from "../JokesSubmitButton";
import errorImage from "../../../assets/images/error-image-3.svg";

// Images
import resultImage from "../../../assets/images/jokes/result-1.svg";

class JokesResults extends React.PureComponent {
  constructor(props) {
    super(props);
    this.resultsSectionRef = React.createRef();
    this.state = {
      isTransitionJokesList: true,
      isTransitionError: true,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { isShowJokesPreloader } = this.props;
    const { isTransitionJokesList, isTransitionError } = this.state;
    const {
      isTransitionJokesList: isTransitionJokesListPrev,
      isTransitionError: isTransitionErrorPrev,
    } = prevState;

    if (
      isShowJokesPreloader ||
      (!isTransitionJokesList && isTransitionJokesListPrev) ||
      (!isTransitionError && isTransitionErrorPrev)
    ) {
      this.resultsSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }

  render() {
    const { jokesList, isError, errorText, isShowJokesPreloader, setJokes } =
      this.props;
    const { isTransitionError, isTransitionJokesList } = this.state;

    return (
      <section
        ref={this.resultsSectionRef}
        className={`jokes-results${
          isShowJokesPreloader ? " preloader-active" : ""
        }`}
      >
        <CSSTransition
          in={isShowJokesPreloader}
          timeout={300}
          mountOnEnter
          unmountOnExit
        >
          <Preloader />
        </CSSTransition>
        <CSSTransition
          in={isError && isTransitionError}
          timeout={150}
          mountOnEnter
          unmountOnExit
          onEnter={() =>
            this.setState({
              isTransitionJokesList: false,
            })
          }
          onExited={() =>
            this.setState({
              isTransitionJokesList: true,
            })
          }
        >
          <TextBanner
            text={errorText ? `${errorText}.` : "The error goes away."}
            image={errorImage}
          />
        </CSSTransition>
        <CSSTransition
          in={!!jokesList.length && isTransitionJokesList}
          timeout={300}
          mountOnEnter
          unmountOnExit
          onEnter={() =>
            this.setState({
              isTransitionError: false,
            })
          }
          onExited={() =>
            this.setState({
              isTransitionError: true,
            })
          }
        >
          <div className="result">
            <div className="container result-container">
              <h1 className="title">
                <span>Result</span> <img alt="" src={resultImage} />
              </h1>
              <div className="jokes-list">
                {jokesList.map((jokeItem) => (
                  <JokesItem key={jokeItem.id} jokeInfo={jokeItem} />
                ))}
              </div>
              <div className="buttons">
                <button
                  onClick={() => setJokes([])}
                  className="button delte-button"
                >
                  Delete jokes
                </button>
                <JokesSubmitButton text="Get new jokes" />
              </div>
            </div>
          </div>
        </CSSTransition>
      </section>
    );
  }
}

const mapStateToProps = (store) => {
  const {
    jokes: { jokesList, isError, errorText, isShowJokesPreloader },
  } = store;

  return {
    jokesList,
    isError,
    errorText,
    isShowJokesPreloader,
  };
};

const mapDispatchToProps = {
  setJokes: (list) => setJokes(list),
};

export default connect(mapStateToProps, mapDispatchToProps)(JokesResults);
