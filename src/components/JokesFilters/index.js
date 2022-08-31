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
  getJokes,
  resetFilters,
} from "../../actions/jokes";
import "./styles.scss";
import { CSSTransition } from "react-transition-group";

// Jokes backgrounds
import filtersBackground from "../../assets/images/jokes/jokes-background-2.jpg";
import happyImage from "../../assets/images/jokes/happy.svg";
import neutralImage from "../../assets/images/jokes/neutral.svg";
import sadImage from "../../assets/images/jokes/sad.svg";

class JokesFilters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCategoriesRedBorder: false,
    };
  }

  handleBlurAmountInput = () => {
    const { amountValue, changeAmountValue } = this.props;

    if (amountValue > 10) {
      changeAmountValue(10);
    } else if (amountValue < 1) {
      changeAmountValue(1);
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const {
      categoryTypeValue,
      categoriesList,
      blacklist,
      jokeType,
      searchValue,
      amountValue,
      getJokes,
    } = this.props;

    // Create request
    let request = "https://v2.jokeapi.dev/joke/";
    const requestOptions = [];
    let areSelectedCategories = false;

    if (categoryTypeValue === "Any") {
      areSelectedCategories = true;
      request += "Any";
    }

    if (categoryTypeValue === "Custom") {
      const selectedCategories = categoriesList.filter(
        ({ isCheck }) => isCheck
      );

      if (selectedCategories.length) {
        areSelectedCategories = true;
        selectedCategories.forEach(({ value }, index) => {
          if (index < selectedCategories.length - 1) {
            request += `${value},`;
          } else {
            request += value;
          }
        });
      }
    }

    if (areSelectedCategories) {
      const blacklistSelected = blacklist.filter(({ isCheck }) => isCheck);
      let blacklistOptios = "";

      if (blacklistSelected.length) {
        blacklistOptios += "blacklistFlags=";
        blacklistSelected.forEach(({ value }, index) => {
          if (index < blacklistSelected.length - 1) {
            blacklistOptios += `${value},`;
          } else {
            blacklistOptios += value;
          }
        });

        requestOptions.push(blacklistOptios);
      }

      const jokeTypeSelected = jokeType.filter(({ isCheck }) => isCheck);
      const currentJokeType = jokeTypeSelected[0].value;

      if (currentJokeType === "single" || currentJokeType === "twopart") {
        requestOptions.push(`type=${currentJokeType}`);
      }

      if (searchValue) {
        requestOptions.push(`contains=${searchValue}`);
      }

      if (amountValue > 1) {
        requestOptions.push(`amount=${amountValue}`);
      }

      if (requestOptions.length) {
        request += "?";
        requestOptions.forEach((option, index) => {
          if (index < requestOptions.length - 1) {
            request += `${option}&`;
          } else {
            request += option;
          }
        });
      }

      getJokes(request);
    } else {
      this.setState({ isCategoriesRedBorder: true });
      setTimeout(() => {
        this.setState({ isCategoriesRedBorder: false });
      }, 3000);
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
    } = this.props;

    const { isCategoriesRedBorder } = this.state;

    return (
      <section className="jokes-filters">
        <img className="filters-background" src={filtersBackground} />
        <div className="container filters-container">
        <h1 className="title"><img className="left-image" src={neutralImage} /><span>Get jokes</span><div className="right-images"><img className="happy-image" src={happyImage} /><img className="sad-image" src={sadImage} /></div></h1>
          <div className="left-column">
          <img className="happy-image" src={happyImage} />
          <img className="neutral-image" src={neutralImage} />
          </div>
          <div class="center-column">
          <form onSubmit={this.handleSubmit} className="filters">
            <div className="cetegories joke-options">
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
                    isCategoriesRedBorder ? " red-border" : ""
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
              <button type="submit" className="button submit-button">
                Submit
              </button>
            </div>
          </form>
          </div>
          <div className="right-column">
          <img className="sad-image" src={sadImage} />
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
  getJokes: (request) => getJokes(request),
};

export default connect(mapStateToProps, mapDispatchToProps)(JokesFilters);
