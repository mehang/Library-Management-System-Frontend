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
import BookSearch from "./components/BookSearch";
import SuccessPage from "./components/SuccessPage";
import Logout from "./components/Logout";
import UnAuthorizedPage from "./components/UnauthorizedPage";
import ProfilePage from "./components/ProfilePage";
import PasswordChangePage from "./components/PasswordChange/PasswordChangePage";
import CategoryPage from "./components/CategoryPage";
import BookRequest from "./components/BookRequest";
import BookIssue from "./components/BookIssue";
import BookReturn from "./components/BookReturn";
import BookHistory from "./components/BookHistory";
import StudentHistory from "./components/StudentHistory";
import PasswordForgotForm from "./components/PasswordForgotForm";
import PasswordResetPage from "./components/PasswordChange/PasswordResetPage";

export default function RouterConfig() {
    return (
      <BrowserRouter>
          <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/search" component={BookSearch} />
              <Route exact path="/student-verification" component={StudentVerificationForm}/>
              <Route exact path="/login" component={LoginForm} />
              <Route exact path="/registration" component={StudentForm} />
              <Route exact path="/change-password" component={PasswordChangePage}/>
              <Route exact path="/forgot-password" component={PasswordForgotForm}/>
              <Route exact path="/reset-password" component={PasswordResetPage}/>
              <Route exact path="/profile" component={ProfilePage} />
              <Route exact path="/student" component={StudentTable} />
              <Route exact path="/admin" component={AdminPage} />
              <Route exact path="/librarian" component={LibrarianPage} />
              <Route exact path="/author" component={AuthorPage} />
              <Route exact path="/book" component={BookPage} />
              <Route exact path="/book-request" component={BookRequest}/>
              <Route exact path="/book-issue" component={BookIssue}/>
              <Route exact path="/book-return" component={BookReturn}/>
              <Route exact path="/student-history" component={StudentHistory}/>
              <Route exact path="/book-history" component={BookHistory}/>
              <Route exact path="/category" component={CategoryPage} />
              <Route exact path="/logout" component={Logout} />
              <Route exact path="/success" component={SuccessPage} />
              <Route exact path="/unauthorized" component={UnAuthorizedPage}/>
          </Switch>
      </BrowserRouter>
    );
}