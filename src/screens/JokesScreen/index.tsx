import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import JokesFilters from "./JokesFilters";
import JokesResults from "./JokesResults";
import { CSSTransition } from "react-transition-group";
import "./styles.scss";

import LazyLoad from "react-lazy-load";

// Images
import background from "../../assets/images/jokes/jokes-background-2.jpg";

type State = {
  isShowArrowUp: boolean;
};

class JokesScreen extends React.PureComponent<any, State> {
  private scrollContainerRef: React.RefObject<HTMLDivElement>;
  private arrowAlignmentBlockRef: React.RefObject<HTMLDivElement>;
  private resizeObserver: ResizeObserver | null;
  constructor(props: object) {
    super(props);
    this.scrollContainerRef = React.createRef();
    this.arrowAlignmentBlockRef = React.createRef();
    this.state = {
      isShowArrowUp: false,
    };
    this.resizeObserver = null;
  }

  handleScroll = () => {
    const { isShowArrowUp: prevIsShowArrowUp } = this.state;

    if (this.scrollContainerRef.current) {
      const isShowArrowUp = this.scrollContainerRef.current.scrollTop > 50;
      if (prevIsShowArrowUp !== isShowArrowUp) {
        this.setState({ isShowArrowUp: isShowArrowUp });
      }
    }
  };

  handleClickArrowUp = () => {
    if (this.scrollContainerRef.current) {
      this.scrollContainerRef.current.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  };

  componentDidUpdate = () => {};

  componentDidMount = () => {
    this.resizeObserver = new ResizeObserver(() => {
      const scrollContainer = this.scrollContainerRef.current;
      const arrowAlignmentBlock = this.arrowAlignmentBlockRef.current;
      if (scrollContainer && arrowAlignmentBlock) {
        if (scrollContainer.offsetWidth > scrollContainer.scrollWidth) {
          const offset =
            scrollContainer.offsetWidth - scrollContainer.scrollWidth;
          arrowAlignmentBlock.style.width = `calc(100% - ${offset}px)`;
        } else {
          arrowAlignmentBlock.setAttribute("style", "");
        }
      }
    });

    this.resizeObserver.observe(this.scrollContainerRef.current);
  };

  componentWillUnmount = () => {
    this.resizeObserver.unobserve(this.scrollContainerRef.current);
  };

  render() {
    const { isShowArrowUp } = this.state;

    return (
      <div className="jokes-screen screen">
        <div className="wrapper">
          <LazyLoad className="background">
            <img alt="" src={background} />
          </LazyLoad>
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
