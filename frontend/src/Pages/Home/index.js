import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
import React from "react";
import "./style.css";
import image1 from "../../assets/seasonKit.jpeg";
import image2 from "../../assets/awaykit.jpg";
import image3 from "../../assets/thirdKit.jpg";

const Home = () => {
  const navigate = useNavigate();
  const handleShopNowButton = () => {
    navigate("/categories");
  };

  return (
    <div className="home-container">
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={image1}
            alt="2024/25 Season Kit"
          />
          <Carousel.Caption>
            <h3>
              Explore the latest arrivals and show your support for your
              favorite teams!
            </h3>
            <Button
              variant="primary"
              className="btn-lg mx-2"
              onClick={handleShopNowButton}
            >
              Shop Now
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={image2}
            alt="Away Jersey 2024/25"
          />
          <Carousel.Caption>
            <h3>Get the latest away kit to cheer on your team.</h3>
            <Button variant="primary" onClick={handleShopNowButton}>
              Shop Now
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={image3}
            alt="Third Jersey 2024/25"
          />
          <Carousel.Caption>
            <h3>Unique third kit for the true fans.</h3>
            <Button variant="primary" onClick={handleShopNowButton}>
              Shop Now
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Home;
