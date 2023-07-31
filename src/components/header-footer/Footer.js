import React from "react";
import "./Footer.scss";

const Footer = () => {
  return (
    <div className="container-flud bg-dark mt-3 ">
      <div className="container footer-main py-5">
        <div className="footer-detail">
          <h5>Customer Services</h5>

          <a href="#">Help & Contact Us</a>
          <a href="#">Returns & Refunds</a>
          <a href="#">Online Stores</a>
          <a href="#">Terms & Conditions</a>
        </div>
        <div className="footer-detail">
          <h5>Company</h5>

          <a href="#">What We DO</a>
          <a href="#">Available Services</a>
          <a href="#">Latest posts</a>
          <a href="#">FAQs</a>
        </div>
        <div className="footer-detail">
          <h5>Social Media</h5>

          <a href="#">Twitter</a>
          <a href="#">Instagram</a>
          <a href="#">Facebook</a>
          <a href="#">Pinterest</a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
