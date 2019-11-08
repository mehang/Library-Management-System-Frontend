import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Author from "./components/Author";
import Book from "./components/Book";
import Home from "./components/Home";

export default function RouterConfig() {
    return (
      <BrowserRouter>
          <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/author" component={Author} />
              <Route exact path="/book" component={Book} />
          </Switch>
      </BrowserRouter>
    );
}