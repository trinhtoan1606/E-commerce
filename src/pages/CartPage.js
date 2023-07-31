import React from "react";
import NavigationBar from "../components/header-footer/NavigationBar";

import Cart from "../components/cart/cart";

const CartPage = () => {
  return (
    <div className="container">
      <NavigationBar />
      <Cart />
    </div>
  );
};

export default CartPage;
