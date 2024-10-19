import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AppContext } from "../../App";
import { useNavigate } from "react-router-dom";
import "./style.css";

const Cart = () => {
  const navigate = useNavigate();
  const {
    setAlert,
    setIsLoading,
    setMsg,
    token,
    setShownProducts,
    cartItems,
    setCartItems,
  } = useContext(AppContext);

  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
      setShownProducts(JSON.parse(storedCart).length);
      calculateTotalAmount(JSON.parse(storedCart));
    }
  }, [setCartItems, setShownProducts]);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get("http://localhost:5000/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCartItems(res.data.cart.products);
        setShownProducts(res.data.cart.products.length);
        calculateTotalAmount(res.data.cart.products);
        localStorage.setItem("cartItems", JSON.stringify(res.data.cart.products)); // Store in localStorage
      } catch (err) {
        setMsg(err.response?.data?.message || "Failed to fetch cart");
        console.error("err: ", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [token, setMsg, setShownProducts, setCartItems]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems)); // Update localStorage whenever cartItems changes
  }, [cartItems]);

  const calculateTotalAmount = (items) => {
    const total = items.reduce((acc, item) => {
      const price = item.price || 0; 
      const quantity = item.quantity || 1;
      return acc + price * quantity;
    }, 0);
    setTotalAmount(total);
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return; // Prevent quantity from being less than 1

    setIsLoading(true);
    axios
      .put(
        `http://localhost:5000/cart/${id}`,
        { quantity: newQuantity },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setAlert({
          message: "Cart updated successfully!",
          variant: "success",
        });

        const updatedCartItems = cartItems.map((item) =>
          item.productId === id ? { ...item, quantity: newQuantity } : item
        );

        setCartItems(updatedCartItems);
        calculateTotalAmount(updatedCartItems);
      })
      .catch((err) => {
        setAlert({
          message:
            err.response?.data?.message ||
            "An error occurred while updating the cart",
          variant: "danger",
        });
        console.error("Error:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleRemoveFromCart = (id) => {
    setIsLoading(true);
    axios
      .delete(`http://localhost:5000/cart/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setAlert({
          message: "Product removed from cart successfully!",
          variant: "success",
        });

        const updatedCartItems = cartItems.filter(
          (item) => item.productId !== id
        );

        setCartItems(updatedCartItems);
        calculateTotalAmount(updatedCartItems);
      })
      .catch((err) => {
        setAlert({
          message:
            err.response?.data?.message ||
            "An error occurred while removing from cart",
          variant: "danger",
        });
        console.error("Error:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="Cart container">
      <h2>Shopping Cart</h2>
      <table className="cart-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total Item Amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <tr key={item._id}>
                <td>
                  {item.productName} - {item.productType} - (
                  {item.productSeason})
                </td>
                <td>
                  <div className="quantity-control">
                    <button
                      className="quantity-control__button quantity-control__button--decrease"
                      onClick={() =>
                        handleQuantityChange(item.productId, item.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="quantity-control__button quantity-control__button--increase"
                      onClick={() =>
                        handleQuantityChange(item.productId, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                </td>

                <td>{item.price ? item.price.toFixed(2) : "0.00"} $</td>
                <td>{(item.price * item.quantity).toFixed(2)} $</td>
                <td>
                  <button
                    className="cart__button cart__button--remove"
                    onClick={() => handleRemoveFromCart(item.productId)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Your cart is empty!</td>
            </tr>
          )}
        </tbody>
      </table>
      {cartItems.length > 0 && (
        <div className="cart-summary">
          <h3>Total Amount: {totalAmount.toFixed(2)} $</h3>
          <button
            className="cart__button cart__button--checkout"
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
