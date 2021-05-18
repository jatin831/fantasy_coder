import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Transaction.css';
import { Route, Switch } from 'react-router-dom';
import * as actions from '../ReduxStore/slices/cartSlice';
import TransactionFailed from './TransactionFailed/TransactionFailed';
import TransactionPending from './TransactionPending/TransactionPending';
import TransactionSuccess from './TransactionSuccess/TransactionSuccess';
import { motion } from "framer-motion";

const variants = {
    initial: { opacity: 0, x: 300 },
    animate: { opacity: 1, x: 0 },
    transition: {
        type: "tween",
        duration: "150",
        delay: "2"
    }
}

class Transaction extends Component {

    state = {
        transId: "ABCD1234#902837",
        orderId: "jKsdM1231245",
        transDate: "18-04-2021",
        transTime: "2:34PM"
    }

    render() {
        console.log(this.props);
        let displayOutput = null;
        if (this.state.status === "success") {
            displayOutput = (
                <TransactionSuccess  
                    cartProducts={this.props.cartProducts}
                    date={this.state.transDate}
                    time={this.state.transTime}
                    id={this.state.transId}
                    orderId={this.state.orderId} />
            )
        } else if (this.state.status === "failed") {
            displayOutput = (
                <TransactionFailed
                    orderId={this.state.orderId} />
            )
        } else if (this.state.status === "pending") {
            displayOutput = <TransactionPending />
        }

        return (
            <div className="BackgroundCover">
                <div className="container z-index-1600">
                    <div className="Transaction py-5 row">
                        <div className="col-11 col-md-10 col-lg-8 px-0 d-flex justify-content-center align-items-center mx-auto">
                            <motion.div  
                                variants = {variants}
                                initial = "initial"
                                animate = "animate"
                                className="Transaction-Box d-flex flex-column align-items-center justify-content-center">
                                <Switch>
                                    <Route path="/transaction/success" render={() =>
                                        <TransactionSuccess  
                                            cartProducts={this.props.cartProducts}
                                            date={this.state.transDate}
                                            time={this.state.transTime}
                                            id={this.state.transId}
                                            orderId={this.state.orderId} 
                                        />} 
                                    />
                                    <Route path="/transaction/fail" render={() =>
                                        <TransactionFailed 
                                            orderId={this.state.orderId} 
                                        />} 
                                    />
                                    <Route path="/transaction/pending" render={() =>
                                        <TransactionPending  />} 
                                    />
                                </Switch>
                                {displayOutput}
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        cartProducts: state.cart.cartProducts
    }
}

export default connect(mapStateToProps)(Transaction);