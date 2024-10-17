import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import "./style.css";
import { FaFutbol, FaCalendarAlt, FaTshirt } from "react-icons/fa";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleCardClick = (productId) => {
    console.log("click");
    navigate(`/products/${productId}`);
  };

  return (
    <div className="product-card" onClick={() => handleCardClick(product._id)}>
      <div className="product-img-wrapper">
        <img
          src={product.imageURL}
          alt={product.name}
          className="product-img"
        />
      </div>
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="price">${product.price.toFixed(2)}</p>
        <div className="product-info">
          <span className="product-info-icon">
            <FaFutbol />
          </span>
          <span>{product.team}</span>
        </div>
        <div className="product-info">
          <span className="product-info-icon">
            <FaCalendarAlt />
          </span>
          <span> {product.Season}</span>
        </div>
        <div className="product-info">
          <span className="product-info-icon">
            <FaTshirt />
          </span>
          <span>{product.Type}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
