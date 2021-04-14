import React from 'react';

const CartItems = () => {

    let cartItems = localStorage.getItem('cart');
    if (cartItems === null) {
        cartItems = [];
    } else {
        cartItems = JSON.parse(cartItems);
    }

    return cartItems;
}

export default CartItems;