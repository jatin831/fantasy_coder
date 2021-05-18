import React from 'react';
import mapDiscountToCoins from '../../mapDiscountToCoins';
import CoinImg from '../../../assets/img/coin.png';
import './CheckoutDetails.css';
import { connect } from "react-redux";

const CheckoutDetails = (props) => {
    let totalPrice = props.cartProducts.reduce((total, el) => total + (el.quantity * el.perUnitPrice), 0).toFixed(2);
    return (
        <div style={{...props.style}} className="Checkout-Details">
            <h3 className="mb-5 text-sm-22 ml-3">&#8377;{totalPrice}</h3>
            {
                props.cartProducts.map(item => {
                            return (
                                <div key={item.uniqueKey} className="CartItem border-bottom-0 pl-3">
                                    <div className="ImgContainer">
                                        <img src={item.img}></img>
                                        <span className="ItemQuantity text-sm-12">{item.quantity}</span>
                                    </div>

                                    <div className="ProdDesc ml-3">
                                        <div className="ItemName"><a className="text-sm-14" href={'/store/' + item.id}>{item.name}</a></div>
                                        <div className="ItemCategory text-sm-13">{item.category}</div>
                                        <div className="ItemDesc text-sm-14">&#8377;{item.perUnitPrice}</div>
                                        {/* <div className="ItemDesc text-sm-14">${item.perUnitPrice} - {capitalize(item.color)} - {item.size}</div> */}
                                    </div>

                                    <div className="Controls justify-content-center text-sm-16">
                                        &#8377;{(item.quantity * item.perUnitPrice).toFixed(2)}
                                    </div>
                                    
                                </div>
                            )
                        })
            }
            <hr />
            <div className="ShippingDetails text-sm-14">
                <div className="d-flex justify-content-between px-3 my-3">
                    <div className="">
                        Shipping Method
                    </div>
                    <div>
                        Delivery
                    </div>
                </div>
                <div className="d-flex justify-content-between px-3 my-3">
                    <div>
                        Subtotal
                    </div>
                    <div>
                        &#8377;{totalPrice}
                    </div>
                </div>
                <div className="d-flex justify-content-between px-3 my-3">
                    <div>
                        Coins Used
                    </div>
                    <div>
                        {props.coinsUsed} <img className="Cart_CoinImg" src={CoinImg} />
                    </div>
                </div>
                <div className="d-flex justify-content-between px-3 my-3">
                    <div>
                        You Saved
                    </div>
                    <div>
                        &#8377;{(totalPrice * props.discount * 0.01).toFixed(2)} ({props.discount}%)
                    </div>
                </div>
                <hr />
                <div className="d-flex justify-content-between px-3 TotalShippingPrice">
                    <div>
                        Total
                    </div>
                    <div>
                        &#8377;{(totalPrice * (1 - props.discount * 0.01)).toFixed(2)}
                    </div>
                </div>
            </div>
        </div>
    )   
}

const mapStateToProps = state => {
    return {
        cartProducts: state.cart.cartProducts,
        discount: state.cart.discount,
        coinsUsed: state.cart.coinsUsed,
    }
}

export default connect(mapStateToProps)(CheckoutDetails);