import * as ReactDOMClient from "react-dom/client";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import "./assets/styles/styles.scss";

const root = ReactDOMClient.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<App />);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
