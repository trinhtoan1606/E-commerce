import { Link, NavLink } from "react-router-dom";
import "./NavigationBar.scss";
import { HiShoppingCart } from "react-icons/hi";
import { MdPeople } from "react-icons/md";
import Container from "react-bootstrap/Container";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { loadCart } from "../../redux/productSlice";

// Lấy dữ liệu từ Local storage
const getDatafromLS = () => {
  const data = localStorage.getItem("user_login");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

const NavigationBar = () => {
  // Lấy dữ liệu từ redux store
  const productData = useSelector((state) => state.product.productData);

  const [loginArr, setLoginArr] = useState(getDatafromLS());

  const dispatch = useDispatch();

  // Load lại giỏ hàng khi người dùng reload lại trang
  useEffect(() => {
    if (localStorage.getItem("CART")) {
      dispatch(loadCart(productData));
    }
  }, []);

  // Hàm log out
  const handleLogout = () => {
    localStorage.setItem("user_login", "[]");
    setLoginArr([]);
  };

  return (
    <Container className="bg-light mt-1">
      <div className="nav-detail">
        <div className="d-flex gap-3">
          <NavLink className="nav-link" to="/">
            Home
          </NavLink>
          <NavLink className="nav-link" to="/Shop">
            Shop
          </NavLink>
        </div>
        <h2>BOUTIQUE</h2>
        <div className="nav-cartInfo">
          <Link className="nav-link" to="/Cart">
            <HiShoppingCart className="nav-icon" />

            {/* In ra số sản phẩm được thêm vào giỏ hàng */}
            <span>{productData.length} Cart</span>
          </Link>

          {/* Nếu đang trong trạng thái login, in ra tên đăng nhập  */}
          {loginArr &&
            loginArr.length > 0 &&
            loginArr.map((item) => {
              return (
                <div className="nav-logout" key={item.email}>
                  <MdPeople className="nav-icon" />
                  <div className="nav-logout-btn">
                    {" "}
                    <span>{item.name}</span>
                    <span onClick={handleLogout}>(Logout)</span>
                  </div>
                </div>
              );
            })}
          {loginArr && loginArr.length == [] && (
            <Link className="nav-link" to="/Login">
              <MdPeople className="nav-icon" />
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </Container>
  );
};

export default NavigationBar;
