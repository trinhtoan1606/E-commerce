import React from "react";
import NavigationBar from "../components/header-footer/NavigationBar";
import ProductDetail from "../components/products/trendingProduct/productDetail";
import Footer from "../components/header-footer/Footer";

const DetailPage = () => {
  return (
    <div>
      <NavigationBar />
      <ProductDetail />
      <Footer />
    </div>
  );
};

export default DetailPage;
