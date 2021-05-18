import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setDiscount } from '../../ReduxStore/slices/cartSlice';
import './Cart.css';
import CartSummary from './CartSummary/CartSummary';
import { NavLink } from 'react-router-dom';
import CoinImg from '../../../assets/img/coin.png';
import Form from "react-bootstrap/Form";
import axios from 'axios';

class Cart extends Component {
    constructor(props) {
        super(props)
    }

    state = {
        discount: 0,
        coinsUsed: 0,
        initialCoins: 0,
        totalAmount: null
    }

    componentDidMount() {
        this.setState({
            discount: this.props.discount,
            coinsUsed: this.props.coinsUsed
        })
        axios.post('https://server.codeium.tech/coins', {username: "test5"})
            .then(res => {
                this.setState({
                    initialCoins: res.data.msg[0].u_coins
                })
            })
            .catch(err => {
                console.log(err);
            })
        this.updateTotalAmount();
    }

    componentDidUpdate(prevProps) {
        if(prevProps.cartItems !== this.props.cartItems) {
            this.updateTotalAmount()
            if(prevProps.cartItems.length != 0) {
                this.props.onChangeDiscount({
                    discount: 0,
                    coinsUsed: 0
                });
            }
            
        }
        if(prevProps.discount !== this.props.discount) {
            this.setState({
                discount: this.props.discount,
                coinsUsed: this.props.coinsUsed
            })
        }
    }

    updateTotalAmount() {
        const totalAmount = this.calcTotal(this.props.cartItems);
        this.setState({
            totalAmount: totalAmount,
        })
    }

    calcTotal = (cartItems) => {
        return (cartItems.reduce((total, el) => total + (el.quantity * parseFloat(el.perUnitPrice)), 0));
    }

    selectDiscountHandler = (event) => {
        const discount = event.target.value;
        this.setState({
            discount: discount,
            coinsUsed: Math.round(this.state.totalAmount * discount * 0.01)
        })
        this.props.onChangeDiscount({
            discount: discount,
            coinsUsed: Math.round(this.state.totalAmount * discount * 0.01)
        });
        console.log(Math.round(this.state.totalAmount * discount * 0.01));
    }

    render() {
        let possibleOptions = [];
        let curDis = 10;
        if(this.state.totalAmount) {
            while((curDis * 0.01 * this.state.totalAmount) < this.state.initialCoins && curDis <= 50)
            {
                possibleOptions.push({
                    discount: curDis,
                    coins: Math.round(curDis * 0.01 * this.state.totalAmount)
                })
                curDis += 10;
            }
        }
        // console.log(this.props.cartItems);
        return (
            <div className="Cart ">
                <div className="CartContainer">   
                    <div className="Head">
                        <h6>YOUR CART</h6>
                    </div>
                    <div className="row mx-0 mt-4 justify-content-around">
                        <div className="col-12 col-md-6 p-0">
                            <CartSummary updateAmount={this.updateTotalAmount}
                                {...this.props}
                            />
                        </div>
                        <div className="col-12 col-md-5 p-0">
                            <div className="Checkout mx-auto">
                                <div className="d-flex flex-column align-items-center px-3 px-sm-5 py-4 Checkout-Box">
                                    <div className="Cart-Subtotal">
                                        <span>Subtotal</span>
                                        <span>&#8377;{this.state.totalAmount?.toFixed(2)}</span>
                                    </div>
                                    <div className="Cart-Shipping">
                                        <span>Discount {this.state.discount != 0 ? `(${this.state.discount}%)` : null}</span>
                                        <span>&#8377;{(this.state.totalAmount * this.state.discount * 0.01)?.toFixed(2)}</span>
                                        {
                                            this.state.discount != 0 ? (
                                                <span className="Cart_CoinsUsed">{this.state.coinsUsed}<img src={CoinImg} alt="Coins" /></span>
                                            ) : null
                                        }
                                        
                                    </div>
                                    <div className="Cart-Total">
                                        <span>Total</span>
                                        <span>&#8377;{(this.state.totalAmount * (1 - this.state.discount * 0.01)).toFixed(2)}</span>
                                    </div>
                                    <Form className="Cart_Discount">
                                        <Form.Group controlId="exampleForm.SelectCustom">
                                            <Form.Label className="Cart_CoinContainers">Your Coins: <span className="Cart_Coins">{this.state.initialCoins}<img className="Cart_CoinImg" src={CoinImg} alt="Coins" /></span></Form.Label>
                                            <Form.Control value={this.state.discount} className="Cart_RedeemCoins" onChange={this.selectDiscountHandler} as="select" custom>
                                                <option value={0} disabled={this.state.discount != 0}>Redeem coins to get discount</option>
                                                
                                                <option value={0}>0% discount @ 0coins</option>
                                                {
                                                    possibleOptions.map(option => (
                                                        <option key = {option.discount} value={option.discount} >
                                                            {option.discount}% discount @ {option.coins}coins
                                                        </option>
                                                    ))
                                                }
                                            </Form.Control>
                                        </Form.Group>
                                    </Form>
                                    <div className="Cart-CheckoutBtn">
                                        <NavLink to='/checkout' role="button" className="btn py-2 btn-dark btn-block">CHECKOUT</NavLink>
                                    </div>
                                </div>
                                
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        cartItems: state.cart.cartProducts,
        discount: state.cart.discount,
        coinsUsed: state.cart.coinsUsed
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onChangeDiscount: (discountObj) => dispatch(setDiscount(discountObj)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);