import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AppContext } from "../../App";
import { FaArrowLeft } from 'react-icons/fa'; 
import { useNavigate } from "react-router-dom";
import "./style.css";

const WishList = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  const {
    setAlert,
    setIsLoading,
    setMsg,
    token,
    shownProducts,
    setShownProducts,
    setInWishlist,
  } = useContext(AppContext);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get("http://localhost:5000/wishlist", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(res.data.wishList.products);
        setShownProducts(res.data.wishList.products.length);
      } catch (err) {
        setMsg(err.response?.data?.message || "Failed to fetch wishlist");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [token, setMsg, shownProducts]);

  const handleRemoveFromWishlist = (id) => {
    setIsLoading(true);
    axios
      .delete(`http://localhost:5000/wishlist/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setInWishlist(false);
        localStorage.removeItem(`wishlist_${id}`);
        setAlert({
          message: "Product removed from wishlist successfully!",
          variant: "success",
        });
        setProducts((prevProducts) => {
          const updatedProducts = prevProducts.filter(
            (product) => product.productId._id !== id
          );
          setShownProducts(updatedProducts.length);
          return updatedProducts;
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
        setIsLoading(false);
      });
  };

  const handleOnClick = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <div className="WishList container">
      <button
        className="btn btn-secondary back-button"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft /> Back
      </button>

      <h2>WishList</h2>
      <div>
        <h6>Shown {shownProducts} Kits</h6>
      </div>
      <div className="row">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <div className="card product-card">
                <div
                  className="product-img-wrapper"
                  onClick={() => handleOnClick(product.productId._id)}
                >
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
                  <div className="removeBtn">
                    <button
                      className="btn btn-danger"
                      onClick={() =>
                        handleRemoveFromWishlist(product.productId._id)
                      }
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
