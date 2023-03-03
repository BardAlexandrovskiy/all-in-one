import { connect, ConnectedProps } from "react-redux";
import { getJokes, showCategoriesRedBorder } from "../../../actions/jokes";
import { RootState } from "../../../reducers";

interface Props extends PropsFromRedux {
  text: string;
}

const JokesSubmitButton = (props: Props) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const {
      categoryTypeValue,
      categoriesList,
      blacklist,
      jokeType,
      searchValue,
      amountValue,
      getJokes,
      showCategoriesRedBorder,
    } = props;

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

      if (+amountValue > 1) {
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
      showCategoriesRedBorder(true);
    }
  };

  const { text } = props;

  return (
    <button onClick={handleClick} className="button submit-button">
      {text}
    </button>
  );
};

const mapStateToProps = (store: RootState) => {
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
  getJokes: (request: string) => getJokes(request),
  showCategoriesRedBorder: (bool: boolean) => showCategoriesRedBorder(bool),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(JokesSubmitButton);
