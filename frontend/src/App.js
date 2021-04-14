import React, { Component } from 'react';
import './App.css';
import Landing from './Pages/LandingandLogin/Landing';
import {Route, Switch} from 'react-router-dom';
import MainPage from "./Pages/Home/MainPage.jsx";
import ProtectedRoute from './Pages/LandingandLogin/ProtectedRoute';
import MerchandiseStore from './Pages/MerchandiseStore/MerchandiseStore';
import Checkout from './Pages/Checkout/Checkout';

class App extends Component {

  render() {
    const BASE_URL = "https://securegw-stage.paytm.in";
    const url = BASE_URL + '/theia/processTransaction';
    return (
      <Switch>
        <ProtectedRoute path="/user" component={MainPage} />
        <Route path="/store" component={MerchandiseStore} />
        <Route path="/checkout" component={Checkout} />
        <Route exact path={url} render={<h1>URL</h1>} />
        <Route exact path="/" component={Landing} />
      </Switch>
    );
  }
}

export default App;