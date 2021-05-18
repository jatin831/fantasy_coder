import React, { Component } from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from './Pages/ReduxStore/slices/cartSlice';
import Landing from './Pages/LandingandLogin/Landing';
import MainPage from "./Pages/Home/MainPage.jsx";
import ProtectedRoute from './Pages/LandingandLogin/ProtectedRoute';
import MerchandiseStore from './Pages/MerchandiseStore/MerchandiseStore';
import Checkout from './Pages/Checkout/Checkout';
import Transaction from './Pages/Transaction/Transaction';

class App extends Component {

  componentDidMount() {
    this.props.loadCart();
  }

  render() {
    const BASE_URL = "https://securegw-stage.paytm.in";
    const url = BASE_URL + '/theia/processTransaction';
    return (
      <Switch>
        <ProtectedRoute path="/user" component={MainPage} />
        <Route path="/store" component={MerchandiseStore} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/transaction" component={Transaction} />
        <Route exact path="/" component={Landing} />
      </Switch>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
      loadCart: () => dispatch(actions.loadCart())
  }
}

export default connect(null, mapDispatchToProps)(App);