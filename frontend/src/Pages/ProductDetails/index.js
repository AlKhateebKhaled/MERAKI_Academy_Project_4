import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaHeart,
  FaShoppingCart,
} from "react-icons/fa";
import Alert from "react-bootstrap/Alert";
import "./style.css";
import { AppContext } from "../../App";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  const [alert, setAlert] = useState({ message: "", variant: "" });
  const { token, setIsSubmitting, inWishlist, setInWishlist } =
    useContext(AppContext);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setProduct(response.data.product);
          
        })
        .catch((err) => {
          console.error(err);
          setError("Error fetching product details");
        });
    }
  }, [id, token]);

  useEffect(() => {
    if (id) {
      axios
        .get("http://localhost:5000/wishlist", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const isInWishlist = localStorage.getItem(`wishlist_${id}`) === "true";
          setInWishlist(isInWishlist); 
        
        })
        .catch((err) => {
          console.error("Error fetching wishlist:", err);
        });
    }
  }, [id, token,setInWishlist]);

  useEffect(() => {
    if (alert.message) {
      const timeout = setTimeout(
        () => setAlert({ message: "", variant: "" }),
        3000
      );
      return () => clearTimeout(timeout);
    }
  }, [alert]);

  if (!product) {
    return (
      <div className="text-center">{error || "Loading product details..."}</div>
    );
  }

  const handleAddToWishlist = () => {
    if (!inWishlist) {
      axios
        .post(
          "http://localhost:5000/wishlist",
          { products: [{ productId: id }] },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          setInWishlist(true);
          localStorage.setItem(`wishlist_${id}`, true); 
          setAlert({
            message: "Product added to wishlist successfully!",
            variant: "success",
          });
        })
        .catch((err) => {
          setAlert({
            message:
              err.response?.data?.message ||
              "An error occurred while adding to wishlist",
            variant: "danger",
          });
          console.error("Error:", err);
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    } else {
      axios
        .delete(`http://localhost:5000/wishlist/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setInWishlist(false);
          localStorage.removeItem(`wishlist_${id}`); // Remove from localStorage
          setAlert({
            message: "Product removed from wishlist successfully!",
            variant: "success",
          });
        })
        .catch((err) => {
          setAlert({
            message:
              err.response?.data?.message ||
              "An error occurred while removing from wishlist",
            variant: "danger",
          });
          console.error("Error:", err);
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    }
  };
  

  const handleAddToCart = () => {
    alert(`${product.team} added to cart!`);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={product.imageURL}
            alt={product.team}
            className="img-fluid rounded shadow"
          />
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
            <strong>Categories:</strong>{" "}
            {product.categoryID && Array.isArray(product.categoryID)
              ? product.categoryID.map((category) => category.name).join(", ")
              : "No categories available"}
          </p>

          <div className="d-flex justify-content-between mt-4">
            <button className="btn btn-primary" onClick={handleAddToCart}>
              <FaShoppingCart /> Add to Cart
            </button>
            <button
              className={`btn ${inWishlist ? "btn-secondary" : "btn-danger"}`}
              onClick={handleAddToWishlist}
            >
              <FaHeart />{" "}
              {inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
            </button>
          </div>

          <button
            className="btn btn-secondary mt-3"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
          {alert.message && (
            <Alert variant={alert.variant} className="mt-3">
              {alert.message}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
