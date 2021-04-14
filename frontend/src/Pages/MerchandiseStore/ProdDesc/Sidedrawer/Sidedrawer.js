import React from 'react';
import './Sidedrawer.css';
import CartSummary from '../../Cart/CartSummary/CartSummary';
import Backdrop from '../Backdrop/Backdrop';
import { BiCheck } from 'react-icons/bi';
import { BiX } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const Sidedrawer = (props) => {
    return (
        <>
            <Backdrop show={props.show} clicked={props.removeSidedrawer} />
            <div className={"Sidedrawer " + (props.show ? "showSidedrawer" : "")}>
                <div className="SidedrawerHeader">
                    
                    <div className="AddToCart">
                        <BiCheck className="ReactIconTick" />
                            Added To Your Cart
                    </div>
                    <button onClick = {props.removeSidedrawer} className="RemoveSidedrawer">
                        <BiX className="ReactIconCancel" />
                    </button>
                </div>
                <div className="CartSummaryContainer">
                    <CartSummary />
                </div>
                <div className="ButtonContainer">
                    <button 
                        onClick = {props.removeSidedrawer}
                        className="btn btn-large my-2 mr-3 p-2 btn-light btn-block" 
                        style={{border: '1px solid #ccc'}}>
                            CONTINUE SHOPPING
                    </button>
                    
                    <Link 
                        role="button"
                        to="/store/cart"
                        className="btn btn-large my-3 mr-3 p-2 btn-dark btn-block">
                            PROCEED TO CART
                    
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Sidedrawer;



