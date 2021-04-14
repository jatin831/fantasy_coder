import React from 'react';
import './CartSummary.css';
import { connect } from "react-redux";
import * as actions from "../../../ReduxStore/slices/cartSlice";

const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1); 
}

const CartSummary = (props) => {
    console.log(props.cartProducts);
    return (
        <div className="CartItems">
            <p className="ShipmentDate ">SHIPPING BY APR 27, 2021</p>
            {
                props.cartProducts.map(item => {
                    return (
                        <div key={item.uniqueKey} className="CartItem pl-3">
                            <div className="ImgContainer">
                                <img src={item.img}></img>
                            </div>

                            <div className="ProdDesc ml-3">
                                <div className="ItemName"><a href={'/store/' + item.id}>{item.name}</a></div>
                                <div className="ItemCategory">{item.category}</div>
                                <div className="ItemDesc">${item.perUnitPrice} - {capitalize(item.color)} - {item.size}</div>
                            </div>

                            <div className="Controls">
                                <div className="CartControls">
                                <button onClick={props.deleteFromCart.bind(this, item.uniqueKey)} className="RemoveItem">-</button>
                                <button className="ItemQuantity">{item.quantity}</button>
                                <button onClick={props.addToCart.bind(this, item)} className="AddItem">+</button>
                                </div>
                                <button onClick={props.removeFromCart.bind(this, item.uniqueKey)} className="Remove">
                                    Remove
                                </button>
                            </div>
                            
                        </div>
                    )
                })
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        cartProducts: state.cart.cartProducts
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addToCart: (currProd) => dispatch(actions.addToCart(currProd)),
        deleteFromCart: (uniqueKey) => dispatch(actions.deleteFromCart(uniqueKey)),
        removeFromCart: (uniqueKey) => dispatch(actions.removeFromCart(uniqueKey))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartSummary);