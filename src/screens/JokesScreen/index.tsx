import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import JokesFilters from "./JokesFilters";
import JokesResults from "./JokesResults";
import { CSSTransition } from "react-transition-group";
import "./styles.scss";

import LazyLoad from "react-lazy-load";

// Images
import background from "../../assets/images/jokes/jokes-background.webp";

class JokesScreen extends React.PureComponent<any, State> {
  private scrollContainerRef: HTMLDivElement | null;
  private arrowAlignmentBlockRef: React.RefObject<HTMLDivElement>;
  private resizeObserver: ResizeObserver | null;
  private setScrollContainerRef: (ref: HTMLDivElement | null) => void;
  constructor(props: object) {
    super(props);
    this.scrollContainerRef = null;
    this.arrowAlignmentBlockRef = React.createRef();

    this.state = {
      isShowArrowUp: false,
    };
    this.resizeObserver = null;
    this.setScrollContainerRef = (ref) => {
      if (ref && !this.scrollContainerRef) {
        const arrowAlignmentBlock = this.arrowAlignmentBlockRef.current;
        const scrollContainer = ref;
        this.resizeObserver = new ResizeObserver(() => {
          if (scrollContainer && arrowAlignmentBlock) {
            if (scrollContainer.offsetWidth > scrollContainer.scrollWidth) {
              const offset =
                scrollContainer.offsetWidth - scrollContainer.scrollWidth;
              arrowAlignmentBlock.style.width = `calc(100% - ${offset}px)`;
            } else {
              arrowAlignmentBlock.removeAttribute("style");
            }
          }
        });

        this.resizeObserver.observe(scrollContainer);
      }

      this.scrollContainerRef = ref;
    };
  }

  handleScroll = () => {
    const { isShowArrowUp: prevIsShowArrowUp } = this.state;

    if (this.scrollContainerRef) {
      const isShowArrowUp = this.scrollContainerRef.scrollTop > 50;
      if (prevIsShowArrowUp !== isShowArrowUp) {
        this.setState({ isShowArrowUp: isShowArrowUp });
      }
    }
  };

  handleClickArrowUp = () => {
    if (this.scrollContainerRef) {
      this.scrollContainerRef.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  };

  componentWillUnmount = () => {
    if (this.resizeObserver && this.scrollContainerRef) {
      this.resizeObserver.unobserve(this.scrollContainerRef);
    }
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
            ref={this.setScrollContainerRef}
          >
            <div className="inner">
              <JokesFilters scrollContainerRef={this.scrollContainerRef} />
              <JokesResults />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

type State = {
  isShowArrowUp: boolean;
};

export default JokesScreen;
