import React, { useState, useEffect, useContext } from "react";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../../App";
import "./style.css";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { token } = useContext(AppContext);

  const handleCardClick = () => {
    navigate(`/products/${product._id}`);
  };

  return (
    <div className="card product-card" onClick={handleCardClick}>
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
          {product.Season} {product.Type}
        </p>
        <p className="price">Price: ${product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
