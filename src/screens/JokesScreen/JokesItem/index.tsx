import { JokesItem as JokesItemType } from "../../../reducers/jokes";
import "./styles.scss";

type Props = {
  jokeInfo: JokesItemType;
};

const JokesItem = ({ jokeInfo }: Props) => {
  const { category, flags, joke, setup, delivery } = jokeInfo;
  const selectedFlags: string[] = [];
  if (flags) {
    const flagsList = Object.keys(flags);

    flagsList.forEach((item, index) => {
      if (flags[item as keyof typeof flags]) {
        selectedFlags.push(flagsList[index]);
      }
    });
  }

  return (
    <div className="jokes-item">
      {!!category && <div className="category">{`Category: ${category}`}</div>}
      {!!selectedFlags.length && (
        <div className="flags-List">
          {"Flags: "}
          {selectedFlags.map((flag, index) => {
            if (selectedFlags.length - 1 > index) {
              return flag + ", ";
            } else {
              return flag;
            }
          })}
        </div>
      )}
      {setup && delivery && (
        <div className="text twopart">
          <p>{setup}</p>
          <p>{delivery}</p>
        </div>
      )}
      {joke && (
        <div className="text">
          <p>{joke}</p>
        </div>
      )}
    </div>
  );
};

export default JokesItem;
