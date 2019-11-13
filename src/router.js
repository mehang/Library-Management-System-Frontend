import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import 'antd/dist/antd.css';
import Author from "./components/Author";
import Book from "./components/Book";
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";

export default function RouterConfig() {
    return (
      <BrowserRouter>
          <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/author" component={Author} />
              <Route exact path="/book" component={Book} />
              <Route exact path="/login" component={LoginForm} />
          </Switch>
      </BrowserRouter>
    );
}