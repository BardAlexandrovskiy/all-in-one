import React from "react";
import { connect } from "react-redux";
import { CSSTransition } from "react-transition-group";
import Preloader from "../Preloader";
import TextBanner from "../TextBanner";
import "./styles.scss";
import errorImage from "../../assets/images/error-image-3.svg";
import JokesItem from "../JokesItem";

// Images
import resultImage from "../../assets/images/jokes/result-1.svg";
import resultBackground from "../../assets/images/jokes/result-background.jpg";

class JokesResults extends React.Component {
  constructor(props) {
    super(props);
    this.resultsSectionRef = React.createRef();
    this.state = {
      isTransitionJokesList: true,
      isTransitionError: true,
      isScrollToResult: false,
    };
  }

  componentDidUpdate(prevProps) {
    const { isShowJokesPreloader: isShowJokesPreloaderPrev } = prevProps;
    const { isShowJokesPreloader } = this.props;
    const { isScrollToResult } = this.state;

    if (
      (!isShowJokesPreloaderPrev && isShowJokesPreloader) ||
      isScrollToResult
    ) {
      this.resultsSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }

  render() {
    const { jokesList, isError, errorText, isShowJokesPreloader } = this.props;
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
              isScrollToResult: true,
            })
          }
          onExited={() =>
            this.setState({
              isTransitionJokesList: true,
              isScrollToResult: false,
            })
          }
        >
          <TextBanner text={`${errorText}.`} image={errorImage} />
        </CSSTransition>
        <CSSTransition
          in={!!jokesList.length && isTransitionJokesList}
          timeout={300}
          mountOnEnter
          unmountOnExit
          onEnter={() =>
            this.setState({ isTransitionError: false, isScrollToResult: true })
          }
          onExited={() =>
            this.setState({ isTransitionError: true, isScrollToResult: false })
          }
        >
          <div className="result">
            <img className="background-image" src={resultBackground} alt="" />
            <div className="container result-container">
              <h1 className="title">
                <span>Result</span> <img alt="" src={resultImage} />
              </h1>
              <div className="jokes-list">
                {jokesList.map((jokeItem) => (
                  <JokesItem key={jokeItem.id} jokeInfo={jokeItem} />
                ))}
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

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(JokesResults);
