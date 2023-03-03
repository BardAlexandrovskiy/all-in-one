import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import JokesFilters from "./JokesFilters";
import JokesResults from "./JokesResults";
import { CSSTransition } from "react-transition-group";
import "./styles.scss";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Images
import background from "../../assets/images/jokes/jokes-background.webp";
import LazyLoadImage from "../../components/LazyLoadImage";

type State = {
  isShowArrowUp: boolean;
};

class JokesScreen extends React.PureComponent<object, State> {
  private scrollContainerRef: HTMLDivElement | null;
  private filtersTitleRef: HTMLDivElement | null;
  private isFiltersTitleAnimationStarted: boolean;
  private arrowAlignmentBlockRef: React.RefObject<HTMLDivElement>;
  private resizeObserver: ResizeObserver | null;
  private setFiltersTitleRef: (ref: HTMLDivElement | null) => void;
  private setScrollContainerRef: (ref: HTMLDivElement | null) => void;
  private animationFunction: () => void;
  constructor(props: object) {
    super(props);
    this.scrollContainerRef = null;
    this.arrowAlignmentBlockRef = React.createRef();

    this.state = {
      isShowArrowUp: false,
    };
    this.resizeObserver = null;
    this.filtersTitleRef = null;
    this.isFiltersTitleAnimationStarted = false;
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

      if (ref) {
        this.animationFunction();
      }
    };
    this.setFiltersTitleRef = (ref) => {
      this.filtersTitleRef = ref;
    };
    this.animationFunction = () => {
      if (
        !this.isFiltersTitleAnimationStarted &&
        this.filtersTitleRef &&
        this.scrollContainerRef
      ) {
        this.isFiltersTitleAnimationStarted = true;
        console.log("working");
        const mm = gsap.matchMedia();
        mm.add("(max-width: 640px)", () => {
          gsap.registerPlugin(ScrollTrigger);
          gsap.to(this.filtersTitleRef, {
            scrollTrigger: {
              trigger: this.scrollContainerRef,
              endTrigger: this.filtersTitleRef,
              start: "top top",
              end: "bottom top",
              markers: true,
              toggleClass: {
                className: "active",
                targets: this.filtersTitleRef,
              },
              scroller: this.scrollContainerRef,
            },
          });
        });
      }
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
          <div className="background">
            <LazyLoadImage
              src={background}
              className={background}
              alt={"Jokes background"}
            />
          </div>
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
              <JokesFilters setTitleFilterRef={this.setFiltersTitleRef} />
              <JokesResults />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default JokesScreen;
