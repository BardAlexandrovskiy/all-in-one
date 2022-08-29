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

class JokesFilters extends React.Component {
  handleBlurAmountInput = () => {
    const { amountValue, changeAmountValue } = this.props;

    if (amountValue > 10) {
      changeAmountValue(10);
    } else if (amountValue < 1) {
      changeAmountValue(1);
    }
  };

  handleSubmit = (event) => {
    // event.preventDefault();
    // console.log("submit");
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
                <option value="any">Any</option>
                <option value="custom">Custom</option>
              </select>
              {categoryTypeValue === "custom" && (
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
};

export default connect(mapStateToProps, mapDispatchToProps)(JokesFilters);
