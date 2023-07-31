import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CartItem from "./cartItem";
import { BsGiftFill, BsArrowLeft, BsArrowRight } from "react-icons/bs";
import "./cart.scss";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// Lấy dữ liệu từ Local storage
const getDatafromLS = () => {
  const data = localStorage.getItem("user_login");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

const Cart = () => {
  // Lấy dữ liệu từ redux store
  const productData = useSelector((state) => state.product.productData);
  const [totalAmount, setTotalAmount] = useState("");
  const navigate = useNavigate();

  const loginArr = getDatafromLS();

  // Tính tổng giá trị đơn hàng
  useEffect(() => {
    let price = 0;
    productData.map((item) => {
      price += item.price * item.quantity;
      return price;
    });
    setTotalAmount(price);
  }, [productData]);

  // Format sang VND
  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  // Kiểm tra dữ liệu trước khi checkout
  const handleCheckout = () => {
    // Nếu giỏ hàng trống, yêu cầu người dùng mua hàng
    if (productData.length === 0) {
      alert("Your cart is empty. Can't proceed to checkout !");
      return;
      // Nếu chưa login, yêu cầu người dùng login
    } else if (loginArr && loginArr.length === 0) {
      alert("Please login to buy product!");
      navigate("/Login");
    } else {
      navigate("/Checkout");
    }
  };

  return (
    <div>
      <div className="mt-5">
        <h2 className="mb-4">Shopping cart</h2>
        <div className="cart-container">
          <CartItem />
          <div className="cart-total-container">
            <h4 className="mb-4">CART TOTAL</h4>
            <div className="cart-total">
              <span>SUBTOTAL</span>
              <span className="cart-total-sub">{VND.format(totalAmount)}</span>
            </div>
            <hr />
            <div className="cart-total">
              <span>TOTAL</span>
              <span className="cart-total-total">
                {VND.format(totalAmount)}
              </span>
            </div>
            <div className="cart-coupon">
              <input type="text" placeholder="Enter your coupon" />
              <div className="cart-coupon-btn">
                <BsGiftFill className="popup-icon" />
                <span>Apply coupon</span>
              </div>
            </div>
          </div>
        </div>
        <div className="proceed-container">
          <div className="proceed-main mx-5 mt-4">
            <Link to="/Shop" className="proceed">
              <BsArrowLeft />
              <span>Continue shopping</span>
            </Link>
          </div>
          <div className="proceed-main mx-5 mt-4">
            <div className="proceed" onClick={handleCheckout}>
              <span>Proceed to checkout</span>
              <BsArrowRight />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
