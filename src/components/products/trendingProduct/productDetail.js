import React, { useState } from "react";
import useFetch from "../../../costomize/fetch";
import { useParams, useNavigate } from "react-router-dom";
import "./productDetail.scss";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/productSlice";
import { BsCart3 } from "react-icons/bs";
import ProductItem from "./productItem";

const ProductDetail = () => {
  // Lấy dữ liệu từ API
  const {
    data: dataProductDetail,
    loading,
    isError,
  } = useFetch(
    "https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74",
    false
  );

  let [baseQty, setBaseQty] = useState(1);
  const [show, setShow] = useState(false);
  const [selectProduct, setSelectProduct] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const productDetail = dataProductDetail;

  // Lọc ra sản phẩm có id = id trên thanh địa chỉ
  const product = productDetail.filter((item) => item._id.$oid === params.id);

  // Lọc ra những sản phẩm có cùng category với sản phẩm hiện tại
  const relatedProducts = productDetail.filter(
    (item) =>
      item.category === product[0].category &&
      item._id.$oid !== product[0]._id.$oid
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

  // Hiện thông tin chi tiết của related product
  const handleDetail = () => {
    navigate(`/Shop/${selectProduct._id.$oid}`);
    setShow(false);
  };

  return (
    <div className="container mt-5">
      <div>
        {loading === false &&
          product &&
          product.length > 0 &&
          product.map((item) => {
            return (
              <div key={item._id}>
                <div className="product-detail-main">
                  <div className="product-detail-smallimg">
                    <img src={item.img1} alt="img1" />
                    <img src={item.img2} alt="img2" />
                    <img src={item.img3} alt="img3" />
                    <img src={item.img4} alt="img4" />
                  </div>
                  <div className="product-detail-largeimg">
                    <img src={item.img1} alt="img1" />
                  </div>
                  <div className="product-detail-info">
                    <h3>{item.name}</h3>
                    <p className="product-detail-info-price">
                      {VND.format(item.price)}
                    </p>
                    <span>{item.short_desc}</span>
                    <p className="product-detail-info-category">
                      CATEGORY: <span>{item.category}</span>
                    </p>
                    <div className="addCart-container">
                      <div className="addCart-quantity">
                        <p className="">QUANTITY</p>
                        <div className="addCart-quantity-button">
                          <button
                            onClick={() =>
                              setBaseQty(baseQty > 1 ? baseQty - 1 : 1)
                            }
                            className=""
                          >
                            -
                          </button>
                          <span>{baseQty}</span>
                          <button
                            onClick={() => setBaseQty(baseQty + 1)}
                            className=""
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <button
                        className="addCart-button"
                        onClick={() =>
                          dispatch(
                            addToCart({
                              _id: item._id,
                              name: item.name,
                              img1: item.img1,
                              price: item.price,
                              quantity: baseQty,
                              desc: item.short_desc,
                              totalPrice: item.price,
                            })
                          )
                        }
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
                <div className="product-detail-desc">
                  <p className="product-detail-desc-title">DESCRIPTION</p>
                  <h5>PRODUCT DESCRIPTION</h5>
                  <span>{item.long_desc}</span>
                </div>
              </div>
            );
          })}
        {loading === true && (
          <div>
            <h4 style={{ color: "orange" }}>Loading...</h4>
          </div>
        )}
      </div>
      <div className="related-container">
        <h5>RELATED PRODUCTS</h5>
        <div className="related-info" onClick={handleShow}>
          {loading === false &&
            relatedProducts &&
            relatedProducts.length > 0 &&
            relatedProducts.map((item) => (
              <ProductItem
                key={item._id.$oid}
                item={item}
                selectProduct={setSelectProduct}
              />
            ))}
          {loading === false && relatedProducts.length === 0 && (
            <p>No related products</p>
          )}
        </div>
      </div>

      {/* Hiện popup khi click vào sản phẩm */}
      {show && (
        <div>
          <div className="backdrop"></div>
          <div className="popup-container">
            <div className="popup-main">
              <img
                src={selectProduct.img1}
                className="popup-image"
                alt="img1"
              />
              <div className="popup-detail">
                <h4 className="popup-name">{selectProduct.name}</h4>
                <p className="popup-price">{VND.format(selectProduct.price)}</p>
                <p className="popup-des">
                  {truncateString(selectProduct.short_desc, 400)}
                </p>
                <div onClick={handleDetail} className="pop-view-detail">
                  <BsCart3 className="popup-icon" />
                  <span>View Detail</span>
                </div>
              </div>
            </div>
            <h4 className="closeBtn" onClick={handleClose}>
              X
            </h4>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
