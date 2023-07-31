import { useDispatch, useSelector } from "react-redux";
import { IoTrash } from "react-icons/io5";
import {
  decrementQantity,
  deleteFromCart,
  incrementQuantity,
  resetCart,
} from "../../redux/productSlice";

import "./cartItem.scss";

const CartItem = () => {
  const dispatch = useDispatch();

  // Lấy dữ liệu từ redux store
  const productData = useSelector((state) => state.product.productData);

  // Hàm format sang VND
  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  return (
    <div className="">
      {productData && productData.length > 0 && (
        <>
          <table>
            <thead>
              <tr>
                <th>IMAGE</th>
                <th>PRODUCT</th>
                <th>PRICE</th>
                <th>QUANTITY</th>
                <th>TOTAL</th>
                <th>REMOVE</th>
              </tr>
            </thead>
            <tbody>
              {productData.map((item) => {
                return (
                  <tr key={item._id.$oid}>
                    <td>
                      <img src={item.img1} className="cart-item-img" alt="" />
                    </td>
                    <td className="cart-item-name">
                      <h5>{item.name}</h5>
                    </td>
                    <td className="cart-item-price">
                      {VND.format(item.price)}
                    </td>
                    <td>
                      <div className="cart-item-quantity">
                        {/* Button giảm số lượng sản phẩm */}
                        <button
                          className=""
                          onClick={() =>
                            dispatch(
                              decrementQantity({
                                _id: item._id,
                                name: item.name,
                                img1: item.img1,
                                price: item.price,
                                quantity: 1,
                                desc: item.description,
                              })
                            )
                          }
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        {/* Button tăng số lượng sản phẩm */}
                        <button
                          className=""
                          onClick={() =>
                            dispatch(
                              incrementQuantity({
                                _id: item._id,
                                name: item.name,
                                img1: item.img1,
                                price: item.price,
                                quantity: 1,
                                desc: item.description,
                              })
                            )
                          }
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="cart-item-price">
                      {VND.format(item.price * item.quantity)}
                    </td>
                    <td>
                      {/* Xóa sản phẩm */}
                      <IoTrash
                        onClick={() => dispatch(deleteFromCart(item))}
                        className="cart-item-icon"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {/* Xóa toàn bộ giỏ hàng */}
          <button className="reset-cart" onClick={() => dispatch(resetCart())}>
            Reset Cart
          </button>
        </>
      )}
      {productData.length === 0 && <h4>Cart is empty!</h4>}
    </div>
  );
};

export default CartItem;
