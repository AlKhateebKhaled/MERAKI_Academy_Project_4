import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AppContext } from "../../App";
import ProductCard from "../../components/ProductCard";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaHeart,
  FaShoppingCart,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./style.css";

const WishList = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  const [shownProducts, setShownProducts] = useState(0);

  const [alert, setAlert] = useState({ message: "", variant: "" });

  const {
    formData,
    setFormData,
    msg,
    setMsg,
    token,
    setToken,
    selectedFilter,
    setSelectedFilter,
    isSubmitting,
    setIsSubmitting,
  } = useContext(AppContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/wishlist", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(res.data.wishList.products);
        setShownProducts(res.data.WishList.products.length);
      } catch (err) {
        setMsg(err.response?.data?.message || "Failed to fetch wishlist");
        console.error(err);
      }
    };

    fetchProducts();
  }, [token, setMsg]);

  const handleRemoveFromWishlist = (productId) => {
    axios
      .delete(`http://localhost:5000/wishlist/${productId}`, {  
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("Response:", res.data);
        setAlert({
          message: "Product removed from wishlist successfully!",
          variant: "success",
        });
       
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.productId._id !== productId)
        );
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
  };
  

  return (
    <div className="WishList container">
      <h2>WishLest</h2>

      <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>
        Back
      </button>
      <div>
        <h6>Shown {shownProducts} Kits</h6>
      </div>
      <div className="row">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <div className="card product-card">
                <div className="product-img-wrapper">
                  <img
                    src={product.productId.imageURL}
                    className="product-img"
                    alt={product.productId.team}
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title">{product.productId.team}</h5>
                  <p className="card-text">
                    {product.productId.Season} {product.productId.Type}
                  </p>
                  <p className="price">Price: ${product.productId.price}</p>
                </div>
                <div className="product-buttons">
                  <button
                    className="btn-icon"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaShoppingCart />
                  </button>
                  <div className="removeBtn">
                    <button
                      className="btn btn-danger"
                      onClick={() => handleRemoveFromWishlist(product.productId._id)}
                    >
                      Remove from WishList
                    </button>
                  </div>
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

export default WishList;
