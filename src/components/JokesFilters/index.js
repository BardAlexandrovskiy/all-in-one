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
      getJokes
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

      if (
        currentJokeType === "single" ||
        currentJokeType === "twopart"
      ) {
        requestOptions.push(`type=${currentJokeType}`);
      }

      if(searchValue) {
        requestOptions.push(`contains=${searchValue}`)
      }

      if(amountValue > 1) {
        requestOptions.push(`amount=${amountValue}`);
      }

      if(requestOptions.length) {
        request += '?';
        requestOptions.forEach((option, index) => {
            if(index < requestOptions.length - 1) {
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

    // getJokes(request);
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

    return (
      <section className="jokes-filters">
        <div className="container filters-container">
          <h1 className="title">Get a joke</h1>
          <form onSubmit={this.handleSubmit} className="filters">
            <div className="cetegories">
              <h2>Select category / categories</h2>
              <label htmlFor="select-category">Category</label>
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
              {categoryTypeValue === "Custom" && (
                <div className="categories-list">
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
              )}
            </div>
            <div className="blacklist">
              <h2>Select flags to blacklist</h2>
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
            <div className="joke-type">
              <h2>Select at least one joke type</h2>
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
            <div className="search-joke">
              <h2>Search for a joke that contains this search string</h2>
              <div className="input-wrapper">
                <input
                  onChange={(e) => changeSearchValue(e.target.value)}
                  placeholder="Search string"
                  type="text"
                  value={searchValue}
                />
              </div>
            </div>
            <div className="amount-jokes">
              <h2>Amount of jokes</h2>
              <div className="input-wrapper">
                <input
                  onChange={(e) => changeAmountValue(e.target.value)}
                  onBlur={this.handleBlurAmountInput}
                  type="number"
                  value={amountValue}
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
