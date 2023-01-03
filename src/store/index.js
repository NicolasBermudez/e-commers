import { configureStore } from "@reduxjs/toolkit";
import cart from "./slices/cart.slice";
import products from './slices/products.slice'

export default configureStore({
  reducer: {
    products,
    cart
  }
})
