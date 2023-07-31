import React from "react";
import Container from "react-bootstrap/Container";
import "./Services.scss";

const Services = () => {
  return (
    <Container>
      <div className="services">
        <div className="service-info">
          <h4>FREE SHIPPING</h4>
          <p>Free shipping worldwide</p>
        </div>
        <div className="service-info">
          <h4>24 X 7 SERVICE</h4>
          <p>Always online</p>
        </div>
        <div className="service-info">
          <h4>FESTIVAL OFFER</h4>
          <p>Festival offer</p>
        </div>
      </div>
      <div className="subscribe">
        <div className="subscribe-slogan">
          <h4>LET'S BE FRIEND!</h4>
          <p>Tell us your email</p>
        </div>
        <div>
          <input
            className="subscribe-input"
            placeholder="Enter your email address"
          />
          <button className="subscribe-btn">Subscribe</button>
        </div>
      </div>
    </Container>
  );
};

export default Services;
