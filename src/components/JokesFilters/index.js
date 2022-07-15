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

  render() {
    const { categoryTypeValue, categoriesList, blacklist } = this.state;

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
                        <label id={id} htmlFor={`checkbox${value}`}>
                          {value}
                        </label>
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
                const id = `blacklist-item-${index}`;

                return (
                  <div key={value} className="checkbox-wrapper">
                    <label id={id} htmlFor={`checkbox${value}`}>
                      {value}
                    </label>
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
          </form>
        </div>
      </section>
    );
  }
}

export default JokesFilters;
