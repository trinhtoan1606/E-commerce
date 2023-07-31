import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./checkout.scss";

const Checkout = () => {
  const [totalAmount, setTotalAmount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate();

  // Lấy dữ liệu từ redux store
  const productData = useSelector((state) => state.product.productData);

  // Tính tổng giá trị đơn hàng
  useEffect(() => {
    let price = 0;
    productData.map((item) => {
      price += item.price * item.quantity;
      return price;
    });
    setTotalAmount(price);
  }, [productData]);

  // Hàm format sang VND
  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const regexEmail =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  const regexPhone = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/;

  const handleOrder = (e) => {
    e.preventDefault();
    // Check validate các giá trị nhập vào
    if (name === "") {
      alert(" Name field is requred!", {
        position: "top-center",
      });
    } else if (email === "") {
      alert("Email field is requred", {
        position: "top-center",
      });
    } else if (phone === "") {
      alert("Phone number field is requred", {
        position: "top-center",
      });
    } else if (address === "") {
      alert("Address field is requred", {
        position: "top-center",
      });
    } else if (!regexEmail.test(email)) {
      alert("Please enter valid email address", {
        position: "top-center",
      });
    } else if (!regexPhone.test(phone)) {
      alert("Please enter valid phone number", {
        position: "top-center",
      });
    } else {
      // Nếu thỏa mãn tất cả điều kiện, thông báo order thành công, xóa giỏ hàng trong Local storage, chuyển về trang Shop
      alert("Order succeeded !!");
      localStorage.setItem("CART", '{"productData":[]}');
      navigate("/Shop");
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="my-5">BILLING DETAILS</h3>
      <div className="checkout-container">
        <form className="checkout-info" onSubmit={handleOrder}>
          <div className="checkout-detail">
            <label>FULL NAME:</label>
            <input
              type="text"
              placeholder="Enter Your Full Name Here!"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
          <div className="checkout-detail">
            <label>EMAIL:</label>
            <input
              type="email"
              placeholder="Enter Your Email Here!"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div className="checkout-detail">
            <label>PHONE NUMBER:</label>
            <input
              type="text"
              placeholder="Enter Your Phone Number Here!"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            ></input>
          </div>
          <div className="checkout-detail">
            <label>ADDRESS:</label>
            <input
              type="text"
              placeholder="Enter Your Address Here!"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></input>
          </div>
          <input
            className="place-order-btn"
            type="submit"
            value="Place order"
          />
        </form>
        <div className="order-container">
          <div className="order-main">
            <h3>YOUR ORDER</h3>
            <div className="order-product">
              {productData.map((item) => {
                return (
                  <div key={item._id.$oid}>
                    {" "}
                    <div className="order-product-detail">
                      <span className="order-product-name">{item.name}</span>
                      <span className="order-product-price">
                        {VND.format(item.price)} x {item.quantity}
                      </span>
                    </div>
                    <hr />
                  </div>
                );
              })}
            </div>
            <div className="order-total">
              <h5>TOTAL</h5>
              <span>{VND.format(totalAmount)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
