import React from "react";
import "./Banner.scss";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";

function Banner() {
  return (
    <Container className="banner-container">
      <div className="banner-info">
        <p className="slogan">New inspiration 2023</p>
        <h2 className="sale">20% off on new season</h2>
        <Link to="/Shop" className="linkToShop">
          Browse collections
        </Link>
      </div>
    </Container>
  );
}

export default Banner;
