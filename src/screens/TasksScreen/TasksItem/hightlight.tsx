type Props = {
  otherValue: string;
  hightlightValue: String;
};

const Hightlight = ({ otherValue, hightlightValue }: Props) => {
  return (
    <>
      {otherValue}
      <span className={"hightlight notranslate"}>{hightlightValue}</span>
    </>
  );
};

export default Hightlight;
