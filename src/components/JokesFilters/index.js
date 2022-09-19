import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { connect } from "react-redux";
import {
  changeAmountValue,
  changeBlackList,
  changeCategories,
  changeCategoryType,
  changeJokeType,
  changeSearchValue,
  resetFilters,
} from "../../actions/jokes";
import "./styles.scss";
import { CSSTransition } from "react-transition-group";

// Jokes images
import happyImage from "../../assets/images/jokes/happy.svg";
import neutralImage from "../../assets/images/jokes/neutral.svg";
import sadImage from "../../assets/images/jokes/sad.svg";
import JokesSubmitButton from "../JokesSubmitButton";

class JokesFilters extends React.Component {
  constructor(props) {
    super(props);
    this.categoriesRef = React.createRef();
  }

  handleBlurAmountInput = () => {
    const { amountValue, changeAmountValue } = this.props;

    if (amountValue > 10) {
      changeAmountValue(10);
    } else if (amountValue < 1) {
      changeAmountValue(1);
    }
  };

  handlePressEnterInput = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.target.blur();
    }
  };

  handleReset = (event) => {
    event.preventDefault();
    const { resetFilters } = this.props;
    resetFilters();
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
      changeSearchValue,
      changeAmountValue,
      isCategoriesRedBorder,
    } = this.props;

    return (
      <section className="jokes-filters">
        <div className="container filters-container">
          <h1 className="title">
            <img alt="" className="left-image" src={neutralImage} />
            <span>Get jokes</span>
            <div className="right-images">
              <img alt="" className="happy-image" src={happyImage} />
              <img alt="" className="sad-image" src={sadImage} />
            </div>
          </h1>
          <div className="left-column">
            <img alt="" className="happy-image" src={happyImage} />
            <img alt="" className="neutral-image" src={neutralImage} />
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
                    const { isCheck, value } = item;
                    const id = `blacklist-${index}`;

                    return (
                      <div key={value} className="checkbox-wrapper">
                        <label htmlFor={id}>{value}</label>
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
                    const { isCheck, value } = item;
                    const id = `joke-type-${index}`;

                    return (
                      <div key={value} className="radio-wrapper">
                        <label htmlFor={id}>{value}</label>
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
                    onKeyPress={this.handlePressEnterInput}
                    onChange={(e) => changeSearchValue(e.target.value)}
                    placeholder="Search string"
                    type="text"
                    value={searchValue}
                  />
                </div>
              </div>
              <div className="amount-jokes joke-options">
                <h2>Amount of jokes:</h2>
                <div className="input-wrapper">
                  <input
                    onChange={(e) => changeAmountValue(e.target.value)}
                    onKeyPress={this.handlePressEnterInput}
                    onBlur={this.handleBlurAmountInput}
                    type="number"
                    value={amountValue}
                    max="10"
                    min="1"
                  />
                </div>
              </div>
              <div className="buttons">
                <button
                  onClick={this.handleReset}
                  className="button reset-button"
                >
                  Reset all
                </button>
                <JokesSubmitButton text={"Submit"} />
              </div>
            </form>
          </div>
          <div className="right-column">
            <img alt="" className="sad-image" src={sadImage} />
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (store) => {
  const {
    jokes: {
      categoryTypeValue,
      categoriesList,
      blacklist,
      jokeType,
      searchValue,
      amountValue,
    },
  } = store;

  return {
    categoryTypeValue,
    categoriesList,
    blacklist,
    jokeType,
    searchValue,
    amountValue,
  };
};

const mapDispatchToProps = {
  changeCategoryType: (value) => changeCategoryType(value),
  changeCategories: (value) => changeCategories(value),
  changeBlackList: (value) => changeBlackList(value),
  changeJokeType: (value) => changeJokeType(value),
  changeSearchValue: (value) => changeSearchValue(value),
  changeAmountValue: (value) => changeAmountValue(value),
  resetFilters: () => resetFilters(),
};

export default connect(mapStateToProps, mapDispatchToProps)(JokesFilters);