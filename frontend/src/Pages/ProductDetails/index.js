import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaCheckCircle, FaTimesCircle, FaHeart, FaShoppingCart } from "react-icons/fa";
import "./style.css"; 

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/products/${id}`)
        .then((response) => {
          setProduct(response.data.product);
        })
        .catch((err) => {
          console.error(err);
          setError("Error fetching product details");
        });
    }
  }, [id]);

  if (!product) {
    return <div className="text-center">{error || "Loading product details..."}</div>;
  }

  const handleAddToWishlist = () => {

    alert(`${product.team} added to wishlist!`);
  };

  const handleAddToCart = () => {

    alert(`${product.team} added to cart!`);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <img src={product.imageURL} alt={product.team} className="img-fluid rounded shadow" />
        </div>
        <div className="col-md-6">
          <h2>{product.team}</h2>
          <p>
            <strong>Season:</strong> {product.Season}
          </p>
          <p>
            <strong>Type:</strong> {product.Type}
          </p>
          <p>
            <strong>Brand:</strong> {product.Brand}
          </p>
          <p>
            <strong>League:</strong> {product.League}
          </p>
          <p>
            <strong>Price:</strong> ${product.price}
          </p>
          <p>
            <strong>In Stock:</strong>{" "}
            {product.stock > 0 ? (
              <span className="text-success">
                <FaCheckCircle /> Yes
              </span>
            ) : (
              <span className="text-danger">
                <FaTimesCircle /> No
              </span>
            )}
          </p>
          <p>
            <strong>Description:</strong> {product.description}
          </p>
          <p>
            <strong>Categories:</strong> {product.categoryID.map(category => category.name).join(", ")}
          </p>

          <div className="d-flex justify-content-between mt-4">
            <button className="btn btn-primary" onClick={handleAddToCart}>
              <FaShoppingCart /> Add to Cart
            </button>
            <button className="btn btn-danger" onClick={handleAddToWishlist}>
              <FaHeart /> Add to Wishlist
            </button>
          </div>

          <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
