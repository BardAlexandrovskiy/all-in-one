import { useState } from "react";
import "./styles.scss";

type Props = {
  src: string;
  alt?: string;
  transitionTime?: string;
  className?: string;
  callbackRef?: (ref: HTMLImageElement | null) => void;
  refObject?: React.RefObject<HTMLImageElement>;
};

const LazyLoadImage = ({
  src,
  alt,
  className,
  callbackRef,
  refObject,
}: Props) => {
  const [isLoaded, setLoad] = useState(false);

  let ref = null;

  if (callbackRef) {
    ref = callbackRef;
  } else if (refObject) {
    ref = refObject;
  } else {
    ref = null;
  }
  return (
    <img
      className={`lazyload-image${isLoaded ? " loaded" : ""}${
        className ? " " + className : ""
      }`}
      onLoad={() => setLoad(true)}
      src={src}
      alt={alt ? alt : ""}
      ref={ref ? ref : null}
    />
  );
};

export default LazyLoadImage;
