import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import DetailPage from "./pages/DetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import LoginPage from "./pages/LoginPage";
import Registration from "./pages/Registration";
import Error from "./pages/Error";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/Shop" element={<ShopPage />} />
      <Route path="/Shop/:id" element={<DetailPage />} />
      <Route path="/Cart" element={<CartPage />} />
      <Route path="/Checkout" element={<CheckoutPage />} />
      <Route path="/Login" element={<LoginPage />} />
      <Route path="/Registration" element={<Registration />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App;
