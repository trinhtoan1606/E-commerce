import React from "react";
import NavigationBar from "../components/header-footer/NavigationBar";
import Banner from "../components/header-footer/Banner";
import Sidebar from "../components/sideBar/Sidebar";
import Footer from "../components/header-footer/Footer";

const ShopPage = () => {
  return (
    <div>
      <NavigationBar />
      <Banner />
      <Sidebar />
      <Footer />
    </div>
  );
};

export default ShopPage;
