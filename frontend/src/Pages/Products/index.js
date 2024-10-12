import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaHeart } from "react-icons/fa";

import "./style.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((res) => {
        setProducts(res.data.product);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleCardClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="container">
      <div className="row">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <div
                className="card product-card"
                onClick={() => handleCardClick(product._id)}
              >
                <div className="product-img-wrapper">
                  <img
                    src={product.imageURL}
                    className="product-img"
                    alt={product.team}
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title">{product.team}</h5>
                  <p className="card-text">
                    {" "}
                    {product.Season} {product.Type}
                  </p>
                  <p className="price">Price: ${product.price}</p>
                </div>
                <div className="product-buttons">
                  <button className="btn-icon">
                    <FaShoppingCart />
                  </button>
                  <button className="btn-icon">
                    <FaHeart />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
};

export default Products;
