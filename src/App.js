/*Libray Imports*/
import React from "react";
import { Provider } from "react-redux";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

/*Component Imports*/
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Home from "./Components/Home/Home";
import Cart from "./Components/Cart/Cart";

/*Store import*/
import configureStore from "./redux/store";
import Search from "./Components/Search/Search";

function App() {
  const store = configureStore();
  return (
    <Provider store={store}>
      <Router basename="/">
        <Header />
        <Switch>
          <Route path="/" exact strict component={Home} />
          <Route path="/cart" exact strict component={Cart} />
          <Route path="/search" exact strict component={Search} />
          <Route component={Home} />
        </Switch>
      </Router>
      <Footer />
    </Provider>
  );
}

export default App;
