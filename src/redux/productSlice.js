import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productData: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    // Thêm sản phẩm vào giỏ hàng

    addToCart: (state, action) => {
      const item = state.productData.find(
        (item) => item._id.$oid === action.payload._id.$oid
      );

      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.productData.push(action.payload);
      }
      localStorage.setItem("CART", JSON.stringify(state));
    },

    // Xóa sản phẩm khỏi giỏ hàng

    deleteFromCart: (state, action) => {
      let productIndex = state.productData.findIndex(
        (item) => item._id.$oid === action.payload._id.$oid
      );
      state.productData.splice(productIndex, 1);

      localStorage.setItem("CART", JSON.stringify(state));
    },

    // Xóa toàn bộ sản phẩm khỏi giỏ hàng

    resetCart: (state) => {
      state.productData = [];
      localStorage.removeItem("CART", JSON.stringify(state));
    },

    // Load lại giỏ hàng khi người dùng reload lại trang

    loadCart: (state) => {
      if (localStorage.getItem("CART")) {
        let CART = JSON.parse(localStorage.getItem("CART"));

        state.productData = CART.productData;
      } else {
        state.productData = [];
      }
    },

    // Tăng số lượng sản phẩm trong giỏ hàng

    incrementQuantity: (state, action) => {
      const item = state.productData.find(
        (item) => item._id.$oid === action.payload._id.$oid
      );
      if (item) {
        item.quantity++;
      }
      localStorage.setItem("CART", JSON.stringify(state));
    },

    // Giảm số lượng sản phẩm trong giỏ hàng

    decrementQantity: (state, action) => {
      const item = state.productData.find(
        (item) => item._id.$oid === action.payload._id.$oid
      );
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
      localStorage.setItem("CART", JSON.stringify(state));
    },
  },
});

export const {
  addToCart,
  deleteFromCart,
  resetCart,
  incrementQuantity,
  decrementQantity,
  loadCart,
} = productSlice.actions;
export default productSlice.reducer;
