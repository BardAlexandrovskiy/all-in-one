import React from "react";

class JokesFilters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectCategoryValue: "any",
    };
  }

  render() {
    const { selectCategoryValue } = this.props;

    return (
      <section className="jokes-filters">
        <div className="container filters-container">
          <h1 className="title">Get a joke</h1>
          <form className="filters">
            <div className="select-category-wrapper">
              <label for="select-category">Category</label>
              <select value={selectCategoryValue} id="select-category">
                <option value="any">Any</option>
                <option value="custom">Custom</option>
              </select>
            </div>
          </form>
        </div>
      </section>
    );
  }
}
