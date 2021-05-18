import React from 'react';
import Img from '../../../assets/img/transactionPending.png';

const TransactionPending = (props) => {
    return (
        <>
            <div className="Transaction-ImgContainer">
                <img src={Img} />
            </div>
            <h1 className="text-sm-24">Transaction Pending</h1>
        </>
    )
}

export default TransactionPending;