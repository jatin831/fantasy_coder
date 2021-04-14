import React, { Component } from 'react';
import { BrowserRouter,Switch, Route, Redirect, Link, withRouter, useRouteMatch ,useParams} from "react-router-dom";
import Contests from '../ContestList/ContestPage';
import Problemlist from '../ProblemList/ProblemList';
import auth from "../LandingandLogin/auth";
import ProtectedRoute from '../LandingandLogin/ProtectedRoute';

class MainPage extends Component {
  state = {}
  render() {
    const { path } = this.props.match;
    return (
      <>
        <h1>Main Page after Login</h1>
        <ul>
          <li>
            <Link to="/user/contests" className="text-dark link">Contests</Link>
          </li>
          <li>
            <Link to="/user/problems" className="text-dark link">Problems</Link>
          </li>
        </ul>
        <button onClick={() => {
          auth.logout(() => {
            this.props.history.push("/");
          });
        }}>
          Logout
        </button>
          <hr />

        <Switch>
          <ProtectedRoute path="/user" exact component={Contests} />
          <ProtectedRoute path="/user/contests" exact component={Contests} />
          <ProtectedRoute path="/user/problems" exact component={Problemlist} />
          
        </Switch>
      </>
    );
  }
}
export default withRouter(MainPage);