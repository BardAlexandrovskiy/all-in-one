import React from "react";
import { connect } from "react-redux";
import { CSSTransition } from "react-transition-group";
import Preloader from "../Preloader";
import TextBanner from "../TextBanner";
import "./styles.scss";
import errorImage from "../../assets/images/error-image-3.svg";

class JokesResults extends React.Component {
  constructor(props) {
    super(props);
    this.resultsSection = React.createRef();
  }

  componentDidUpdate(prevProps) {
    const { isShowJokesPreloader: isShowJokesPreloaderPrev } = prevProps;
    const { isShowJokesPreloader } = this.props;

    if (!isShowJokesPreloaderPrev && isShowJokesPreloader) {
      console.log("scroll to");
      this.resultsSection.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }

  render() {
    const { jokesList, requestError, isShowJokesPreloader } = this.props;

    return (
      <section
        ref={this.resultsSection}
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
          in={requestError.isError}
          timeout={300}
          mountOnEnter
          unmountOnExit
        >
          <TextBanner text={`${requestError.errorText}.`} image={errorImage} />
        </CSSTransition>
        <CSSTransition
          in={!!jokesList.length}
          timeout={300}
          mountOnEnter
          unmountOnExit
        >
          <div>
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
          </div>
        </CSSTransition>
      </section>
    );
  }
}

const mapStateToProps = (store) => {
  const {
    jokes: { jokesList, requestError, isShowJokesPreloader },
  } = store;

  return {
    jokesList,
    requestError,
    isShowJokesPreloader,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(JokesResults);
