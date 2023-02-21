import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { CSSTransition } from "react-transition-group";
import Preloader from "../../../components/Preloader";
import TextBanner from "../../../components/TextBanner";
import "./styles.scss";
import JokesItem from "../JokesItem";
import { setJokes } from "../../../actions/jokes";
import JokesSubmitButton from "../JokesSubmitButton";

// Images
import resultImage from "../../../assets/images/jokes/result-1.svg";
import errorImage from "../../../assets/images/error-image-3.svg";

import LazyLoad from "react-lazy-load";
import { RootState } from "../../../reducers";
import { JokesItem as JokesItemType } from "../../../reducers/jokes";

type State = {
  isTransitionJokesList: boolean;
  isTransitionError: boolean;
};

class JokesResults extends React.PureComponent<Props, State> {
  private resultsSectionRef: React.RefObject<HTMLDivElement>;

  constructor(props: Props) {
    super(props);
    this.resultsSectionRef = React.createRef();
    this.state = {
      isTransitionJokesList: true,
      isTransitionError: true,
    };
  }

  componentDidUpdate(_prevProps: Props, prevState: State) {
    const { isShowJokesPreloader } = this.props;
    const { isTransitionJokesList, isTransitionError } = this.state;
    const {
      isTransitionJokesList: isTransitionJokesListPrev,
      isTransitionError: isTransitionErrorPrev,
    } = prevState;

    if (
      (isShowJokesPreloader ||
        (!isTransitionJokesList && isTransitionJokesListPrev) ||
        (!isTransitionError && isTransitionErrorPrev)) &&
      this.resultsSectionRef.current
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
              <h1 className="result-title">
                <span>Result</span>{" "}
                <LazyLoad className="img-wrapper">
                  <img alt="" src={resultImage} />
                </LazyLoad>
              </h1>
              <div className="jokes-list">
                {jokesList.map((jokesItem) => (
                  <JokesItem key={jokesItem.id} jokeInfo={jokesItem} />
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

const mapStateToProps = (store: RootState) => {
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
  setJokes: (list: JokesItemType[]) => setJokes(list),
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type Props = ConnectedProps<typeof connector>;

export default connector(JokesResults);
