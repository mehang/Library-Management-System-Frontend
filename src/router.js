import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import 'antd/dist/antd.css';
import AuthorPage from "./components/AuthorPage";
import BookPage from "./components/Book";
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import AdminPage from "./components/AdminPage";
import LibrarianPage from "./components/LibrarianPage";
import StudentForm from "./components/Student/StudentForm";
import StudentTable from "./components/Student/StudentTable";
import StudentVerificationForm from "./components/Student/StudentVerificationForm";
import BookSearchPage from "./components/BookSearchPage";
import SuccessPage from "./components/SuccessPage";
import Logout from "./components/Logout";
import UnAuthorizedPage from "./components/UnauthorizedPage";

export default function RouterConfig() {
    return (
      <BrowserRouter>
          <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/search" component={BookSearchPage} />
              <Route exact path="/student-verification" component={StudentVerificationForm}/>
              <Route exact path="/login" component={LoginForm} />
              <Route exact path="/registration" component={StudentForm} />
              <Route exact path="/profile" component={StudentTable} />
              <Route exact path="/student" component={StudentTable} />
              <Route exact path="/admin" component={AdminPage} />
              <Route exact path="/librarian" component={LibrarianPage} />
              <Route exact path="/author" component={AuthorPage} />
              <Route exact path="/book" component={BookPage} />
              <Route exact path="/logout" component={Logout} />
              <Route exact path="/success" component={SuccessPage} />
              <Route exact path="/unauthorized" component={UnAuthorizedPage}/>
          </Switch>
      </BrowserRouter>
    );
}