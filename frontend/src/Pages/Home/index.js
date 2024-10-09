import React from "react";
import "./style.css";

const Home = () => {
  return (
    <div className="homepage">
      <header className="homepage-header">
        <div className="logo">Football Shirts</div>
        <input
          type="text"
          placeholder="Search for shirts..."
          className="search-bar"
        />
      </header>

      <main>
        <section className="featured-products">
          <h2>Featured Products</h2>
          <div className="product-list">
            <div className="product">
              <img src="path/to/image1.jpg" alt="Club Shirt 1" />
              <h3>Manchester United Home Shirt</h3>
              <p>$89.99</p>
            </div>
            <div className="product">
              <img src="path/to/image2.jpg" alt="Club Shirt 2" />
              <h3>FC Barcelona Away Shirt</h3>
              <p>$89.99</p>
            </div>
            <div className="product">
              <img src="path/to/image3.jpg" alt="Club Shirt 3" />
              <h3>Liverpool FC Home Shirt</h3>
              <p>$89.99</p>
            </div>
            {/* Add more products as needed */}
          </div>
        </section>

        <section className="categories">
          <h2>Shop by Category</h2>
          <div className="category-list">
            <div className="category">Men’s Shirts</div>
            <div className="category">Women’s Shirts</div>
            <div className="category">Kids’ Shirts</div>
            <div className="category">Accessories</div>
          </div>
        </section>

        <section className="clubs">
          <h2>Clubs</h2>
          <div className="club-list">
            <div className="club">Manchester United</div>
            <div className="club">FC Barcelona</div>
            <div className="club">Liverpool FC</div>
            <div className="club">Inter Milan</div>
          </div>
        </section>

        <section className="promotions">
          <h2>Special Promotions</h2>
          <div className="promotion-banner">
            <p>20% off on all kids' shirts!</p>
          </div>
        </section>
      </main>

      <footer className="homepage-footer">
        <p>© 2024 Football Shirts. All rights reserved.</p>
        <div className="footer-links">
          <a href="/about">About Us</a>
          <a href="/contact">Contact Us</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms and Conditions</a>
        </div>
      </footer>
    </div>
  );
};

export default Home;
