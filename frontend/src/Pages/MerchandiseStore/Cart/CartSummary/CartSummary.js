import React from 'react';
import './CartSummary.css';
import { connect } from "react-redux";
import Img from "../../../../assets/img/emptyCart3.png";
import * as actions from "../../../ReduxStore/slices/cartSlice";

const CartSummary = (props) => {
    return (
    <div className="CartItems">
        <p className="ShipmentDate ">SHIPPING BY INDIAN POST</p>
        {
            props.cartProducts.length == 0 ? (
                <div className="d-flex flex-column align-items-center justify-content-center">
                    <div className="EmptyCart-ImgContainer">
                        <img src={Img} />
                    </div>
                    <p>Your Cart is Empty</p>
                    <a role="button" className="btn btn-dark mt-3 btn-lg" href='/store'>
                        Shop Now    
                    </a>
                </div>
            ) : props.cartProducts.map(item => {
                    return (
                        <div key={item.uniqueKey} className="CartItem pl-3">
                            <div className="ImgContainer">
                                <img src={item.img}></img>
                            </div>

                            <div className="ProdDesc ml-3">
                                <div className="ItemName"><a href={'/store/' + item.id}>{item.name}</a></div>
                                <div className="ItemCategory">{item.category}</div>
                                <div className="ItemDesc">&#8377;{item.perUnitPrice}</div>
                                {/* <div className="ItemDesc">${item.perUnitPrice} - {capitalize(item.color)} - {item.size}</div> */}
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
                }
            )
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