import React, { Component } from 'react';
import './App.css';
import Landing from './LandingandLogin/Landing';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import MainPage from "./components/MainPage";
import Contests from './components/ContestPage';
import Problemlist from './components/ProblemList';
import ProtectedRoute from './LandingandLogin/ProtectedRoute';
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route exact path="/" component={Landing} />
        <MainPage />
        <Switch>
          <ProtectedRoute exact path="/contests" component={Contests}/>
          <ProtectedRoute exact path="/problems" component={Problemlist}/>
        </Switch>
      </BrowserRouter>
      // <>
      //   {/* <Contests />
      //   <Problemlist /> */}
      //   <BrowserRouter>
      //     <h1>Main Page after Login</h1>
      //     <ul>
      //       <li>
      //         <Link to="/contests" className="text-dark">Contests</Link>
      //       </li>
      //       <li>
      //         <Link to="/problems" className="text-dark">Problems</Link>
      //       </li>
      //     </ul>

      //     <hr />
      //     <Switch>
      //       <Route path="/contests" >
      //         <Contests />
      //       </Route>
      //       <Route exact path="/problems">
      //         <Problemlist />
      //       </Route>
      //     </Switch>
      //   </BrowserRouter>
      // </>
    );
  }
}

export default App;