import { faBackspace, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { connect, ConnectedProps } from "react-redux";
import {
  changeAmountValue,
  changeBlackList,
  changeCategories,
  changeCategoryType,
  changeJokeType,
  changeSearchValue,
  resetFilters,
  showCategoriesRedBorder,
} from "../../../actions/jokes";
import "./styles.scss";
import { CSSTransition } from "react-transition-group";
import { defaultState } from "../../../reducers/jokes";

// Jokes images
import happyImage from "../../../assets/images/jokes/happy.svg";
import neutralImage from "../../../assets/images/jokes/neutral.svg";
import sadImage from "../../../assets/images/jokes/sad.svg";
import JokesSubmitButton from "../JokesSubmitButton";

import { RootState } from "../../../reducers";
import LazyLoadImage from "../../../components/LazyLoadImage";

interface Props extends ReduxProps {
  setTitleFilterRef: (ref: HTMLDivElement | null) => void;
}

type State = {
  titleImagesLoaded: boolean;
};

class JokesFilters extends React.PureComponent<Props, State> {
  private categoriesRef: React.RefObject<HTMLDivElement> | null;

  constructor(props: Props) {
    super(props);
    this.categoriesRef = React.createRef();
    this.state = {
      titleImagesLoaded: false,
    };
  }

  componentDidUpdate = () => {
    const { isCategoriesRedBorder, showCategoriesRedBorder } = this.props;
    if (isCategoriesRedBorder && this.categoriesRef?.current) {
      this.categoriesRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setTimeout(() => {
        showCategoriesRedBorder(false);
      }, 3000);
    }
  };

  handleBlurAmountInput = () => {
    const { amountValue, changeAmountValue } = this.props;
    if (+amountValue < 1) {
      changeAmountValue("1");
    }
  };

  handlePressEnterInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (e.target instanceof HTMLElement) {
        e.target.blur();
      }
    }
  };

  handleReset = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { resetFilters } = this.props;
    resetFilters();
  };

  handleChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { changeSearchValue } = this.props;
    const value = e.target.value.replace(/\s+/g, " ").trimStart();
    if (value.length <= 140) {
      changeSearchValue(value);
    }
  };

  handleChangeAmountValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { changeAmountValue } = this.props;
    const value = e.target.value;
    const valueToNumber = +value;

    if (value === "") {
      changeAmountValue("");
    } else if (valueToNumber > 10) {
      changeAmountValue("10");
    } else if (valueToNumber < 1) {
      changeAmountValue("1");
    } else {
      changeAmountValue(value);
    }
  };

  handleCheckTitleImagesLoad = () => {
    this.setState({ titleImagesLoaded: true });
  };

  render() {
    const {
      categoryTypeValue,
      categoriesList,
      blacklist,
      jokeType,
      searchValue,
      amountValue,
      changeCategories,
      changeCategoryType,
      changeBlackList,
      changeJokeType,
      isCategoriesRedBorder,
      jokesState,
      changeSearchValue,
      setTitleFilterRef,
    } = this.props;

    const { titleImagesLoaded } = this.state;

    const isResetNotActive =
      JSON.stringify(jokesState) === JSON.stringify(defaultState);
    return (
      <section className="jokes-filters">
        <div className="container filters-container">
          <h1
            ref={setTitleFilterRef}
            className={`title notranslate${titleImagesLoaded ? " loaded" : ""}`}
          >
            <div className="left-image">
              <img alt="" src={neutralImage} />
            </div>
            <span>Get jokes</span>
            <div className="right-images">
              <div className="happy-image">
                <img alt="" src={happyImage} />
              </div>
              <div className="sad-image">
                <img
                  onLoad={this.handleCheckTitleImagesLoad}
                  alt=""
                  src={sadImage}
                />
              </div>
            </div>
          </h1>
          <div className="left-column">
            <div className="happy-image img-wrapper">
              <LazyLoadImage alt={"Happy image"} src={happyImage} />
            </div>
            <div className="neutral-image img-wrapper">
              <LazyLoadImage alt={"Neutral image"} src={neutralImage} />
            </div>
          </div>
          <div className="center-column">
            <form className="filters">
              <div className="cetegories joke-options" ref={this.categoriesRef}>
                <h2>Select category / categories:</h2>
                <div className="select-category-wrapper">
                  <FontAwesomeIcon icon={faChevronDown} />
                  <select
                    onChange={(event) => {
                      changeCategoryType(event.target.value);
                    }}
                    value={categoryTypeValue}
                    id="select-category"
                  >
                    <option value="Any">Any</option>
                    <option value="Custom">Custom</option>
                  </select>
                </div>
                <CSSTransition
                  in={categoryTypeValue === "Custom"}
                  timeout={300}
                  mountOnEnter
                  unmountOnExit
                >
                  <div
                    className={`categories-list${
                      isCategoriesRedBorder ? " red" : ""
                    }`}
                  >
                    {categoriesList.map((category, index) => {
                      const { isCheck, value } = category;
                      const id = `category-${index}`;
                      return (
                        <div key={value} className="checkbox-wrapper">
                          <label htmlFor={id}>{value}</label>
                          <input
                            defaultChecked={isCheck}
                            type="checkbox"
                            id={id}
                            onChange={() => changeCategories(value)}
                          />
                        </div>
                      );
                    })}
                  </div>
                </CSSTransition>
              </div>
              <div className="blacklist joke-options">
                <h2>Select flags to blacklist:</h2>
                <div className="wrapper">
                  {blacklist.map((item, index) => {
                    const { isCheck, value, display } = item;
                    const id = `blacklist-${index}`;

                    return (
                      <div key={value} className="checkbox-wrapper">
                        <label htmlFor={id}>{display}</label>
                        <input
                          checked={isCheck}
                          type="checkbox"
                          id={id}
                          onChange={() => changeBlackList(value)}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="joke-type joke-options">
                <h2>Select at least one joke type:</h2>
                <div className="wrapper">
                  {jokeType.map((item, index) => {
                    const { isCheck, value, display } = item;
                    const id = `joke-type-${index}`;

                    return (
                      <div key={value} className="radio-wrapper">
                        <label htmlFor={id}>{display}</label>
                        <input
                          checked={isCheck}
                          type="radio"
                          id={id}
                          onChange={() => changeJokeType(value)}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="search-joke joke-options">
                <h2>Search for keywords:</h2>
                <div className="input-wrapper">
                  <input
                    onKeyDown={this.handlePressEnterInput}
                    onChange={this.handleChangeSearchValue}
                    placeholder="Search string"
                    type="text"
                    value={searchValue}
                  />
                  <CSSTransition
                    in={!!searchValue}
                    timeout={300}
                    unmountOnExit
                    mountOnEnter
                  >
                    <div
                      className="clear-input"
                      onClick={() => changeSearchValue("")}
                    >
                      <FontAwesomeIcon icon={faBackspace} />
                    </div>
                  </CSSTransition>
                </div>
              </div>
              <div className="amount-jokes joke-options">
                <h2>Amount of jokes(1-10):</h2>
                <div className="input-wrapper">
                  <input
                    onChange={this.handleChangeAmountValue}
                    onKeyDown={this.handlePressEnterInput}
                    onBlur={this.handleBlurAmountInput}
                    type="number"
                    value={amountValue}
                    max="10"
                    min="1"
                  />
                </div>
              </div>
              <div className="buttons">
                <CSSTransition
                  in={isResetNotActive}
                  timeout={{
                    appear: 0,
                    enter: 300,
                    exit: 300,
                  }}
                  appear={true}
                >
                  <button
                    onClick={this.handleReset}
                    className="button reset-button"
                  >
                    Reset all
                  </button>
                </CSSTransition>
                <JokesSubmitButton text={"Submit"} />
              </div>
            </form>
          </div>
          <div className="right-column">
            <div className="sad-image img-wrapper">
              <LazyLoadImage alt="Sad image" src={sadImage} />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (store: RootState) => {
  const {
    jokes: {
      categoryTypeValue,
      categoriesList,
      blacklist,
      jokeType,
      searchValue,
      amountValue,
      isCategoriesRedBorder,
    },
  } = store;

  return {
    jokesState: store.jokes,
    categoryTypeValue,
    categoriesList,
    blacklist,
    jokeType,
    searchValue,
    amountValue,
    isCategoriesRedBorder,
  };
};

const mapDispatchToProps = {
  changeCategoryType: (value: string) => changeCategoryType(value),
  changeCategories: (value: string) => changeCategories(value),
  changeBlackList: (value: string) => changeBlackList(value),
  changeJokeType: (value: string) => changeJokeType(value),
  changeSearchValue: (value: string) => changeSearchValue(value),
  changeAmountValue: (value: string) => changeAmountValue(value),
  resetFilters,
  showCategoriesRedBorder: (bool: boolean) => showCategoriesRedBorder(bool),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(JokesFilters);
