import React, { Component } from 'react';
import { Switch, Route, Redirect, Link,withRouter } from "react-router-dom";
import Contests from './ContestPage';
import Problemlist from './ProblemList';
import Landing from "../LandingandLogin/Landing";
import auth from "../LandingandLogin/auth";
class MainPage extends Component {
  state = {}
  render() {
    return (
      <>
        <h1>Main Page after Login</h1>
        <ul>
          <li>
            <Link to="/contests" className="text-dark">Contests</Link>
          </li>
          <li>
            <Link to="/problems" className="text-dark">Problems</Link>
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

        {/* <Contests/>
        <Problemlist/>
        <Switch>
          
        </Switch> */}
      </>
    );
  }
}

export default withRouter(MainPage);