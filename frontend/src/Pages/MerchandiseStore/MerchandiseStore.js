import React, { Component } from 'react';
import Store from './Store/Store';
import ProdDesc from './ProdDesc/ProdDesc';
import { Route, Switch } from 'react-router-dom';
import Header from './Header/Header';
import CartItems from './Cart/CartItems/CartItems';
import Cart from './Cart/Cart';
import './ResponsiveTexts.css';
import { connect } from 'react-redux';
import * as actions from '../ReduxStore/slices/cartSlice';

class MerchandiseStore extends Component {

    // state = {
    //     currProduct: {},
    //     cartProducts: [],
    //     totalItems: 0,
    // }

    componentDidMount() {
        this.props.loadCart();
    }

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
                    <Route path='/store/:id' render = {() => (
                        <ProdDesc />
                    )} />
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

const mapDispatchToProps = dispatch => {
    return {
        loadCart: () => dispatch(actions.loadCart()) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MerchandiseStore);