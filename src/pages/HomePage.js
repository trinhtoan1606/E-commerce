import React from "react";
import NavigationBar from "../components/header-footer/NavigationBar";
import Banner from "../components/header-footer/Banner";
import ProductList from "../components/products/productList/productList";
import Services from "../components/header-footer/Services";
import TrendingProduct from "../components/products/trendingProduct/trendingProduct";
import Footer from "../components/header-footer/Footer";

const HomePage = () => {
  return (
    <div>
      <NavigationBar />
      <Banner />
      <ProductList />
      <TrendingProduct />
      <Services />
      <Footer />
    </div>
  );
};

export default HomePage;
