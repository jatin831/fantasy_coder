import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Img from "../../../assets/img/transactionSuccess.png";
import CoinImg from "../../../assets/img/coin.png";

const convertDate = (d) => {
    d = new Date(d);
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    return day + '-'  + month + '-' + year;
}

const convertTime = (d) => {
    d = new Date(d);
    const hours = d.getHours();
    const min = d.getMinutes();
    const sec = d.getSeconds();
    return hours + ':'  + min + ':' + sec;
}

class TransactionSuccess extends Component {

    state = {
        orderId: null,
        transactionDate: null,
        transactionTime: null,
        transferAmount: null
    }
    
    componentDidMount() {
        let transactionDetails = localStorage.getItem('Codeium__transaction');
        if(transactionDetails) {
            transactionDetails = JSON.parse(transactionDetails);
            this.setState({
                orderId: transactionDetails.orderId,
                transactionDate: convertDate(transactionDetails.transactionDate),
                transactionTime: convertTime(transactionDetails.transactionDate),
                transferAmount: transactionDetails.transferAmount
            })
            console.log(transactionDetails);
        } 
    }

    render() {
        const totalPrice = this.props.cartProducts.reduce((total, el) => total + (el.quantity * el.perUnitPrice), 0).toFixed(2);
        return (
            <>
                <div className="Transaction-ImgContainer">
                    <img src={Img} />
                </div>
                <h1 className="text-sm-24">Transaction Successful</h1>
                <p className="OrderPlaced text-sm-14">Your Order has been placed</p>
                <p className="DateTime text-sm-12">{this.state.transactionDate} {this.state.transactionTime}</p>
                <ul className="Transaction-List">
                    <li>
                        <span className="List-Head text-sm-14">Order ID</span>
                        <span className="List-Data text-sm-13">{this.state.orderId}</span>
                    </li>
                    <li>
                        <span className="List-Head text-sm-14">Coins Used</span>
                        <span className="List-Data text-sm-13">{this.props.coinsUsed}<img className="Cart_CoinImg" src={CoinImg} alt="Coins" /></span>
                    </li>
                    <li>
                        <span className="List-Head text-sm-14">Discount</span>
                        <span className="List-Data text-sm-13">&#8377;{(totalPrice - this.state.transferAmount).toFixed(2)}</span>
                    </li>
                    <li className="text-sm-14 Transaction_OrderDetails">
                        <div className="container px-0">
                            <span className="List-Head ">Order Details</span>
                            
                            <ul className="Orders-List">
                                {
                                    this.props.cartItems.map(product => {
                                        return (
                                            <li key={product.id}>
                                                <div>
                                                    <p className="OrderName text-sm-14">{product.name} ({product.quantity})</p>
                                                    <p className="OrderDetails">{product.category} {product.size}</p>
                                                </div>
                                                <div>
                                                    <span style={{fontSize: "15px"}}>&#8377;{(product.quantity * product.perUnitPrice).toFixed(2)}</span>
                                                </div>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                            
                        </div>
                    </li>
                    
                    <li className="TransferAmount">
                        <span className="List-Head text-sm-16">Transfer Amount</span>
                        <span className="List-Head text-sm-16">&#8377;{this.state.transferAmount}</span>
                    </li>
                    
                    
                </ul>
                <div className="BtnContainer">
                    <Link to="/store" role="button" className="text-sm-16 btn btn-lg btn-block btn-dark">
                        Back to Store
                    </Link>
                </div>
            </>
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

export default connect(mapStateToProps)(TransactionSuccess);