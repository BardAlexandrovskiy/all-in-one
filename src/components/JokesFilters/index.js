import React from "react";

class JokesFilters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryTypeValue: "any",
      categoriesList: [
        { value: "Programming", isCheck: false },
        { value: "Miscellaneous", isCheck: false },
        { value: "Dark", isCheck: false },
        { value: "Pun", isCheck: false },
        { value: "Spooky", isCheck: false },
        { value: "Christmas", isCheck: false },
      ],
      blacklist: [
        { value: "nsfw", isCheck: false },
        { value: "religious", isCheck: false },
        { value: "political", isCheck: false },
        { value: "racist", isCheck: false },
        { value: "sexist", isCheck: false },
        { value: "explicit", isCheck: false },
      ],
      jokeType: [
        { value: "both", isCheck: true },
        { value: "single", isCheck: false },
        { value: "twopart", isCheck: false },
      ],
      searchValue: "",
      amountJokes: 1,
    };
  }

  handleChangeCategoryType = (event) => {
    this.setState({ categoryTypeValue: event.target.value });
  };

  handleChangeCategories = (value) => {
    const { categoriesList } = this.state;

    const updatedCategoriesList = categoriesList.map((category) => {
      if (category.value === value) {
        return { ...category, isCheck: !category.isCheck };
      } else return category;
    });

    this.setState({ categoriesList: updatedCategoriesList });
  };

  handleChangeBlacklist = (value) => {
    const { blacklist } = this.state;

    const updatedBlacklist = blacklist.map((item) => {
      if (item.value === value) {
        return { ...item, isCheck: !item.isCheck };
      } else return item;
    });

    this.setState({ blacklist: updatedBlacklist });
  };

  handleChangeJokeType = (value) => {
    const { jokeType } = this.state;

    const updatedJokeType = jokeType.map((item) => {
      if (item.value === value) {
        return { ...item, isCheck: true };
      } else return { ...item, isCheck: false };
    });

    this.setState({ jokeType: updatedJokeType });
  };

  handleChangeSearchInput = (event) => {
    this.setState({ searchValue: event.target.value });
  };

  handleChangeAmountInput = (event) => {
    let number = event.target.value;

    console.log(number);

    if (number > 10) {
      number = 10;
    } else if (number < 1) {
      number = 1;
    }

    this.setState({ amountJokes: number });
  };

  render() {
    const {
      categoryTypeValue,
      categoriesList,
      blacklist,
      jokeType,
      searchValue,
      amountJokes,
    } = this.state;

    return (
      <section className="jokes-filters">
        <div className="container filters-container">
          <h1 className="title">Get a joke</h1>
          <form className="filters">
            <div className="cetegories">
              <h2>Select category / categories</h2>
              <label htmlFor="select-category">Category</label>
              <select
                onChange={this.handleChangeCategoryType}
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
                    const id = `categoty-${index}`;

                    return (
                      <div key={value} className="checkbox-wrapper">
                        <label htmlFor={id}>{value}</label>
                        <input
                          checked={isCheck}
                          type="checkbox"
                          value={value}
                          id={id}
                          onChange={() => this.handleChangeCategories(value)}
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
                      value={value}
                      id={id}
                      onChange={() => this.handleChangeBlacklist(value)}
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
                      value={value}
                      id={id}
                      onChange={() => this.handleChangeJokeType(value)}
                    />
                  </div>
                );
              })}
            </div>
            <div className="search-joke">
              <h2>Search for a joke that contains this search string</h2>
              <div className="input-wrapper">
                <input
                  onChange={this.handleChangeSearchInput}
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
                  onChange={this.handleChangeAmountInput}
                  type="number"
                  value={amountJokes}
                />
              </div>
            </div>
          </form>
        </div>
      </section>
    );
  }
}

export default JokesFilters;
