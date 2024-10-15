import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AppContext } from "../../App";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./style.css";

const Cart = () => {
  const navigate = useNavigate();

  const {
    setAlert,
    setIsLoading,
    setMsg,
    token,
    shownProducts,
    setShownProducts,
    setInWishlist,
  } = useContext(AppContext);

  const [cartItems, setCartItems] = useState([]);
  const [userCart, setUserCart] = useState();
  const [totalAmount, setTotalAmount] = useState(0); // State to hold total amount

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get("http://localhost:5000/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCartItems(res.data.cart.products);
        setShownProducts(res.data.cart.products.length);
        setUserCart(res.data.cart);
        calculateTotalAmount(res.data.cart.products); // Calculate total amount
      } catch (err) {
        setMsg(err.response?.data?.message || "Failed to fetch cart");
        console.error("err: ", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [token, setMsg, shownProducts]);

  // Function to calculate total amount
  const calculateTotalAmount = (items) => {
    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalAmount(total);
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
        setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
        calculateTotalAmount(cartItems); // Recalculate total after removal
      })
      .catch((err) => {
        setAlert({
          message: err.response?.data?.message || "An error occurred while removing from cart",
          variant: "danger",
        });
        console.error("Error:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleCheckout = () => {
    // Logic for checkout process
    navigate('/checkout');
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
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <tr key={item._id}>
                <td>{item.productName}</td>
                <td>{item.quantity}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>
                  <button className="btn-danger" onClick={() => handleRemoveFromCart(item._id)}>Remove</button>
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
          <h3>Total Amount: ${totalAmount.toFixed(2)}</h3>
          <button className="btn-checkout" onClick={handleCheckout}>Proceed to Checkout</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
