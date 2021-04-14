import { createSlice } from "@reduxjs/toolkit";

const calcTotalItems = (products) => {
    let total =  products.reduce((total, ele) => {
        return total + ele.quantity;
    }, 0); 
    return total;
}

const storeToCart = (storedProducts) => {
    localStorage.setItem('cart', JSON.stringify(storedProducts));
}

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartProducts: [],
        totalItems: 0
    },
    reducers: {
        addToCart: (state, currProd) => {
            currProd = currProd.payload;
            let storedProducts = [ ...state.cartProducts ];
            let found = false;
            for (let i in storedProducts) {
                if(storedProducts[i].uniqueKey === currProd.uniqueKey) {
                    storedProducts[i].quantity += 1;
                    found = true;
                    break;
                }
            }
            if (!found) {
                storedProducts.push(currProd);
            }
            state.cartProducts = storedProducts;
            state.totalItems = calcTotalItems(storedProducts);
            storeToCart(storedProducts);
        },

        deleteFromCart: (state, uniqueKey) => {
            uniqueKey = uniqueKey.payload;
            let storedProducts = [ ...state.cartProducts ];
            for (let product of storedProducts) {
                if (product.uniqueKey === uniqueKey) {
                    product.quantity -= 1;
                    if (product.quantity === 0) {
                        storedProducts = state.cartProducts.filter(product => product.uniqueKey !== uniqueKey);
                    }
                    break;
                }
            }
            state.cartProducts = storedProducts;
            state.totalItems = calcTotalItems(storedProducts);
            storeToCart(storedProducts);
        },

        removeFromCart: (state, uniqueKey) => {
            uniqueKey = uniqueKey.payload;
            const storedProducts = state.cartProducts.filter(product => product.uniqueKey !== uniqueKey);
            state.cartProducts = storedProducts;
            state.totalItems = calcTotalItems(state.cartProducts);
            storeToCart(storedProducts);
        },

        loadCart: state => {
            let cartItems = localStorage.getItem('cart');
            if (cartItems === null) {
                cartItems = [];
            } else {
                cartItems = JSON.parse(cartItems);
            }

            state.totalItems = calcTotalItems(cartItems);
            state.cartProducts = cartItems;
        }
    }
})

export const {addToCart, deleteFromCart, removeFromCart, loadCart} = cartSlice.actions;

export default cartSlice.reducer;