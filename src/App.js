import { Provider } from "react-redux";
import { ParallaxProvider } from "react-scroll-parallax";
import Router from "./router";
import store from "./store";

const App = () => {
  return (
    <ParallaxProvider>
      <Provider store={store}>
        <Router />
      </Provider>
    </ParallaxProvider>
  );
};

export default App;
