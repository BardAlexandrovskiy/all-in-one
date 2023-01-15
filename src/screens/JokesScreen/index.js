import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import JokesFilters from "../../components/JokesFilters";
import JokesResults from "../../components/JokesResults";
import { CSSTransition } from "react-transition-group";
import "./styles.scss";

// Images
import background from "../../assets/images/jokes/jokes-background-2.jpg";

class JokesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.scrollContainerRef = React.createRef();
    this.arrowAlignmentBlockRef = React.createRef();
    this.state = {
      isShowArrowUp: false,
    };
  }

  handleScroll = () => {
    if (this.scrollContainerRef.current.scrollTop > 50) {
      this.setState({ isShowArrowUp: true });
    } else {
      this.setState({ isShowArrowUp: false });
    }
  };

  handleClickArrowUp = () => {
    this.scrollContainerRef.current.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  componentDidMount = () => {
    new ResizeObserver(() => {
      const scrollContainer = this.scrollContainerRef.current;
      const arrowAlignmentBlock = this.arrowAlignmentBlockRef.current;
      if (scrollContainer && arrowAlignmentBlock) {
        if (scrollContainer.offsetWidth > scrollContainer.scrollWidth) {
          const offset =
            scrollContainer.offsetWidth - scrollContainer.scrollWidth;
          arrowAlignmentBlock.style.width = `calc(100% - ${offset}px)`;
        } else {
          arrowAlignmentBlock.style = null;
        }
      }
    }).observe(this.scrollContainerRef.current);
  };

  render() {
    const { isShowArrowUp } = this.state;

    return (
      <div className="jokes-screen screen">
        <div className="wrapper">
          <img alt="" className="background" src={background} />
          <div
            className="arrow-alignment-block"
            ref={this.arrowAlignmentBlockRef}
          >
            <div className="arrow-up-container container">
              <CSSTransition
                in={isShowArrowUp}
                timeout={{
                  enter: 300,
                  exit: 300,
                }}
                // unmountOnExit={true}
                // mountOnEnter={true}
              >
                <div onClick={this.handleClickArrowUp} className="arrow-up">
                  <FontAwesomeIcon icon={faArrowUp} />
                </div>
              </CSSTransition>
            </div>
          </div>
          <div
            className="scroll-container"
            onScroll={this.handleScroll}
            ref={this.scrollContainerRef}
          >
            <div className="inner">
              <JokesFilters />
              <JokesResults />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default JokesScreen;
