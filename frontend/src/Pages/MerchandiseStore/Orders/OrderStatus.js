import React from 'react';

const OrderStatus = (props) => {
    let classes = "p-2 text-uppercase badge";
    if (props.status === 'pending') {
        classes += " badge-info"
    } else if (props.status === 'cancelled') {
        classes += " badge-danger";
    } else if (props.status === 'delivered') {
        classes += " badge-success";
    }

    return (
        <span className={classes}>
            {props.status}
        </span>
    )
}

export default OrderStatus;