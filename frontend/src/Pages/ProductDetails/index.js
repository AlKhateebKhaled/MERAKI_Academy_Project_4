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
  const {
    token,
    setIsLoading,
    inWishlist,
    setInWishlist,
    product,
    setProduct,
    error,
    setError,
    alert,
    setAlert,
    updateCart,
  } = useContext(AppContext);

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (id) {
        setIsLoading(true);
        try {
          const response = await axios.get(`http://localhost:5000/products/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setProduct(response.data.product);
        } catch (err) {
          console.error(err);
          setError("Error fetching product details");
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchProductDetails();
  }, [id, token]);

  useEffect(() => {
    const fetchWishlistStatus = async () => {
      if (id) {
        try {
          await axios.get("http://localhost:5000/wishlist", {
            headers: { Authorization: `Bearer ${token}` },
          });
          const isInWishlist = localStorage.getItem(`wishlist_${id}`) === "true";
          setInWishlist(isInWishlist);
        } catch (err) {
          console.error("Error fetching wishlist:", err);
        }
      }
    };

    fetchWishlistStatus();
  }, [id, token, setInWishlist]);

  useEffect(() => {
    if (alert.message) {
      const timeout = setTimeout(() => setAlert({ message: "", variant: "" }), 3000);
      return () => clearTimeout(timeout);
    }
  }, [alert, setAlert]);

  if (!product) {
    return <div className="product-details__error">{error || "Loading product details..."}</div>;
  }

  const handleAddToWishlist = async () => {
    if (!token) {
      setAlert({ message: "Please log in to add items to wishlist", variant: "danger" });
      navigate("/login");
      return;
    }

    try {
      if (!inWishlist) {
        await axios.post("http://localhost:5000/wishlist", { products: [{ productId: id }] }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setInWishlist(true);
        localStorage.setItem(`wishlist_${id}`, true);
        setAlert({ message: "Product added to wishlist successfully!", variant: "success" });
      } else {
        await axios.delete(`http://localhost:5000/wishlist/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setInWishlist(false);
        localStorage.removeItem(`wishlist_${id}`);
        setAlert({ message: "Product removed from wishlist successfully!", variant: "success" });
      }
    } catch (err) {
      setAlert({
        message: err.response?.data?.message || "An error occurred while updating wishlist",
        variant: "danger",
      });
      console.error("Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!token) {
      setAlert({ message: "Please log in to add items to cart", variant: "danger" });
      navigate("/login");
      return;
    }

    const addedItem = { productId: id, quantity: 1 };

    try {
      const res = await axios.post("http://localhost:5000/cart", { products: [addedItem] }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Product added to cart:", res.data);
      setAlert({ message: "Product added to cart successfully!", variant: "success" });
      updateCart(addedItem);
    } catch (err) {
      console.error("Server error:", err.response?.data);
      setAlert({ message: err.response?.data?.message || "Error adding product to cart", variant: "danger" });
    }
  };

  return (
    <div className="product-details container mt-5">
      <div className="product-details__row row">
        <div className="product-details__image col-md-6">
          <img src={product.imageURL} alt={product.team} className="img-fluid rounded shadow" />
        </div>
        <div className="product-details__info col-md-6">
          <h2 className="product-details__title">{product.team}</h2>
          <p className="product-details__season"><strong>Season:</strong> {product.Season}</p>
          <p className="product-details__type"><strong>Type:</strong> {product.Type}</p>
          <p className="product-details__brand"><strong>Brand:</strong> {product.Brand}</p>
          <p className="product-details__league"><strong>League:</strong> {product.League}</p>
          <p className="product-details__price"><strong>Price:</strong> ${product.price}</p>
          <p className="product-details__stock"><strong>In Stock:</strong>{" "}
            {product.stock > 0 ? <span className="text-success"><FaCheckCircle /> Yes</span> :
              <span className="text-danger"><FaTimesCircle /> No</span>}
          </p>
          <p className="product-details__description"><strong>Description:</strong> {product.description}</p>
          <p className="product-details__categories"><strong>Categories:</strong>{" "}
            {product.categoryID && Array.isArray(product.categoryID)
              ? product.categoryID.map((category) => category.name).join(", ")
              : "No categories available"}
          </p>

          <div className="product-details__actions d-flex justify-content-between align-items-center mt-4">
            <button className="product-details__btn AddToCart" onClick={handleAddToCart}>
              <FaShoppingCart /> Add to Cart
            </button>
            <button
              className={`product-details__btn ${inWishlist ? "ProductDetailswishList__button--remove" : "ProductDetailswishList__button--add"}`}
              onClick={handleAddToWishlist}
            >
              <FaHeart /> {inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
            </button>
            <button className="product-details__btn back" onClick={() => navigate(-1)}>
              Back
            </button>
          </div>
          {alert.message && <Alert variant={alert.variant} className="mt-3">{alert.message}</Alert>}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
