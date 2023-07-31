import React from "react";
import { Link } from "react-router-dom";
import product1 from "../../../assests/image/product_1.png";
import product2 from "../../../assests/image/product_2.png";
import product3 from "../../../assests/image/product_3.png";
import product4 from "../../../assests/image/product_4.png";
import product5 from "../../../assests/image/product_5.png";
import "./productList.scss";

const ProductList = () => {
  return (
    <div className="container mb-5">
      <div className="productList-title">
        <p>Carefully created collections</p>
        <h4>Browse our categories</h4>
      </div>
      <div>
        <div className="productList-image1">
          <Link to="/Shop">
            <img src={product1} alt="Iphone" />
          </Link>
          <Link to="/Shop">
            <img src={product2} alt="Mac" />
          </Link>
        </div>
        <div className="productList-image2">
          <Link to="/Shop">
            <img src={product3} alt="Ipad" />
          </Link>
          <Link to="/Shop">
            <img src={product4} alt="Watch" />
          </Link>
          <Link to="/Shop">
            <img src={product5} alt="AirPods" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
