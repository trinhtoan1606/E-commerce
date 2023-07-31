import React from "react";
import "./productItem.scss";

const ProductItem = ({ item, selectProduct }) => {
  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  return (
    <div>
      <img
        src={item.img1}
        className="detailImage"
        onClick={() => selectProduct(item)}
      />
      <h5 className="detailName">{item.name}</h5>
      <p className="detailPrice">{VND.format(item.price)}</p>
    </div>
  );
};

export default ProductItem;
