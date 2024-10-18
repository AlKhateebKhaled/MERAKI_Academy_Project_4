import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
import React from "react";
import "./style.css";
import image1 from "../../assets/seasonKit.jpeg";
import image2 from "../../assets/awaykit.jpg";
import image3 from "../../assets/thirdKit.jpg";
import Footer from "../../components/Footer";

const featuredProducts = [
  {
    id: 1,
    name: "Home Jersey 2024/25",
    price: "$89.99",
    imageUrl: "path/to/home_jersey_image.jpg",
  },
  {
    id: 2,
    name: "Away Jersey 2024/25",
    price: "$89.99",
    imageUrl: "path/to/away_jersey_image.jpg",
  },
  {
    id: 3,
    name: "Third Jersey 2024/25",
    price: "$89.99",
    imageUrl: "path/to/third_jersey_image.jpg",
  },
];

const Home = () => {
  const navigate = useNavigate();

  const handleShopNowButton = () => {
    navigate("/categories");
  };

  const goToAboutPage = () => {
    navigate("/about");
  };

  const goToContactPage = () => {
    navigate("/contact");
  };

  const goToFAQPage = () => {
    navigate("/faq");
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
              className="btn-orange btn-lg mx-2"
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
            <Button className="btn-orange" onClick={handleShopNowButton}>
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
            <Button className="btn-orange" onClick={handleShopNowButton}>
              Shop Now
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <div className="featured-products mt-5">
        <h2 className="text-center mb-4">Featured Products</h2>
        <div className="row justify-content-center">
          {featuredProducts.map((product) => (
            <div className="col-md-4 text-center mb-4" key={product.id}>
              <div className="product-card p-3">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="img-fluid"
                />
                <h5>{product.name}</h5>
                <p>{product.price}</p>
                <Button
                  className="btn-orange"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="home-container">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
