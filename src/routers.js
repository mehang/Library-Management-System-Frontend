import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Author from "./components/Author";
import Book from "./components/Book";

export default function RouterConfig() {
    return (
      <BrowserRouter>
          <Switch>
              <Route exact path="/" />
              <Route exact path="/author" component={Author} />
              <Route exact path="/book" component={Book} />
          </Switch>
      </BrowserRouter>
    );
}