import "./trendingProduct.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import useFetch from "../../../costomize/fetch";
import { BsCart3 } from "react-icons/bs";
import ProductItem from "./productItem";

const TrendingProduct = () => {
  const [show, setShow] = useState(false);
  const [selectProduct, setSelectProduct] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Lấy dữ liệu từ API
  const {
    data: dataTrendingProduct,
    loading,
    isError,
  } = useFetch(
    "https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74",
    false
  );

  // Hàm format sang VND
  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  // Hàm thu gọn nội dung
  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  return (
    <>
      <div className="container mb-4">
        <div className="trending-title">
          <p>Made the hard way</p>
          <h4>Top trending products</h4>
        </div>
        <div className="trending-info" onClick={handleShow}>
          {loading === false &&
            dataTrendingProduct &&
            dataTrendingProduct.length > 0 &&
            dataTrendingProduct.map((item) => (
              <ProductItem
                key={item._id.$oid}
                item={item}
                selectProduct={setSelectProduct}
              />
            ))}
          {loading === true && (
            <div>
              <h4 style={{ color: "orange" }}>Loading...</h4>
            </div>
          )}
        </div>
      </div>

      {/* Hiện popup khi click vào sản phẩm */}
      {show && (
        <div>
          <div className="backdrop"></div>
          <div className="popup-container">
            <div className="popup-main">
              <img src={selectProduct.img1} className="popup-image" />
              <div className="popup-detail">
                <h4 className="popup-name">{selectProduct.name}</h4>
                <p className="popup-price">{VND.format(selectProduct.price)}</p>
                <p className="popup-des">
                  {truncateString(selectProduct.short_desc, 400)}
                </p>
                <Link to={`/Shop/${selectProduct._id.$oid}`}>
                  <BsCart3 className="popup-icon" />
                  <span>View Detail</span>
                </Link>
              </div>
            </div>
            <h4 className="closeBtn" onClick={handleClose}>
              X
            </h4>
          </div>
        </div>
      )}
    </>
  );
};

export default TrendingProduct;
