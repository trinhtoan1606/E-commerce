import "./Sidebar.scss";
import { Link } from "react-router-dom";
import ProductItem from "../products/trendingProduct/productItem";
import { useState } from "react";
import useFetch from "../../costomize/fetch";
import { BsCart3 } from "react-icons/bs";

const Sidebar = () => {
  const [showAllProduct, setShowAllProduct] = useState(true);
  const [showProduct, setShowProduct] = useState(false);
  const [detailProduct, setDetailProduct] = useState();
  const [show, setShow] = useState(false);
  const [selectProduct, setSelectProduct] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Lấy dữ liệu từ API
  const {
    data: dataShopProduct,
    loading,
    isError,
  } = useFetch(
    "https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74",
    false
  );

  // Khi click vào chữ All sẽ hiện toàn bộ sản phẩm
  const handleShowProduct = () => {
    setShowAllProduct(true);
    setShowProduct(false);
  };

  // Khi click vào từng nhóm sản phẩm sẽ hiện sản phẩm tương ứng
  const handleDetailProduct = (e) => {
    // Lọc những sản phẩm có category = nội dung được click
    const product = dataShopProduct.filter(
      (pro) => pro.category.toUpperCase() === e.target.innerText.toUpperCase()
    );
    setDetailProduct(product);
    setShowProduct(true);
    setShowAllProduct(false);
  };

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
    <div className="container productShow">
      <div className="sidebarMain">
        <h2 className="mb-3">CATEGORIES</h2>
        <div className="sidebar">
          <h4>APPLE</h4>
          <Link to="#" onClick={handleShowProduct}>
            All
          </Link>
          <div>
            <h5 className="sidebarTitle">PHONE & MAC</h5>
            <div className="sidebarContent">
              <Link to="#" onClick={handleDetailProduct}>
                iPhone
              </Link>
              <Link to="#" onClick={handleDetailProduct}>
                iPad
              </Link>
              <Link to="#" onClick={handleDetailProduct}>
                Macbook
              </Link>
            </div>
          </div>
          <div>
            <h5 className="sidebarTitle">WIRELESS</h5>
            <div className="sidebarContent">
              <Link to="#" onClick={handleDetailProduct}>
                Airpod
              </Link>
              <Link to="#" onClick={handleDetailProduct}>
                Watch
              </Link>
            </div>
          </div>
          <div>
            <h5 className="sidebarTitle">OTHERS</h5>
            <div className="sidebarContent">
              <Link to="#" onClick={handleDetailProduct}>
                Mouse
              </Link>
              <Link to="#" onClick={handleDetailProduct}>
                Keyboard
              </Link>
              <Link to="#" onClick={handleDetailProduct}>
                Other
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="productShowDetail">
          <input
            placeholder="Enter Search Here!"
            className="searchInput"
            type="text"
          />
          <div>
            <select className="sort">
              <option value="defaultSorting">Default Sorting</option>
              <option value="price">Price</option>
              <option value="trending">Trending</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>

        <div className="trending-info" onClick={handleShow}>
          {showAllProduct &&
            dataShopProduct &&
            dataShopProduct.length > 0 &&
            dataShopProduct.map((item) => (
              <ProductItem
                key={item._id.$oid}
                item={item}
                selectProduct={setSelectProduct}
              />
            ))}
        </div>
        <div className="trending-info" onClick={handleShow}>
          {showProduct &&
            detailProduct &&
            detailProduct.length > 0 &&
            detailProduct.map((cc) => (
              <ProductItem
                key={cc.name}
                item={cc}
                selectProduct={setSelectProduct}
              />
            ))}
        </div>
      </div>
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
    </div>
  );
};

export default Sidebar;
