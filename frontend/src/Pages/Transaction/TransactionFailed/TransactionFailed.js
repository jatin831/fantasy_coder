import React from 'react';
import Img from '../../../assets/img/transactionFailed.png';

const TransactionFailed = (props) => {
    return (
        <>
            <div className="Transaction-ImgContainer">
                <img src={Img} />
            </div>
            <h1 className="text-sm-24">Transaction Failed</h1>
            <p>Payment for Order ID <span className="text-bold">{props.orderId}</span> could not be proceed.</p>
            <a role="button" href="/checkout" className="btn btn-outline-primary">Try Again</a>
        </>
    )
}

export default TransactionFailed;