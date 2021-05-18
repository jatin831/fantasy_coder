import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';

import Store from './Store/Store';
import ProdDesc from './ProdDesc/ProdDesc';
import Header from './Header/Header';
import Cart from './Cart/Cart';
import Orders from './Orders/Orders';
import './ResponsiveTexts.css';
import OrderDetails from './OrderDetails/OrderDetails';

class MerchandiseStore extends Component {

    // state = {
    //     currProduct: {},
    //     cartProducts: [],
    //     totalItems: 0,
    // }

    render() {

        return ( 
            <>
                <Header totalItems = {this.props.totalItems} />
                <Switch>
                    <Route path='/store' exact component={Store} />
                    <Route path='/store/cart' exact render={() => (
                        <Cart />
                    )} 
                    />
                    <Route path='/store/orders' exact render = {() => (
                        <Orders />
                    )} />
                    <Route path='/store/orders/:id' render = {() => (
                        <OrderDetails />
                    )} />
                    <Route path='/store/category/:id' exact component = {Store} />
                    <Route path='/store/product/:id' component = {ProdDesc}/>
                </Switch>
            </>
         );

        
    }
} 

const mapStateToProps = state => {
    return {
        totalItems: state.cart.totalItems
    }
}

export default connect(mapStateToProps)(withRouter(MerchandiseStore));