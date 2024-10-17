import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import "./style.css";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { token } = useContext(AppContext);

  const handleCardClick = () => {
    navigate(`/products/${product._id}`);
  };

  return (
    <div className="product-card" onClick={handleCardClick}>
      <div className="product-card__img-wrapper">
        <img
          src={product.imageURL}
          className="product-card__img"
          alt={product.team}
        />
      </div>
      <div className="product-card__body">
        <h5 className="product-card__title">{product.team}</h5>
        <p className="product-card__text">
          {product.Season} {product.Type}
        </p>
        <p className="product-card__price">Price: ${product.price}</p>
        <div className="product-card__buttons">
          <button className="product-card__button product-card__button--icon btn-icon">
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
