import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";

//Tạo store
export default configureStore({
  reducer: {
    product: productReducer,
  },
});
