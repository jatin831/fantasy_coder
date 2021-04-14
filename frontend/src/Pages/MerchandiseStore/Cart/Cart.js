import React, { Component } from 'react';
import './Cart.css';
import CartSummary from './CartSummary/CartSummary';
import CartItems from './CartItems/CartItems';
import { NavLink } from 'react-router-dom';

class Cart extends Component {
    
    state = {
        TNCchecked: false
    }

    toggleTNCcheck = () => {
        const currStatus = this.state.TNCchecked;
        this.setState({TNCchecked: !currStatus});
    }

    calcTotal = (cartItems) => {
        return (cartItems.reduce((total, el) => total + (el.quantity * el.perUnitPrice), 0)).toFixed(2);
    }

    render() {
        let cartItems = CartItems();
        return (
            <div className="Cart ">
                <div className="CartContainer">   
                    <div className="Head">
                        <h6>YOUR CART</h6>
                    </div>
                    <div className="row mx-0 mt-4 justify-content-around">
                        <div className="col-12 col-md-6 p-0">
                            <CartSummary 
                                {...this.props}
                            />
                        </div>
                        <div className="col-12 col-md-5 p-0">
                            <div className="Checkout mx-auto">
                                <div className="d-flex flex-column align-items-center px-5 py-4 Checkout-Box">
                                    <div className="Cart-Subtotal">
                                        <span>Subtotal</span>
                                        <span>${this.calcTotal(cartItems)}</span>
                                    </div>
                                    <div className="Cart-Shipping">
                                        <span>Shipping</span>
                                        <span>$0.00</span>
                                    </div>
                                    <div className="Cart-Total">
                                        <span>Total</span>
                                        <span>${this.calcTotal(cartItems)}</span>
                                    </div>
                                    <div className="PromoCode">
                                        <input type="text" placeholder="Apply promo code here" className="Cart-Promo" />
                                        <button className="btn btn-dark px-4">Apply</button>
                                    </div>
                                    <div className="Cart-CheckoutBtn">
                                        <NavLink to='/checkout' role="button" className="btn py-2 btn-dark btn-block">CHECKOUT</NavLink>
                                    </div>
                                    <div className="TermsNCond">
                                        <div onClick={this.toggleTNCcheck} className="TNC-section d-flex">
                                            <div>
                                                <input onChange={this.toggleTNCcheck} checked={this.state.TNCchecked} type="checkbox"></input>
                                            </div>
                                            <div>
                                                <span>
                                                    I agree to the <a>Privacy Policy</a> and <a>Purchaser Terms &amp; Conditions</a>
                                                </span>
                                            </div>
                                            
                                        </div>
                                        
                                    </div>
                                    <div className="Checkout-PP">
                                        <button disabled={!this.state.TNCchecked}>
                                            CHECKOUT WITH 
                                            <span className="Paypal-Logo">
                                                <span style={{color: '#00457C'}}>Pay</span>
                                                <span style={{color: '#0079C1'}}>Pal</span>
                                            </span>
                                        </button>
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

export default Cart;