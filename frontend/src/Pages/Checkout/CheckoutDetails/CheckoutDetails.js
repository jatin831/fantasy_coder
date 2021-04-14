import React from 'react';
import CartItems from '../../MerchandiseStore/Cart/CartItems/CartItems';
import './CheckoutDetails.css';
import { connect } from "react-redux";

const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1); 
}

const CheckoutDetails = (props) => {
    console.log(props);
    let totalPrice = props.cartProducts.reduce((total, el) => total + (el.quantity * el.perUnitPrice), 0).toFixed(2);
    return (
        <div className="Checkout-Details">
            <h3 className="mb-5 text-sm-22 ml-3">${totalPrice}</h3>
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
                                        <div className="ItemDesc text-sm-14">${item.perUnitPrice} - {capitalize(item.color)} - {item.size}</div>
                                    </div>

                                    <div className="Controls justify-content-center text-sm-16">
                                        ${(item.quantity * item.perUnitPrice).toFixed(2)}
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
                        ${totalPrice}
                    </div>
                </div>
                <div className="d-flex justify-content-between px-3 my-3">
                    <div>
                        Shipping
                    </div>
                    <div>
                        $0.00
                    </div>
                </div>
                <hr />
                <div className="d-flex justify-content-between px-3 TotalShippingPrice">
                    <div>
                        Total
                    </div>
                    <div>
                        ${totalPrice}
                    </div>
                </div>
            </div>
        </div>
    )   
}

const mapStateToProps = state => {
    return {
        cartProducts: state.cart.cartProducts
    }
}

export default connect(mapStateToProps, null)(CheckoutDetails);