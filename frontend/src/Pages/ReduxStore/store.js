import { configureStore } from "@reduxjs/toolkit";
import cartItemsReducer from "./slices/cartSlice";

export default configureStore({
    reducer: {
        cart: cartItemsReducer
    }
})