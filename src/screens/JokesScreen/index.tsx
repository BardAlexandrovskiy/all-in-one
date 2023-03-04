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
  isShowTitleImages: boolean;
  isShowHappyImage: { isActive: boolean };
  isShowSadImage: { isActive: boolean; delay: boolean };
  isShowNeutralImage: { isActive: boolean; delay: boolean };
};

class JokesScreen extends React.PureComponent<object, State> {
  private scrollContainerRef: HTMLDivElement | null;
  private filtersTitleRef: HTMLDivElement | null;
  private arrowAlignmentBlockRef: React.RefObject<HTMLDivElement>;
  private resizeObserver: ResizeObserver | null;
  private setFiltersTitleRef: (ref: HTMLDivElement | null) => void;
  private setScrollContainerRef: (ref: HTMLDivElement | null) => void;
  private filtersTitleAnimationFunction: (ref: HTMLDivElement) => void;
  private filtersHappyImageRef: HTMLDivElement | null;
  private filtersNeutralImageRef: HTMLDivElement | null;
  private filtersSadImageRef: HTMLDivElement | null;
  private setFiltersHappyImageRef: (ref: HTMLDivElement | null) => void;
  private setFiltersNeutralImageRef: (ref: HTMLDivElement | null) => void;
  private setFiltersSadImageRef: (ref: HTMLDivElement | null) => void;
  private filtersImageAnimation: (
    image: HTMLDivElement | null,
    scrollContainer: HTMLDivElement,
    name: "happy" | "sad" | "neutral"
  ) => void;
  constructor(props: object) {
    super(props);
    this.state = {
      isShowArrowUp: false,
      isShowTitleImages: false,
      isShowHappyImage: { isActive: false },
      isShowSadImage: { isActive: false, delay: false },
      isShowNeutralImage: { isActive: false, delay: false },
    };
    this.scrollContainerRef = null;
    this.arrowAlignmentBlockRef = React.createRef();
    this.resizeObserver = null;
    this.filtersTitleRef = null;
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

        this.filtersTitleAnimationFunction(ref);
        this.filtersImageAnimation(this.filtersHappyImageRef, ref, "happy");
        this.filtersImageAnimation(this.filtersNeutralImageRef, ref, "neutral");
        this.filtersImageAnimation(this.filtersSadImageRef, ref, "sad");
      }

      this.scrollContainerRef = ref;
    };
    this.setFiltersTitleRef = (ref) => {
      this.filtersTitleRef = ref;
    };
    this.filtersTitleAnimationFunction = (ref) => {
      const mm = gsap.matchMedia();
      mm.add("(max-width: 640px)", () => {
        const scroller = ref;
        const trigger = this.filtersTitleRef;

        gsap.registerPlugin(ScrollTrigger);
        gsap.to(trigger, {
          scrollTrigger: {
            trigger: scroller,
            endTrigger: trigger,
            start: "top-=1px top",
            end: "bottom top",
            scroller: scroller,
            onToggle: (self) => {
              const { isActive } = self;
              this.setState({ isShowTitleImages: isActive });
            },
          },
        });
      });
    };
    this.filtersHappyImageRef = null;
    this.filtersNeutralImageRef = null;
    this.filtersSadImageRef = null;
    this.setFiltersHappyImageRef = (ref) => {
      this.filtersHappyImageRef = ref;
    };
    this.setFiltersNeutralImageRef = (ref) => {
      this.filtersNeutralImageRef = ref;
    };
    this.setFiltersSadImageRef = (ref) => {
      this.filtersSadImageRef = ref;
    };
    this.filtersImageAnimation = (image, scrollContainer, name) => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 641px)", () => {
        gsap.registerPlugin(ScrollTrigger);
        gsap.to(image, {
          scrollTrigger: {
            trigger: image,
            start: "top bottom",
            end: "bottom top",
            scroller: scrollContainer,
            onToggle: (self) => {
              const { isActive, direction } = self;

              switch (name) {
                case "happy":
                  this.setState({ isShowHappyImage: { isActive: isActive } });
                  break;
                case "sad":
                  if (direction > -1) {
                    this.setState({
                      isShowSadImage: { isActive: isActive, delay: true },
                    });
                  } else {
                    this.setState({
                      isShowSadImage: { isActive: isActive, delay: false },
                    });
                  }
                  break;
                case "neutral":
                  if (direction > -1) {
                    this.setState({
                      isShowNeutralImage: { isActive: isActive, delay: true },
                    });
                  } else {
                    this.setState({
                      isShowNeutralImage: { isActive: isActive, delay: false },
                    });
                  }
                  break;
              }
            },
          },
        });
      });
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
    const {
      isShowArrowUp,
      isShowTitleImages,
      isShowHappyImage,
      isShowSadImage,
      isShowNeutralImage,
    } = this.state;
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
              <JokesFilters
                isShowTitleImages={isShowTitleImages}
                setTitleFilterRef={this.setFiltersTitleRef}
                setFiltersHappyImageRef={this.setFiltersHappyImageRef}
                setFiltersNeutralImageRef={this.setFiltersNeutralImageRef}
                setFiltersSadImageRef={this.setFiltersSadImageRef}
                isShowHappyImage={isShowHappyImage}
                isShowSadImage={isShowSadImage}
                isShowNeutralImage={isShowNeutralImage}
              />
              <JokesResults />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default JokesScreen;
